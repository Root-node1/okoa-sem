const ALLOWED_ROLES = ['student', 'class_rep', 'lecturer']

export function authenticate(req, _res, next) {
  // Development-only mock authentication. Replace with real auth in production.
  if (process.env.NODE_ENV !== 'production') {
    const id = req.header('x-user-id')
    const role = req.header('x-user-role')
    if (id && ALLOWED_ROLES.includes(role)) {
      req.user = { id, role }
    }
  }
  next()
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required', requestId: req.id } })
  }
  next()
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Authentication required', requestId: req.id } })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions', requestId: req.id } })
    }
    next()
  }
}
