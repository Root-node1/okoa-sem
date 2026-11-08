import express from 'express'
import { z } from 'zod'
import { validate } from '../../middleware/validate.js'
import { pool } from '../../config/database.js'
import * as sourceService from './source.service.js'
import * as sourceRepo from './source.repository.js'
import { runExtraction } from '../extraction/extraction.service.js'

const router = express.Router()

const submitSourceSchema = z.object({
  courseId: z.string().uuid().optional().nullable(),
  courseCode: z.string().trim().max(40).optional(),
  sourceType: z.enum(['text', 'document', 'whatsapp_export']).default('text'),
  text: z.string().trim().min(3).max(10000),
  title: z.string().trim().max(200).optional(),
  channel: z.string().trim().max(80).optional(),
})

async function resolveDefaultContext(reqUser) {
  let workspaceId = reqUser?.institution_id ?? null
  let userId = reqUser?.id ?? null

  if (!workspaceId) {
    const ws = await pool.query(`SELECT id FROM institutions WHERE code = 'OKOA-DEFAULT' LIMIT 1`)
    workspaceId = ws.rows[0]?.id ?? null
  }
  if (!userId && workspaceId) {
    const u = await pool.query(`SELECT id FROM users WHERE institution_id = $1 ORDER BY created_at ASC LIMIT 1`, [workspaceId])
    userId = u.rows[0]?.id ?? null
  }
  return { workspaceId, userId }
}

router.post('/', validate(submitSourceSchema), async (req, res, next) => {
  try {
    const { workspaceId, userId } = await resolveDefaultContext(req.user)
    if (!workspaceId || !userId) {
      return res.status(401).json({
        error: { code: 'UNAUTHENTICATED', message: 'Authentication or seeded workspace user required' },
      })
    }

    let courseId = req.body.courseId ?? null
    if (!courseId && req.body.courseCode) {
      const courseRes = await pool.query(
        `SELECT id FROM courses WHERE institution_id = $1 AND UPPER(code) = UPPER($2) LIMIT 1`,
        [workspaceId, req.body.courseCode],
      )
      courseId = courseRes.rows[0]?.id ?? null
    }

    const { source, job } = await sourceService.submitSource({
      workspaceId,
      courseId,
      submittedBy: userId,
      sourceType: req.body.sourceType ?? 'text',
      metadata: {
        text: req.body.text,
        title: req.body.title ?? null,
        channel: req.body.channel ?? 'WhatsApp / Class Channel',
        courseHints: req.body.courseCode ? [req.body.courseCode] : [],
      },
    })

    const extraction = await runExtraction(source.id)
    await sourceRepo.updateSourceStatus(source.id, extraction.failed ? 'failed' : 'completed')

    res.status(201).json({
      data: {
        source: { ...source, status: extraction.failed ? 'failed' : 'completed' },
        job,
        extraction,
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/status', async (req, res, next) => {
  try {
    const status = await sourceService.getSourceStatus(req.params.id)
    if (!status) {
      return res.status(404).json({ error: { code: 'SOURCE_NOT_FOUND', message: 'Source not found' } })
    }
    res.json({ data: status })
  } catch (err) {
    next(err)
  }
})

export default router
