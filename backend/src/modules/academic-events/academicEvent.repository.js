import { pool } from '../../config/database.js'

export async function createAcademicEvent(input) {
  const { rows } = await pool.query(
    `INSERT INTO academic_events
       (workspace_id, course_id, event_type, title, description, start_at, end_at, venue, status, source_claim_id, version, created_by, verified_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      input.workspaceId,
      input.courseId ?? null,
      input.eventType,
      input.title,
      input.description ?? null,
      input.startAt,
      input.endAt ?? null,
      input.venue ?? null,
      input.status ?? 'draft',
      input.sourceClaimId ?? null,
      input.version ?? 1,
      input.createdBy,
      input.verifiedBy ?? null,
    ],
  )
  return rows[0]
}

export async function getAcademicEventById(id) {
  const { rows } = await pool.query(`SELECT * FROM academic_events WHERE id = $1`, [id])
  return rows[0] ?? null
}

export async function listAcademicEvents({ workspaceId, courseId = null, status = null, from = null, to = null }) {
  const params = [workspaceId]
  let sql = `SELECT * FROM academic_events WHERE workspace_id = $1`
  if (courseId) { params.push(courseId); sql += ` AND course_id = $${params.length}` }
  if (status) { params.push(status); sql += ` AND status = $${params.length}` }
  if (from) { params.push(from); sql += ` AND start_at >= $${params.length}` }
  if (to) { params.push(to); sql += ` AND start_at <= $${params.length}` }
  sql += ` ORDER BY start_at ASC`
  const { rows } = await pool.query(sql, params)
  return rows
}

export async function supersedeAcademicEvent(id, newEventId) {
  const { rows } = await pool.query(
    `UPDATE academic_events SET status = 'superseded', updated_at = now() WHERE id = $1 RETURNING id, status`,
    [id],
  )
  return rows[0] ?? null
}


export async function findAcademicEventBySourceClaimId(sourceClaimId) {
  const { rows } = await pool.query(`SELECT * FROM academic_events WHERE source_claim_id = $1 ORDER BY version DESC LIMIT 1`, [sourceClaimId])
  return rows[0] ?? null
}
