import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from '../src/config/database.js'
import { hasWorkspaceAccess, hasCourseAccess } from '../src/lib/authorization.js'

async function resetDb() {
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

test('workspace access follows active membership', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, account_status, email_verified)
     VALUES ($1, 'authz@example.com', 'Authz User', 'student', 'active', false) RETURNING id`,
    [workspaceId],
  )
  const userId = user.rows[0].id
  await pool.query(
    `INSERT INTO workspace_memberships (user_id, workspace_id, role, status) VALUES ($1, $2, 'student', 'active')`,
    [userId, workspaceId],
  )

  const allowed = await hasWorkspaceAccess({ id: userId }, workspaceId, ['student'])
  const denied = await hasWorkspaceAccess({ id: userId }, workspaceId, ['lecturer'])
  assert.equal(allowed, true)
  assert.equal(denied, false)
})

test('course access is denied without explicit course membership or enrolment', async () => {
  const workspace = await pool.query("SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT'")
  const workspaceId = workspace.rows[0].id
  const user = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, account_status, email_verified)
     VALUES ($1, 'courseauthz@example.com', 'Course Authz User', 'student', 'active', false) RETURNING id`,
    [workspaceId],
  )
  const userId = user.rows[0].id
  await pool.query(
    `INSERT INTO workspace_memberships (user_id, workspace_id, role, status) VALUES ($1, $2, 'student', 'active')`,
    [userId, workspaceId],
  )
  const course = await pool.query(
    `INSERT INTO courses (institution_id, code, name) VALUES ($1, 'AUTHZ101', 'Authz Course') RETURNING id`,
    [workspaceId],
  )
  const courseId = course.rows[0].id

  const allowed = await hasCourseAccess({ id: userId }, courseId, ['student'])
  assert.equal(allowed, false)
})
