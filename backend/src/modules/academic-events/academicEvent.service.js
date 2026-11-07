import * as repo from './academicEvent.repository.js'
import { recordAudit } from '../audit/audit.repository.js'

export async function createAcademicEvent(input, actor) {
  const event = await repo.createAcademicEvent(input)
  await recordAudit({
    actorId: actor?.id ?? input.createdBy,
    action: 'academic_event.created',
    entityType: 'academic_event',
    entityId: event.id,
    afterState: event,
    ipAddress: actor?.ipAddress,
    userAgent: actor?.userAgent,
  })
  return event
}

export async function supersedeAcademicEvent(existingEventId, input, actor) {
  const existing = await repo.getAcademicEventById(existingEventId)
  if (!existing) return null
  const newEvent = await repo.createAcademicEvent({
    ...input,
    version: (existing.version ?? 1) + 1,
    sourceClaimId: input.sourceClaimId ?? existing.source_claim_id,
  })
  await repo.supersedeAcademicEvent(existingEventId, newEvent.id)
  await recordAudit({
    actorId: actor?.id ?? input.createdBy,
    action: 'academic_event.superseded',
    entityType: 'academic_event',
    entityId: existingEventId,
    beforeState: existing,
    afterState: newEvent,
    ipAddress: actor?.ipAddress,
    userAgent: actor?.userAgent,
  })
  return newEvent
}
