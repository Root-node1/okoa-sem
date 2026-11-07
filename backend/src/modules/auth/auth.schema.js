import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[a-z]/, 'password must include a lowercase letter')
    .regex(/[A-Z]/, 'password must include an uppercase letter')
    .regex(/[0-9]/, 'password must include a number'),
})

export const loginSchema = z.object({
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
  password: z.string().min(1).max(128),
})
