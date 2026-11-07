import { z } from 'zod'

export const approveClaimSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(2000).optional(),
  courseId: z.string().uuid().optional(),
  courseHint: z.string().trim().max(120).optional(),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
  venue: z.string().trim().max(200).optional(),
  confidence: z.number().min(0).max(1).optional(),
})

export const rejectClaimSchema = z.object({
  reason: z.string().trim().max(500).optional(),
})

export const clarificationSchema = z.object({
  note: z.string().trim().max(1000).optional(),
})

export const correctionSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(2000).optional(),
  courseId: z.string().uuid().optional(),
  courseHint: z.string().trim().max(120).optional(),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
  venue: z.string().trim().max(200).optional(),
  confidence: z.number().min(0).max(1).optional(),
})
