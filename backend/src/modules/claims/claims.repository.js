import { pool } from '../../config/database.js'

export async function getClaimById(id) {
  const { rows } = await pool.query(`SELECT * FROM extracted_claims WHERE id = $1`, [id])
  return rows[0] ?? null
}

export async function listClaims({ status = null, courseId = null } = {}) {
  const params = []
  let sql = `
    SELECT ec.*,
           c.code AS course_code,
           c.name AS course_name,
           s.source_type,
           s.metadata AS source_metadata,
           u.full_name AS submitted_by_name,
           u.role AS submitted_by_role
      FROM extracted_claims ec
      LEFT JOIN courses c ON c.id = ec.course_id
      LEFT JOIN sources s ON s.id = ec.source_id
      LEFT JOIN users u ON u.id = s.submitted_by
     WHERE 1 = 1
  `
  if (status) {
    params.push(status)
    sql += ` AND ec.status = $${params.length}`
  }
  if (courseId) {
    params.push(courseId)
    sql += ` AND ec.course_id = $${params.length}`
  }
  sql += ` ORDER BY ec.extracted_at DESC LIMIT 100`
  const { rows } = await pool.query(sql, params)
  return rows
}

export async function updateClaimStatus(id, status, extra = {}) {
  const { rows } = await pool.query(
    `UPDATE extracted_claims
        SET status = $2,
            failure_reason = COALESCE($3, failure_reason),
            updated_at = now()
      WHERE id = $1
      RETURNING *`,
    [id, status, extra.failureReason ?? null],
  )
  return rows[0] ?? null
}

export async function updateClaimFields(id, fields) {
  const allowed = ['title', 'description', 'course_id', 'course_hint', 'start_at', 'end_at', 'venue', 'confidence', 'ambiguity_flags', 'evidence_snippet']
  const sets = []
  const params = [id]
  for (const [key, value] of Object.entries(fields)) {
    const column = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
    if (!allowed.includes(column)) continue
    params.push(value)
    sets.push(`${column} = $${params.length}`)
  }
  if (sets.length === 0) return getClaimById(id)
  const { rows } = await pool.query(
    `UPDATE extracted_claims SET ${sets.join(', ')}, updated_at = now() WHERE id = $1 RETURNING *`,
    params,
  )
  return rows[0] ?? null
}

