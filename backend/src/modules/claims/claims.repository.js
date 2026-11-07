import { pool } from '../../config/database.js'

export async function getClaimById(id) {
  const { rows } = await pool.query(`SELECT * FROM extracted_claims WHERE id = $1`, [id])
  return rows[0] ?? null
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

