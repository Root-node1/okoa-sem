import express from 'express'
import { pool } from '../../config/database.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const params = []
    let sql = `
      SELECT ae.*,
             c.code AS course_code,
             c.name AS course_name,
             u.full_name AS verified_by_name
        FROM academic_events ae
        LEFT JOIN courses c ON c.id = ae.course_id
        LEFT JOIN users u ON u.id = ae.verified_by
       WHERE 1 = 1
    `
    if (req.query.status) {
      params.push(req.query.status)
      sql += ` AND ae.status = $${params.length}`
    } else {
      sql += ` AND ae.status <> 'superseded'`
    }
    if (req.query.courseId) {
      params.push(req.query.courseId)
      sql += ` AND ae.course_id = $${params.length}`
    }
    sql += ` ORDER BY ae.start_at ASC LIMIT 100`
    const { rows } = await pool.query(sql, params)
    res.json({ data: rows })
  } catch (err) {
    next(err)
  }
})

export default router
