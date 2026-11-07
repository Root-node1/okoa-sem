import { claimNextJob, completeJob, failJob, getJobBySource } from '../modules/jobs/jobRepository.js'
import { updateSourceStatus } from '../modules/sources/source.repository.js'

const DEFAULT_POLL_INTERVAL_MS = 2000

export async function processJob(job, processor) {
  await updateSourceStatus(job.source_id, 'processing')
  try {
    await processor(job)
    await completeJob(job.id)
    await updateSourceStatus(job.source_id, 'completed')
  } catch (err) {
    const failed = await failJob(job.id, err, true)
    if (failed?.status === 'failed') {
      await updateSourceStatus(job.source_id, 'failed')
    }
    throw err
  }
}

export function startWorker({ processor, pollIntervalMs = DEFAULT_POLL_INTERVAL_MS, workerId = `worker-${process.pid}` } = {}) {
  let stopped = false
  let timer = null

  const loop = async () => {
    if (stopped) return
    try {
      const job = await claimNextJob(workerId)
      if (job) {
        try {
          await processJob(job, processor)
        } catch {
          // Errors are recorded by processJob.
        }
      }
    } catch (err) {
      console.error('Processing worker error:', err.message)
    }
    if (!stopped) timer = setTimeout(loop, pollIntervalMs)
  }

  timer = setTimeout(loop, 0)

  return {
    stop() {
      stopped = true
      if (timer) clearTimeout(timer)
    },
  }
}

async function defaultProcessor() {
  throw new Error('Extraction processor is not configured')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const worker = startWorker({ processor: defaultProcessor })
  const shutdown = () => {
    worker.stop()
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
  console.log('Okoa Sem processing worker started')
}
