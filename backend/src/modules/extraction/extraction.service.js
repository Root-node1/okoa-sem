import { getSourceById, getSourceDocument, updateSourceDocumentText } from '../sources/source.repository.js'
import { extractText } from './textExtractor.js'
import { getProvider } from './providerFactory.js'
import { extractionResultSchema } from './extraction.schema.js'
import {
  insertClaim, getClaimsBySource, findSimilarClaims,
  markDuplicate, markConflicts, updateClaimStatus,
} from '../claims/claim.repository.js'
import { recordAudit } from '../audit/audit.repository.js'

const CONFIDENCE_LOW = 0.5

/**
 * Run the full extraction pipeline for a source.
 * Called by the processing worker.
 *
 * @param {string} sourceId
 * @param {{ sourceDocumentId?: string, fileBuffer?: Buffer, model?: string }} [opts]
 */
export async function runExtraction(sourceId, opts = {}) {
  const source = await getSourceById(sourceId)
  if (!source) throw new Error(`Source not found: ${sourceId}`)

  // --- 1. Resolve text ---
  let text
  let sourceDocumentId = opts.sourceDocumentId ?? null

  if (source.source_type === 'text' || source.source_type === 'whatsapp_export') {
    const rawText = source.metadata?.text ?? source.metadata?.content ?? null
    if (!rawText) {
      await _failSource(sourceId, null, 'No text content in source metadata')
      return { claims: [], failed: true, reason: 'No text content in source metadata' }
    }
    text = await extractText({ sourceType: source.source_type, textContent: rawText })
  } else if (source.source_type === 'document') {
    if (!sourceDocumentId) {
      await _failSource(sourceId, null, 'No source_document_id provided for document source')
      return { claims: [], failed: true, reason: 'No source_document_id provided' }
    }
    const doc = await getSourceDocument(sourceDocumentId)
    if (!doc) {
      await _failSource(sourceId, sourceDocumentId, 'Source document record not found')
      return { claims: [], failed: true, reason: 'Source document not found' }
    }

    if (doc.text_extraction_status === 'completed' && doc.extracted_text) {
      text = doc.extracted_text
    } else {
      if (!opts.fileBuffer) {
        await _failSource(sourceId, sourceDocumentId, 'File buffer required for document text extraction')
        return { claims: [], failed: true, reason: 'File buffer required' }
      }
      try {
        text = await extractText({
          sourceType: 'document',
          fileBuffer: opts.fileBuffer,
          mimeType: doc.mime_type,
        })
        await updateSourceDocumentText(sourceDocumentId, text, 'completed')
      } catch (err) {
        await updateSourceDocumentText(sourceDocumentId, null, 'failed')
        await _failSource(sourceId, sourceDocumentId, err.message)
        return { claims: [], failed: true, reason: err.message }
      }
    }
  }

  if (!text?.trim()) {
    await _failSource(sourceId, sourceDocumentId, 'Extracted text is empty')
    return { claims: [], failed: true, reason: 'Extracted text is empty' }
  }

  // --- 2. Resolve course context ---
  const courses = source.metadata?.courseHints ?? []
  const contextHint = source.metadata?.contextHint ?? null

  // --- 3. Call AI provider ---
  let aiResult
  const provider = await Promise.resolve(getProvider())
  try {
    aiResult = await provider.extract({ text, sourceId, courses, contextHint })
  } catch (err) {
    await _failSource(sourceId, sourceDocumentId, `AI extraction failed: ${err.message}`)
    return { claims: [], failed: true, reason: err.message }
  }

  // --- 4. Validate with Zod (defence-in-depth; provider should already validate) ---
  const parsed = extractionResultSchema.safeParse(aiResult)
  if (!parsed.success) {
    const reason = `AI output schema validation failed: ${parsed.error.message}`
    await _failSource(sourceId, sourceDocumentId, reason)
    return { claims: [], failed: true, reason }
  }

  const { claims: rawClaims, summary } = parsed.data
  const promptVersion = aiResult.promptVersion ?? null
  const model = opts.model ?? null

  if (rawClaims.length === 0) {
    await recordAudit({
      action: 'extraction.no_claims',
      entityType: 'source',
      entityId: sourceId,
      afterState: { summary },
    })
    return { claims: [], failed: false, summary }
  }

  // --- 5. Persist claims ---
  const persistedClaims = []
  for (const claim of rawClaims) {
    const ambiguityFlags = buildAmbiguityFlags(claim)
    const dates = claim.proposedDates ?? []

    const row = await insertClaim({
      sourceId,
      sourceDocumentId,
      claimType: claim.type,
      title: claim.title,
      description: claim.description ?? null,
      courseHint: claim.courseHint ?? null,
      startAt: dates[0] ?? null,
      endAt: dates[1] ?? null,
      venue: claim.venue ?? null,
      confidence: claim.confidence,
      ambiguityFlags,
      evidenceSnippet: claim.evidenceSnippet,
      status: 'pending',
      model,
      promptVersion,
    })
    persistedClaims.push(row)
  }

  // --- 6. Duplicate and conflict detection (T-210, T-211) ---
  for (const claim of persistedClaims) {
    const similar = await findSimilarClaims({
      courseId: claim.course_id,
      claimType: claim.claim_type,
      excludeSourceId: sourceId,
    })

    const duplicates = similar.filter((s) => isTitleMatch(s.title, claim.title))
    const conflicts = similar.filter(
      (s) => !isTitleMatch(s.title, claim.title) && isDateConflict(s, claim),
    )

    if (duplicates.length > 0) {
      await markDuplicate(claim.id, duplicates[0].id)
    }
    if (conflicts.length > 0) {
      await markConflicts(claim.id, conflicts.map((c) => c.id))
    }
  }

  await recordAudit({
    action: 'extraction.completed',
    entityType: 'source',
    entityId: sourceId,
    afterState: { claimCount: persistedClaims.length, summary },
  })

  return { claims: persistedClaims, failed: false, summary }
}

// --- Helpers ---

async function _failSource(sourceId, sourceDocumentId, reason) {
  await insertClaim({
    sourceId,
    sourceDocumentId,
    claimType: 'announcement',
    title: 'Extraction failed',
    evidenceSnippet: reason.slice(0, 500),
    confidence: 0,
    status: 'failed',
    failureReason: reason,
  }).catch(() => {})
  await recordAudit({
    action: 'extraction.failed',
    entityType: 'source',
    entityId: sourceId,
    afterState: { reason },
  }).catch(() => {})
}

function buildAmbiguityFlags(claim) {
  const flags = []
  if (!claim.proposedDates?.length) flags.push('no_date')
  if (claim.confidence < CONFIDENCE_LOW) flags.push('low_confidence')
  if (!claim.courseHint) flags.push('no_course_hint')
  return flags
}

function isTitleMatch(a, b) {
  return a.toLowerCase().trim() === b.toLowerCase().trim()
}

function isDateConflict(existing, incoming) {
  if (!existing.start_at || !incoming.start_at) return false
  return existing.start_at.toString() !== new Date(incoming.start_at).toString()
}
