import express from 'express'
import { checkDatabase } from '../config/database.js'

const router = express.Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

router.get('/health/database', async (_req, res, next) => {
  try {
    await checkDatabase()
    res.json({ status: 'ok' })
  } catch (err) {
    err.status = 503
    err.code = 'DATABASE_UNAVAILABLE'
    next(err)
  }
})

export default router
