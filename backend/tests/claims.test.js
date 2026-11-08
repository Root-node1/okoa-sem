import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import app from '../src/app.js'
import { pool } from '../src/config/database.js'
import argon2 from 'argon2'

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

async function seedLecturer() {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const passwordHash = await argon2.hash('StrongPass1', { type: argon2.argon2id })
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, password_hash, account_status, email_verified)
     VALUES ($1, 'lecturer@example.com', 'Lecturer User', 'lecturer', $2, 'active', false) RETURNING id`,
    [workspaceId, passwordHash],
  )
  const userId = user.rows[0].id
  await pool.query(
    `INSERT INTO workspace_memberships (user_id, workspace_id, role, status) VALUES ($1, $2, 'lecturer', 'active')`,
    [userId, workspaceId],
  )
  const course = await pool.query(
    `INSERT INTO courses (institution_id, code, name) VALUES ($1, 'CLAIM101', 'Claim Course') RETURNING id`,
    [workspaceId],
  )
  const courseId = course.rows[0].id
  await pool.query(
    `INSERT INTO course_memberships (user_id, course_id, role, status) VALUES ($1, $2, 'lecturer', 'active')`,
    [userId, courseId],
  )
  const source = await pool.query(
    `INSERT INTO sources (workspace_id, course_id, submitted_by, source_type, status)
     VALUES ($1, $2, $3, 'text', 'completed') RETURNING id`,
    [workspaceId, courseId, userId],
  )
  const sourceId = source.rows[0].id
  const claim = await pool.query(
    `INSERT INTO extracted_claims (source_id, claim_type, title, evidence_snippet, course_id, start_at, status)
     VALUES ($1, 'cat', 'CAT 1', 'evidence', $2, now(), 'pending') RETURNING id`,
    [sourceId, courseId],
  )
  const login = await request(app).post('/api/v1/auth/login').send({
    email: 'lecturer@example.com',
    password: 'StrongPass1',
  })
  const cookie = login.headers['set-cookie'][0]
  return { userId, courseId, claimId: claim.rows[0].id, workspaceId, cookie }
}

test.beforeEach(async () => {
  await resetDb()
})

test.after(async () => {
  await pool.end()
})

test('unauthenticated claim access is rejected', async () => {
  const res = await request(app).get('/api/v1/claims/00000000-0000-0000-0000-000000000000')
  assert.equal(res.status, 401)
})

test('lecturer can approve a pending claim and create a verified event', async () => {
  const seeded = await seedLecturer()
  const res = await request(app)
    .post(`/api/v1/claims/${seeded.claimId}/approve`)
    .set('Cookie', seeded.cookie)
    .send({})

  assert.equal(res.status, 200)
  assert.equal(res.body.data.claim.status, 'approved')
  assert.equal(res.body.data.event.status, 'verified')
  assert.equal(res.body.data.event.source_claim_id, seeded.claimId)
})

test('approved claim approval is idempotent', async () => {
  const seeded = await seedLecturer()
  await request(app).post(`/api/v1/claims/${seeded.claimId}/approve`).set('Cookie', seeded.cookie).send({})
  const second = await request(app).post(`/api/v1/claims/${seeded.claimId}/approve`).set('Cookie', seeded.cookie).send({})
  assert.equal(second.status, 200)
  assert.equal(second.body.data.claim.status, 'approved')
})

test('lecturer can reject a pending claim', async () => {
  const seeded = await seedLecturer()
  const res = await request(app)
    .post(`/api/v1/claims/${seeded.claimId}/reject`)
    .set('Cookie', seeded.cookie)
    .send({ reason: 'Incorrect date' })

  assert.equal(res.status, 200)
  assert.equal(res.body.data.status, 'rejected')
})

test('student cannot approve a claim', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const passwordHash = await argon2.hash('StrongPass1', { type: argon2.argon2id })
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, password_hash, account_status, email_verified)
     VALUES ($1, 'student2@example.com', 'Student User', 'student', $2, 'active', false) RETURNING id`,
    [workspaceId, passwordHash],
  )
  const userId = user.rows[0].id
  await pool.query(
    `INSERT INTO workspace_memberships (user_id, workspace_id, role, status) VALUES ($1, $2, 'student', 'active')`,
    [userId, workspaceId],
  )
  const course = await pool.query(
    `INSERT INTO courses (institution_id, code, name) VALUES ($1, 'CLAIM102', 'Claim Course 2') RETURNING id`,
    [workspaceId],
  )
  const courseId = course.rows[0].id
  const source = await pool.query(
    `INSERT INTO sources (workspace_id, course_id, submitted_by, source_type, status)
     VALUES ($1, $2, $3, 'text', 'completed') RETURNING id`,
    [workspaceId, courseId, userId],
  )
  const claim = await pool.query(
    `INSERT INTO extracted_claims (source_id, claim_type, title, evidence_snippet, course_id, start_at, status)
     VALUES ($1, 'cat', 'CAT 2', 'evidence', $2, now(), 'pending') RETURNING id`,
    [source.rows[0].id, courseId],
  )
  const login = await request(app).post('/api/v1/auth/login').send({
    email: 'student2@example.com',
    password: 'StrongPass1',
  })
  const cookie = login.headers['set-cookie'][0]
  const res = await request(app).post(`/api/v1/claims/${claim.rows[0].id}/approve`).set('Cookie', cookie).send({})
  assert.equal(res.status, 403)
})

test('approved claim approval remains authorization-protected', async () => {
  const seeded = await seedLecturer()
  await request(app).post(`/api/v1/claims/${seeded.claimId}/approve`).set('Cookie', seeded.cookie).send({})

  await request(app).post('/api/v1/auth/register').send({
    fullName: 'Student Three',
    email: 'student3@example.com',
    password: 'StrongPass1',
  })
  const login = await request(app).post('/api/v1/auth/login').send({
    email: 'student3@example.com',
    password: 'StrongPass1',
  })
  const studentCookie = login.headers['set-cookie'][0]

  const res = await request(app)
    .post(`/api/v1/claims/${seeded.claimId}/approve`)
    .set('Cookie', studentCookie)
    .send({})

  assert.equal(res.status, 403)
})
