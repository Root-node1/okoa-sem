import express from 'express'
import { validate } from '../../middleware/validate.js'
import { requireAuth } from '../../middleware/auth.js'
import * as controller from './claims.controller.js'
import { approveClaimSchema, rejectClaimSchema, clarificationSchema, correctionSchema } from './claims.schema.js'

const router = express.Router()

router.get('/:id', requireAuth, controller.getClaim)
router.post('/:id/approve', requireAuth, validate(approveClaimSchema), controller.approveClaim)
router.post('/:id/reject', requireAuth, validate(rejectClaimSchema), controller.rejectClaim)
router.post('/:id/request-clarification', requireAuth, validate(clarificationSchema), controller.requestClarification)
router.patch('/:id', requireAuth, validate(correctionSchema), controller.correctClaim)

export default router
