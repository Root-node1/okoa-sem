import * as service from './claims.service.js'

function meta(req) {
  return { ipAddress: req.ip, userAgent: req.get('user-agent') }
}

export async function getClaim(req, res, next) {
  try {
    const claim = await service.getClaim(req.params.id, req.user)
    res.json({ data: claim })
  } catch (err) {
    next(err)
  }
}

export async function approveClaim(req, res, next) {
  try {
    const result = await service.approveClaim(req.params.id, req.user, req.body, meta(req))
    res.json({ data: result })
  } catch (err) {
    next(err)
  }
}

export async function rejectClaim(req, res, next) {
  try {
    const claim = await service.rejectClaim(req.params.id, req.user, req.body.reason, meta(req))
    res.json({ data: claim })
  } catch (err) {
    next(err)
  }
}

export async function requestClarification(req, res, next) {
  try {
    const claim = await service.requestClarification(req.params.id, req.user, req.body.note, meta(req))
    res.json({ data: claim })
  } catch (err) {
    next(err)
  }
}

export async function correctClaim(req, res, next) {
  try {
    const claim = await service.correctClaim(req.params.id, req.user, req.body, meta(req))
    res.json({ data: claim })
  } catch (err) {
    next(err)
  }
}
