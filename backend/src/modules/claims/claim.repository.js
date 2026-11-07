import { pool } from '../../config/database.js'

export async function insertClaim({
  sourceId, sourceDocumentId = null, claimType, title, description = null,
  courseId = null, courseHint = null, startAt = null, endAt = null, venue = null,
  confidence, ambiguityFlags = [], evidenceSnippet, status = 'pending',
  duplicateOf = null, conflictsWith = [], failureReason = null,
  extractedAt = new Date(), model = null, promptVersion = null,
}) {
  const { rows } = await pool.query(
    `INSERT INTO extracted_claims
       (source_id, source_document_id, claim_type, title, description,
        course_id, course_hint, start_at, end_at, venue,
        confidence, ambiguity_flags, evidence_snippet, status,
        duplicate_of, conflicts_with, failure_reason,
        extracted_at, model, prompt_version)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14,$15,$16::jsonb,$17,$18,$19,$20)
     RETURNING *`,
    [
      sourceId, sourceDocumentId, claimType, title, description,
      courseId, courseHint, startAt, endAt, venue,
      confidence, JSON.stringify(ambiguityFlags), evidenceSnippet, status,
      duplicateOf, JSON.stringify(conflictsWith), failureReason,
      extractedAt, model, promptVersion,
    ],
  )
  return rows[0]
}

export async function getClaimsBySource(sourceId) {
  const { rows } = await pool.query(
    `SELECT * FROM extracted_claims WHERE source_id = $1 ORDER BY extracted_at ASC`,
    [sourceId],
  )
  return rows
}

export async function getClaimById(id) {
  const { rows } = await pool.query(`SELECT * FROM extracted_claims WHERE id = $1`, [id])
  return rows[0] ?? null
}

export async function updateClaimStatus(id, status, failureReason = null) {
  const { rows } = await pool.query(
    `UPDATE extracted_claims SET status = $2, failure_reason = $3, updated_at = now()
     WHERE id = $1 RETURNING id, status, failure_reason`,
    [id, status, failureReason],
  )
  return rows[0] ?? null
}

export async function markDuplicate(id, duplicateOfId) {
  const { rows } = await pool.query(
    `UPDATE extracted_claims SET duplicate_of = $2, updated_at = now()
     WHERE id = $1 RETURNING id, duplicate_of`,
    [id, duplicateOfId],
  )
  return rows[0] ?? null
}

export async function markConflicts(id, conflictIds) {
  const { rows } = await pool.query(
    `UPDATE extracted_claims SET conflicts_with = $2::jsonb, updated_at = now()
     WHERE id = $1 RETURNING id, conflicts_with`,
    [id, JSON.stringify(conflictIds)],
  )
  return rows[0] ?? null
}

/**
 * Find existing pending/approved claims for the same course and claim type
 * to support duplicate and conflict detection.
 */
export async function findSimilarClaims({ courseId, claimType, excludeSourceId }) {
  const { rows } = await pool.query(
    `SELECT id, title, start_at, venue, confidence, status
       FROM extracted_claims
      WHERE claim_type = $1
        AND source_id <> $2
        AND status IN ('pending', 'approved')
        AND ($3::uuid IS NULL OR course_id = $3)
      ORDER BY extracted_at DESC
      LIMIT 50`,
    [claimType, excludeSourceId, courseId ?? null],
  )
  return rows
}
