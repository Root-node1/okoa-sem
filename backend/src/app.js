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

validateEnv()

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
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

app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } })
})

app.use(errorHandler)

export default app
