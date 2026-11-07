import { pool } from '../config/database.js'

export async function hasWorkspaceAccess(user, workspaceId, roles = []) {
  if (!user?.id || !workspaceId) return false
  const { rows } = await pool.query(
    `SELECT 1
       FROM workspace_memberships
      WHERE user_id = $1
        AND workspace_id = $2
        AND status = 'active'
        AND ($3::text[] IS NULL OR role = ANY($3::text[]))
      LIMIT 1`,
    [user.id, workspaceId, roles.length ? roles : null],
  )
  return rows.length > 0
}

export async function getCourseWorkspaceId(courseId) {
  const { rows } = await pool.query(`SELECT institution_id FROM courses WHERE id = $1`, [courseId])
  return rows[0]?.institution_id ?? null
}

export async function hasCourseAccess(user, courseId, roles = []) {
  if (!user?.id || !courseId) return false
  const workspaceId = await getCourseWorkspaceId(courseId)
  if (!workspaceId) return false

  const workspaceOk = await hasWorkspaceAccess(user, workspaceId, roles.length ? roles : ['student', 'class_rep', 'lecturer'])
  if (!workspaceOk) return false

  if (roles.includes('student') || roles.length === 0) {
    const { rows } = await pool.query(
      `SELECT 1 FROM course_enrolments WHERE user_id = $1 AND course_id = $2 LIMIT 1`,
      [user.id, courseId],
    )
    if (rows.length > 0 && (roles.length === 0 || roles.includes('student'))) return true
  }

  const { rows } = await pool.query(
    `SELECT 1
       FROM course_memberships
      WHERE user_id = $1
        AND course_id = $2
        AND status = 'active'
        AND ($3::text[] IS NULL OR role = ANY($3::text[]))
      LIMIT 1`,
    [user.id, courseId, roles.filter((r) => r !== 'student').length ? roles.filter((r) => r !== 'student') : null],
  )
  return rows.length > 0
}

export function requireCourseAccess(roles = [], paramName = 'courseId') {
  return async (req, res, next) => {
    try {
      const courseId = req.params?.[paramName] ?? req.body?.courseId ?? req.query?.courseId
      const allowed = await hasCourseAccess(req.user, courseId, roles)
      if (!allowed) {
        return res.status(403).json({
          error: { code: 'FORBIDDEN', message: 'Insufficient course permissions', requestId: req.id },
        })
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
