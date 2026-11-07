import { z } from 'zod'

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(422).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
          requestId: req.id,
        },
      })
    }
    req.body = result.data
    next()
  }
}
