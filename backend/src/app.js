import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { requestId } from './middleware/requestId.js'
import { errorHandler } from './middleware/errorHandler.js'
import { authenticate } from './middleware/auth.js'
import { validateEnv } from './config/env.js'
import healthRoutes from './routes/health.js'
import authRoutes from './modules/auth/auth.routes.js'
import claimsRoutes from './modules/claims/claims.routes.js'
import sourcesRoutes from './modules/sources/sources.routes.js'
import academicEventsRoutes from './modules/academic-events/academicEvents.routes.js'
import coursesRoutes from './modules/courses/courses.routes.js'

validateEnv()

const app = express()

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((s) => s.trim()) : []),
])

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true)
      }
      return callback(null, false)
    },
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(requestId)
app.use(authenticate)

app.use('/api/v1', healthRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/claims', claimsRoutes)
app.use('/api/v1/sources', sourcesRoutes)
app.use('/api/v1/events', academicEventsRoutes)
app.use('/api/v1/courses', coursesRoutes)

app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } })
})

app.use(errorHandler)

export default app
