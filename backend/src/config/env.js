import dotenv from 'dotenv'

dotenv.config()

function required(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  authSecret: process.env.AUTH_SECRET ?? 'dev-secret',
  aiProvider: process.env.AI_PROVIDER ?? 'mock',
  aiModel: process.env.AI_MODEL ?? 'gemini-2.5-flash',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
}

export function validateEnv() {
  if (!env.databaseUrl) {
    if (env.nodeEnv === 'test') {
      throw new Error('DATABASE_URL is required to run the backend test suite.')
    }
    console.warn('DATABASE_URL is not set; database health check will fail.')
  }
}
