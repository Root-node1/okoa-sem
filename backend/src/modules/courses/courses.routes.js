import express from 'express'
import { pool } from '../../config/database.js'

const router = express.Router()

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.id, c.institution_id, c.code, c.name, c.created_at,
              (SELECT COUNT(*)::int FROM extracted_claims ec WHERE ec.course_id = c.id AND ec.status = 'pending') AS pending_claims_count,
              (SELECT COUNT(*)::int FROM academic_events ae WHERE ae.course_id = c.id AND ae.status = 'verified') AS verified_events_count
         FROM courses c
        ORDER BY c.code ASC`,
    )
    res.json({ data: rows })
  } catch (err) {
    next(err)
  }
})

export default router
