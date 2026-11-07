import argon2 from 'argon2'
import crypto from 'node:crypto'
import * as repo from './auth.repository.js'

const SESSION_DAYS = 7

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function safeUser(user, memberships) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name ?? user.fullName,
    accountStatus: user.account_status ?? user.accountStatus,
    emailVerified: user.email_verified ?? user.emailVerified,
    memberships: (memberships ?? []).map((m) => ({
      id: m.id,
      workspaceId: m.workspace_id ?? m.workspaceId,
      workspaceName: m.workspace_name ?? m.workspaceName,
      workspaceCode: m.workspace_code ?? m.workspaceCode,
      role: m.role,
      status: m.status,
    })),
  }
}

export async function register(input) {
  const email = normalizeEmail(input.email)
  const existing = await repo.findUserByEmail(email)
  if (existing) {
    const err = new Error('An account with this email already exists')
    err.status = 409
    err.code = 'EMAIL_ALREADY_EXISTS'
    throw err
  }

  const workspace = await repo.findDefaultWorkspace()
  if (!workspace) {
    const err = new Error('Default workspace is not configured')
    err.status = 500
    err.code = 'WORKSPACE_NOT_CONFIGURED'
    throw err
  }

  const passwordHash = await argon2.hash(input.password, { type: argon2.argon2id })
  const user = await repo.createUser({
    institutionId: workspace.id,
    email,
    fullName: input.fullName.trim(),
    passwordHash,
  })
  const membership = await repo.createMembership({ userId: user.id, workspaceId: workspace.id, role: 'student' })

  return safeUser(user, membership ? [membership] : [])
}

export async function login(input, meta = {}) {
  const email = normalizeEmail(input.email)
  const user = await repo.findUserByEmail(email)

  const invalid = () => {
    const err = new Error('Invalid email or password')
    err.status = 401
    err.code = 'INVALID_CREDENTIALS'
    return err
  }

  if (!user || !user.password_hash) throw invalid()
  if (user.account_status !== 'active') {
    const err = new Error('Invalid email or password')
    err.status = 401
    err.code = 'INVALID_CREDENTIALS'
    throw err
  }

  const ok = await argon2.verify(user.password_hash, input.password)
  if (!ok) throw invalid()

  const token = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  await repo.createSession({
    userId: user.id,
    tokenHash,
    expiresAt,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  })

  const memberships = await repo.findMembershipsByUser(user.id)
  return { token, user: safeUser(user, memberships) }
}

export async function getCurrentUser(userId) {
  const user = await repo.findUserById(userId)
  if (!user) return null
  const memberships = await repo.findMembershipsByUser(user.id)
  return safeUser(user, memberships)
}

export async function logout(token) {
  if (!token) return
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  await repo.revokeSessionByTokenHash(tokenHash)
}
