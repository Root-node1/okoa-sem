import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/config/database.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(__dirname, '../migrations')

async function ensureMigrationTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `)
}

async function getAppliedMigrations(client) {
  const { rows } = await client.query('SELECT filename FROM schema_migrations')
  return new Set(rows.map((row) => row.filename))
}

async function main() {
  const client = await pool.connect()
  let files
  try {
    await client.query('BEGIN')
    await ensureMigrationTable(client)
    await client.query('COMMIT')

    files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort()

    const applied = await getAppliedMigrations(client)

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`Skipping already applied migration: ${file}`)
        continue
      }

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
      console.log(`Applying migration: ${file}`)

      const migrationClient = await pool.connect()
      try {
        await migrationClient.query('BEGIN')
        await migrationClient.query(sql)
        await migrationClient.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file])
        await migrationClient.query('COMMIT')
      } catch (err) {
        await migrationClient.query('ROLLBACK')
        throw err
      } finally {
        migrationClient.release()
      }
    }

    console.log('Migrations complete.')
  } finally {
    client.release()
    await pool.end()
  }
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
