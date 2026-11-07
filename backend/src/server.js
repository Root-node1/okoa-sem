import app from './app.js'
import { closeDatabase } from './config/database.js'
import { env } from './config/env.js'

const server = app.listen(env.port, '0.0.0.0', () => {
  console.log(`Okoa Sem backend listening on http://localhost:${env.port}`)
})

async function shutdown(signal) {
  console.log(`Received ${signal}, shutting down...`)
  server.close(async () => {
    await closeDatabase()
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
