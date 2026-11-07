import { pool } from '../../config/database.js'

export async function findUserById(id) {
  const { rows } = await pool.query(
    `SELECT id, institution_id, email, full_name, account_status, email_verified, created_at
     FROM users WHERE id = $1`,
    [id],
  )
  return rows[0] ?? null
}

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id, institution_id, email, full_name, password_hash, account_status, email_verified, created_at
     FROM users WHERE email = $1`,
    [email],
  )
  return rows[0] ?? null
}

export async function findDefaultWorkspace() {
  const { rows } = await pool.query(`SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT' LIMIT 1`)
  return rows[0] ?? null
}

export async function createUser({ institutionId, email, fullName, passwordHash }) {
  const { rows } = await pool.query(
    `INSERT INTO users (institution_id, email, full_name, role, password_hash, account_status, email_verified)
     VALUES ($1, $2, $3, 'student', $4, 'active', FALSE)
     RETURNING id, institution_id, email, full_name, account_status, email_verified, created_at`,
    [institutionId, email, fullName, passwordHash],
  )
  return rows[0]
}

export async function createMembership({ userId, workspaceId, role }) {
  const { rows } = await pool.query(
    `INSERT INTO workspace_memberships (user_id, workspace_id, role, status)
     VALUES ($1, $2, $3, 'active')
     ON CONFLICT (user_id, workspace_id) DO NOTHING
     RETURNING id, user_id, workspace_id, role, status, created_at`,
    [userId, workspaceId, role],
  )
  return rows[0] ?? null
}

export async function findMembershipsByUser(userId) {
  const { rows } = await pool.query(
    `SELECT wm.id, wm.workspace_id, wm.role, wm.status, i.name AS workspace_name, i.code AS workspace_code
     FROM workspace_memberships wm
     JOIN institutions i ON i.id = wm.workspace_id
     WHERE wm.user_id = $1`,
    [userId],
  )
  return rows
}

export async function createSession({ userId, tokenHash, expiresAt, ipAddress, userAgent }) {
  const { rows } = await pool.query(
    `INSERT INTO sessions (user_id, token_hash, expires_at, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id, expires_at, created_at`,
    [userId, tokenHash, expiresAt, ipAddress, userAgent],
  )
  return rows[0]
}

export async function findSessionByTokenHash(tokenHash) {
  const { rows } = await pool.query(
    `SELECT s.id AS session_id, s.user_id, s.expires_at, s.revoked_at,
            u.id, u.institution_id, u.email, u.full_name, u.account_status, u.email_verified
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1`,
    [tokenHash],
  )
  return rows[0] ?? null
}

export async function revokeSessionByTokenHash(tokenHash) {
  await pool.query(`UPDATE sessions SET revoked_at = now() WHERE token_hash = $1 AND revoked_at IS NULL`, [tokenHash])
}

export async function touchSession(sessionId) {
  await pool.query(`UPDATE sessions SET last_used_at = now() WHERE id = $1`, [sessionId])
}
