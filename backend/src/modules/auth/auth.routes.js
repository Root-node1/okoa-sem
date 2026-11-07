import express from 'express'
import rateLimit from 'express-rate-limit'
import { validate } from '../../middleware/validate.js'
import { registerSchema, loginSchema } from './auth.schema.js'
import * as controller from './auth.controller.js'
import { requireAuth } from '../../middleware/auth.js'

const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many authentication attempts. Please try again later.',
        requestId: req.id,
      },
    })
  },
})

router.post('/register', validate(registerSchema), controller.register)
router.post('/login', loginLimiter, validate(loginSchema), controller.login)
router.get('/me', requireAuth, controller.me)
router.post('/logout', requireAuth, controller.logout)

export default router
