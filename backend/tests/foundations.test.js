import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from '../src/config/database.js'
import * as sources from '../src/modules/sources/source.repository.js'
import * as jobs from '../src/modules/jobs/jobRepository.js'
import * as audit from '../src/modules/audit/audit.repository.js'
import * as events from '../src/modules/academic-events/academicEvent.repository.js'

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

test.beforeEach(async () => {
  await resetDb()
})

test.after(async () => {
  await pool.end()
})

test('source submission creates a queued processing job', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, account_status, email_verified)
     VALUES ($1, 'source@example.com', 'Source User', 'student', 'active', false) RETURNING id`,
    [workspaceId],
  )
  const source = await sources.createSource({
    workspaceId,
    submittedBy: user.rows[0].id,
    sourceType: 'text',
    metadata: { origin: 'test' },
  })
  const job = await jobs.enqueueJob(source.id, 'extraction')

  assert.equal(source.status, 'pending')
  assert.equal(job.status, 'queued')
  assert.equal(job.source_id, source.id)
})

test('processing job can be claimed and completed', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, account_status, email_verified)
     VALUES ($1, 'job@example.com', 'Job User', 'student', 'active', false) RETURNING id`,
    [workspaceId],
  )
  const source = await sources.createSource({
    workspaceId,
    submittedBy: user.rows[0].id,
    sourceType: 'text',
  })
  const job = await jobs.enqueueJob(source.id, 'extraction')
  const claimed = await jobs.claimNextJob('test-worker')
  assert.equal(claimed.id, job.id)
  assert.equal(claimed.status, 'processing')
  assert.equal(claimed.attempts, 1)

  const completed = await jobs.completeJob(job.id)
  assert.equal(completed.status, 'completed')
})

test('audit log records an action', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, account_status, email_verified)
     VALUES ($1, 'audit@example.com', 'Audit User', 'student', 'active', false) RETURNING id`,
    [workspaceId],
  )
  const entry = await audit.recordAudit({
    actorId: user.rows[0].id,
    action: 'source.submitted',
    entityType: 'source',
    entityId: null,
    afterState: { status: 'pending' },
  })
  assert.ok(entry.id)
})

test('academic event can be created with provenance', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, account_status, email_verified)
     VALUES ($1, 'event@example.com', 'Event User', 'lecturer', 'active', false) RETURNING id`,
    [workspaceId],
  )
  const event = await events.createAcademicEvent({
    workspaceId,
    eventType: 'cat',
    title: 'ICS 2207 CAT 1',
    startAt: new Date().toISOString(),
    status: 'draft',
    createdBy: user.rows[0].id,
    sourceClaimId: null,
  })
  assert.equal(event.status, 'draft')
  assert.equal(event.version, 1)
})
