import * as repo from './source.repository.js'
import { enqueueJob } from '../jobs/jobRepository.js'

export async function submitSource(input) {
  const source = await repo.createSource(input)
  const job = await enqueueJob(source.id, 'extraction')
  return { source, job }
}

export async function getSourceStatus(sourceId) {
  const source = await repo.getSourceById(sourceId)
  if (!source) return null
  return {
    id: source.id,
    status: source.status,
    createdAt: source.created_at,
    updatedAt: source.updated_at,
  }
}
