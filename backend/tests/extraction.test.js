import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from '../src/config/database.js'
import { createSource } from '../src/modules/sources/source.repository.js'
import { getClaimsBySource } from '../src/modules/claims/claim.repository.js'
import { runExtraction } from '../src/modules/extraction/extraction.service.js'
import { setProvider } from '../src/modules/extraction/providerFactory.js'
import { MockProvider } from '../src/modules/extraction/mockProvider.js'

// Seed a workspace (institution) and user for FK constraints
let workspaceId
let userId

async function resetDb() {
  await pool.query('DELETE FROM audit_logs')
  await pool.query('DELETE FROM academic_events')
  await pool.query('DELETE FROM extracted_claims')
  await pool.query('DELETE FROM processing_jobs')
  await pool.query('DELETE FROM source_documents')
  await pool.query('DELETE FROM sources')
  await pool.query('DELETE FROM course_memberships')
  await pool.query('DELETE FROM course_enrolments')
  await pool.query('DELETE FROM courses')
  await pool.query('DELETE FROM sessions')
  await pool.query('DELETE FROM workspace_memberships')
  await pool.query('DELETE FROM users')
  await pool.query("DELETE FROM institutions WHERE code <> 'OKOA-DEFAULT'")
}

async function seedWorkspaceAndUser() {
  const { rows: [ws] } = await pool.query(
    `INSERT INTO institutions (name, code, country) VALUES ('Test University', 'TEST-UNI', 'Kenya') RETURNING id`,
  )
  workspaceId = ws.id

  const { rows: [user] } = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role) VALUES ($1, 'extractor@test.com', 'Extractor', 'lecturer') RETURNING id`,
    [workspaceId],
  )
  userId = user.id
}

async function makeSource(metadata = {}) {
  return createSource({
    workspaceId,
    submittedBy: userId,
    sourceType: 'text',
    metadata: { text: 'CAT 1 for CS101 is on 2025-08-10.', ...metadata },
  })
}

test.before(async () => {
  await resetDb()
  await seedWorkspaceAndUser()
})

test.after(async () => {
  await pool.end()
})

test('extracts claims and persists with provenance', async () => {
  const mockClaim = {
    type: 'cat',
    title: 'CAT 1',
    courseHint: 'CS101',
    proposedDates: ['2025-08-10T00:00:00.000Z'],
    confidence: 0.9,
    evidenceSnippet: 'CAT 1 for CS101 is on 2025-08-10.',
  }
  setProvider(new MockProvider([mockClaim]))

  const source = await makeSource()
  const result = await runExtraction(source.id)

  assert.equal(result.failed, false)
  assert.equal(result.claims.length, 1)

  const [claim] = result.claims
  assert.equal(claim.claim_type, 'cat')
  assert.equal(claim.title, 'CAT 1')
  assert.equal(claim.source_id, source.id)
  assert.equal(claim.status, 'pending')
  assert.ok(claim.evidence_snippet)
  assert.ok(claim.extracted_at)
})

test('attaches ambiguity flag when no date is present', async () => {
  const mockClaim = {
    type: 'assignment',
    title: 'Assignment 2',
    confidence: 0.85,
    evidenceSnippet: 'Assignment 2 has been posted.',
  }
  setProvider(new MockProvider([mockClaim]))

  const source = await makeSource({ text: 'Assignment 2 has been posted.' })
  const result = await runExtraction(source.id)

  assert.equal(result.failed, false)
  const [claim] = result.claims
  const flags = claim.ambiguity_flags
  assert.ok(flags.includes('no_date'), 'should flag missing date')
})

test('does not invent a deadline — missing date stays missing', async () => {
  const mockClaim = {
    type: 'deadline',
    title: 'Project submission',
    confidence: 0.7,
    evidenceSnippet: 'Submit your project.',
    // no proposedDates
  }
  setProvider(new MockProvider([mockClaim]))

  const source = await makeSource({ text: 'Submit your project.' })
  const result = await runExtraction(source.id)

  assert.equal(result.failed, false)
  const [claim] = result.claims
  assert.equal(claim.start_at, null, 'start_at must be null when AI provides no date')
})

test('records failure claim when source has no text', async () => {
  setProvider(new MockProvider([]))

  const source = await createSource({
    workspaceId,
    submittedBy: userId,
    sourceType: 'text',
    metadata: {},  // no text field
  })

  const result = await runExtraction(source.id)
  assert.equal(result.failed, true)
  assert.ok(result.reason)

  const claims = await getClaimsBySource(source.id)
  const failedClaim = claims.find((c) => c.status === 'failed')
  assert.ok(failedClaim, 'a failed claim record must be persisted')
  assert.ok(failedClaim.failure_reason)
})

test('rejects malformed AI output — does not persist invalid claims', async () => {
  // Provider returns a claim missing required evidenceSnippet
  const badClaim = { type: 'exam', title: 'Final Exam', confidence: 0.9 }
  setProvider(new MockProvider([badClaim]))

  const source = await makeSource({ text: 'Final exam announced.' })
  const result = await runExtraction(source.id)

  // MockProvider bypasses Zod in the provider itself, but extraction.service
  // re-validates the full extractionResultSchema — this should fail
  assert.equal(result.failed, true)
  assert.ok(result.reason?.includes('schema validation'))
})

test('flags duplicate claims across sources', async () => {
  const claim = {
    type: 'cat',
    title: 'CAT 2',
    courseHint: 'CS101',
    proposedDates: ['2025-09-01T00:00:00.000Z'],
    confidence: 0.9,
    evidenceSnippet: 'CAT 2 on September 1.',
  }
  setProvider(new MockProvider([claim]))

  const source1 = await makeSource({ text: 'CAT 2 on September 1.' })
  await runExtraction(source1.id)

  const source2 = await makeSource({ text: 'CAT 2 on September 1.' })
  await runExtraction(source2.id)

  const claims2 = await getClaimsBySource(source2.id)
  const dup = claims2.find((c) => c.duplicate_of !== null)
  assert.ok(dup, 'second identical claim should be flagged as duplicate')
})

test('returns zero claims without failure when AI finds nothing', async () => {
  setProvider(new MockProvider([]))

  const source = await makeSource({ text: 'No academic events here.' })
  const result = await runExtraction(source.id)

  assert.equal(result.failed, false)
  assert.equal(result.claims.length, 0)
})
