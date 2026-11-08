import { z } from 'zod';

export const claimTypeEnum = z.enum([
  'cat', 'exam', 'assignment', 'lecture', 'meeting', 
  'deadline', 'venue_change', 'announcement', 'material', 'instruction'
]);

export const extractedClaimSchema = z.object({
  type: claimTypeEnum,
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  courseHint: z.string().optional(),
  proposedDates: z.array(z.string().datetime()).optional(),
  venue: z.string().optional(),
  confidence: z.number().min(0).max(1),
  evidenceSnippet: z.string()
});

export const extractionResultSchema = z.object({
  claims: z.array(extractedClaimSchema),
  summary: z.string()
});