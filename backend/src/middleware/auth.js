import crypto from 'node:crypto'
import * as repo from '../modules/auth/auth.repository.js'

export async function authenticate(req, _res, next) {
  try {
    const token = req.cookies?.okoa_session
    if (!token) return next()

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const session = await repo.findSessionByTokenHash(tokenHash)
    if (!session || session.revoked_at) return next()
    if (new Date(session.expires_at) <= new Date()) return next()
    if (session.account_status !== 'active') return next()

    const memberships = await repo.findMembershipsByUser(session.user_id)
    req.user = {
      id: session.user_id,
      email: session.email,
      fullName: session.full_name,
      accountStatus: session.account_status,
      emailVerified: session.email_verified,
      memberships: memberships.map((m) => ({
        id: m.id,
        workspaceId: m.workspace_id,
        workspaceName: m.workspace_name,
        workspaceCode: m.workspace_code,
        role: m.role,
        status: m.status,
      })),
    }
    req.sessionId = session.session_id
    await repo.touchSession(session.session_id)
    next()
  } catch (err) {
    next(err)
  }
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: { code: 'UNAUTHENTICATED', message: 'Authentication required', requestId: req.id },
    })
  }
  next()
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: { code: 'UNAUTHENTICATED', message: 'Authentication required', requestId: req.id },
      })
    }
    const allowed = req.user.memberships.some(
      (m) => m.status === 'active' && roles.includes(m.role),
    )
    if (!allowed) {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions', requestId: req.id },
      })
    }
    next()
  }
}
