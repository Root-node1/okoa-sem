import { getCloudinaryConfig } from '../config/cloudinary.js'

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'text/plain',
])
const MAX_FILE_SIZE = 10 * 1024 * 1024

export function validateUploadInput({ mimeType, size }) {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    const err = new Error('Unsupported file type')
    err.status = 415
    err.code = 'UNSUPPORTED_FILE_TYPE'
    throw err
  }
  if (typeof size !== 'number' || size <= 0 || size > MAX_FILE_SIZE) {
    const err = new Error('File size is invalid or exceeds the maximum allowed size')
    err.status = 413
    err.code = 'INVALID_FILE_SIZE'
    throw err
  }
}

export async function uploadAcademicFile(input, clientOverride) {
  validateUploadInput(input)

  const config = getCloudinaryConfig()
  if (!config.configured) {
    const err = new Error(`Cloudinary is not configured: ${config.missing.join(', ')}`)
    err.status = 503
    err.code = 'CLOUDINARY_NOT_CONFIGURED'
    throw err
  }

  const client = clientOverride ?? config.client

  return new Promise((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder: 'okoa-sem/academic',
        resource_type: 'auto',
        type: 'authenticated',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve({
          publicId: result.public_id,
          resourceType: result.resource_type,
          format: result.format,
          bytes: result.bytes,
        })
      },
    )
    stream.end(input.buffer)
  })
}

export function createSignedDeliveryUrl(publicId, options = {}) {
  const config = getCloudinaryConfig()
  if (!config.configured) {
    const err = new Error(`Cloudinary is not configured: ${config.missing.join(', ')}`)
    err.status = 503
    err.code = 'CLOUDINARY_NOT_CONFIGURED'
    throw err
  }
  const client = options.client ?? config.client
  const expiresAt = Math.floor(Date.now() / 1000) + (options.expiresInSeconds ?? 900)
  return client.url(publicId, {
    secure: true,
    sign_url: true,
    type: 'authenticated',
    expires_at: expiresAt,
  })
}
