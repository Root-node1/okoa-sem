import * as claimsRepo from './claims.repository.js'
import * as sourcesRepo from '../sources/source.repository.js'
import * as eventsRepo from '../academic-events/academicEvent.repository.js'
import * as eventsService from '../academic-events/academicEvent.service.js'
import { hasCourseAccess, hasWorkspaceAccess, getCourseWorkspaceId } from '../../lib/authorization.js'
import { recordAudit } from '../audit/audit.repository.js'

function httpError(status, code, message) {
  const err = new Error(message)
  err.status = status
  err.code = code
  return err
}

async function loadClaim(claimId) {
  const claim = await claimsRepo.getClaimById(claimId)
  if (!claim) throw httpError(404, 'CLAIM_NOT_FOUND', 'Claim not found')
  return claim
}

async function authorizeClaim(claim, user) {
  if (!user?.id) throw httpError(401, 'UNAUTHENTICATED', 'Authentication required')

  if (claim.course_id) {
    const allowed = await hasCourseAccess(user, claim.course_id, ['lecturer'])
    if (!allowed) throw httpError(403, 'FORBIDDEN', 'Insufficient course permissions')
    return await getCourseWorkspaceId(claim.course_id)
  }

  const source = await sourcesRepo.getSourceById(claim.source_id)
  const workspaceId = source?.workspace_id
  if (!workspaceId) throw httpError(404, 'SOURCE_NOT_FOUND', 'Source not found')
  const allowed = await hasWorkspaceAccess(user, workspaceId, ['lecturer'])
  if (!allowed) throw httpError(403, 'FORBIDDEN', 'Insufficient workspace permissions')
  return workspaceId
}

export async function getClaim(claimId, user) {
  const claim = await loadClaim(claimId)
  await authorizeClaim(claim, user)
  return claim
}

export async function approveClaim(claimId, user, corrections = {}, meta = {}) {
  const claim = await loadClaim(claimId)
  if (claim.status === 'approved') {
    const existing = await eventsRepo.findAcademicEventBySourceClaimId(claim.id)
    return { claim, event: existing }
  }
  if (claim.status !== 'pending') {
    throw httpError(409, 'CLAIM_NOT_PENDING', 'Only pending claims can be approved')
  }

  const workspaceId = await authorizeClaim(claim, user)
  const updatedClaim = Object.keys(corrections).length > 0
    ? await claimsRepo.updateClaimFields(claim.id, corrections)
    : claim

  const event = await eventsService.createAcademicEvent({
    workspaceId,
    courseId: updatedClaim.course_id,
    eventType: updatedClaim.claim_type,
    title: updatedClaim.title,
    description: updatedClaim.description,
    startAt: updatedClaim.start_at,
    endAt: updatedClaim.end_at,
    venue: updatedClaim.venue,
    status: 'verified',
    sourceClaimId: updatedClaim.id,
    createdBy: user.id,
    verifiedBy: user.id,
  }, { id: user.id, ipAddress: meta.ipAddress, userAgent: meta.userAgent })

  const approved = await claimsRepo.updateClaimStatus(updatedClaim.id, 'approved')

  await recordAudit({
    actorId: user.id,
    action: 'claim.approved',
    entityType: 'extracted_claim',
    entityId: approved.id,
    beforeState: claim,
    afterState: { claim: approved, eventId: event.id },
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  })

  return { claim: approved, event }
}

export async function rejectClaim(claimId, user, reason = null, meta = {}) {
  const claim = await loadClaim(claimId)
  if (claim.status !== 'pending') {
    throw httpError(409, 'CLAIM_NOT_PENDING', 'Only pending claims can be rejected')
  }
  await authorizeClaim(claim, user)
  const rejected = await claimsRepo.updateClaimStatus(claim.id, 'rejected', { failureReason: reason })
  await recordAudit({
    actorId: user.id,
    action: 'claim.rejected',
    entityType: 'extracted_claim',
    entityId: rejected.id,
    beforeState: claim,
    afterState: rejected,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  })
  return rejected
}

export async function requestClarification(claimId, user, note = null, meta = {}) {
  const claim = await loadClaim(claimId)
  if (claim.status !== 'pending') {
    throw httpError(409, 'CLAIM_NOT_PENDING', 'Only pending claims can request clarification')
  }
  await authorizeClaim(claim, user)
  const flags = Array.isArray(claim.ambiguity_flags) ? claim.ambiguity_flags : []
  if (!flags.includes('needs_clarification')) flags.push('needs_clarification')
  const updated = await claimsRepo.updateClaimFields(claim.id, { ambiguity_flags: flags })
  await recordAudit({
    actorId: user.id,
    action: 'claim.clarification_requested',
    entityType: 'extracted_claim',
    entityId: updated.id,
    beforeState: claim,
    afterState: { claim: updated, note },
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  })
  return updated
}

export async function correctClaim(claimId, user, fields = {}, meta = {}) {
  const claim = await loadClaim(claimId)
  if (claim.status !== 'pending') {
    throw httpError(409, 'CLAIM_NOT_PENDING', 'Only pending claims can be corrected')
  }
  await authorizeClaim(claim, user)
  const updated = await claimsRepo.updateClaimFields(claim.id, fields)
  await recordAudit({
    actorId: user.id,
    action: 'claim.corrected',
    entityType: 'extracted_claim',
    entityId: updated.id,
    beforeState: claim,
    afterState: updated,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  })
  return updated
}
