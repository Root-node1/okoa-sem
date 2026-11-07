import { pool } from '../../config/database.js'

export async function recordAudit({ actorId = null, action, entityType, entityId = null, beforeState = null, afterState = null, ipAddress = null, userAgent = null }) {
  const { rows } = await pool.query(
    `INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, before_state, after_state, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7, $8)
     RETURNING id, created_at`,
    [actorId, action, entityType, entityId, beforeState ? JSON.stringify(beforeState) : null, afterState ? JSON.stringify(afterState) : null, ipAddress, userAgent],
  )
  return rows[0]
}
