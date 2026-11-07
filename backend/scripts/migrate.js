import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/config/database.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(__dirname, '../migrations')

async function main() {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
    console.log(`Applying migration: ${file}`)
    await pool.query(sql)
  }

  await pool.end()
  console.log('Migrations complete.')
}

main().catch(async (err) => {
  console.error('Migration failed:', err.message)
  try {
    await pool.end()
  } catch {
    // ignore
  }
  process.exit(1)
})
