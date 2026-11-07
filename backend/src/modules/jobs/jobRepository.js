import { pool } from '../../config/database.js'

export async function enqueueJob(sourceId, jobType = 'extraction') {
  const { rows } = await pool.query(
    `INSERT INTO processing_jobs (source_id, job_type)
     VALUES ($1, $2)
     ON CONFLICT (source_id, job_type) DO UPDATE
       SET updated_at = now()
     RETURNING id, source_id, job_type, status, attempts, max_attempts, locked_at, locked_by, next_retry_at, last_error, created_at, updated_at`,
    [sourceId, jobType],
  )
  return rows[0]
}

export async function getJobById(id) {
  const { rows } = await pool.query(`SELECT * FROM processing_jobs WHERE id = $1`, [id])
  return rows[0] ?? null
}

export async function getJobBySource(sourceId, jobType = 'extraction') {
  const { rows } = await pool.query(
    `SELECT * FROM processing_jobs WHERE source_id = $1 AND job_type = $2`,
    [sourceId, jobType],
  )
  return rows[0] ?? null
}

export async function claimNextJob(workerId) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { rows } = await client.query(
      `WITH next_job AS (
         SELECT id
           FROM processing_jobs
          WHERE status = 'queued'
            AND (next_retry_at IS NULL OR next_retry_at <= now())
          ORDER BY created_at
          FOR UPDATE SKIP LOCKED
          LIMIT 1
       )
       UPDATE processing_jobs AS j
          SET status = 'processing',
              attempts = j.attempts + 1,
              locked_at = now(),
              locked_by = $1,
              updated_at = now()
         FROM next_job
        WHERE j.id = next_job.id
      RETURNING j.*`,
      [workerId],
    )
    await client.query('COMMIT')
    return rows[0] ?? null
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

export async function completeJob(id) {
  const { rows } = await pool.query(
    `UPDATE processing_jobs
        SET status = 'completed', locked_at = NULL, locked_by = NULL, last_error = NULL, updated_at = now()
      WHERE id = $1
      RETURNING id, status`,
    [id],
  )
  return rows[0] ?? null
}

export async function failJob(id, error, retryable = true) {
  const job = await getJobById(id)
  if (!job) return null
  const attempts = job.attempts
  const shouldRetry = retryable && attempts < job.max_attempts
  const backoffSeconds = Math.min(300, 2 ** attempts * 5)
  const { rows } = await pool.query(
    `UPDATE processing_jobs
        SET status = $2,
            locked_at = NULL,
            locked_by = NULL,
            next_retry_at = $3,
            last_error = $4,
            updated_at = now()
      WHERE id = $1
      RETURNING id, status, attempts, next_retry_at`,
    [id, shouldRetry ? 'queued' : 'failed', shouldRetry ? new Date(Date.now() + backoffSeconds * 1000) : null, String(error?.message ?? error)],
  )
  return rows[0] ?? null
}
