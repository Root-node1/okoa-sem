import test from 'node:test'
import assert from 'node:assert/strict'
import { validateUploadInput, uploadAcademicFile, createSignedDeliveryUrl } from '../src/services/cloudinaryService.js'

test('validateUploadInput accepts supported files', () => {
  assert.doesNotThrow(() => validateUploadInput({ mimeType: 'application/pdf', size: 100 }))
})

test('validateUploadInput rejects unsupported type and invalid size', () => {
  assert.throws(() => validateUploadInput({ mimeType: 'application/exe', size: 100 }), (err) => err.code === 'UNSUPPORTED_FILE_TYPE')
  assert.throws(() => validateUploadInput({ mimeType: 'application/pdf', size: 0 }), (err) => err.code === 'INVALID_FILE_SIZE')
  assert.throws(() => validateUploadInput({ mimeType: 'application/pdf', size: 20 * 1024 * 1024 }), (err) => err.code === 'INVALID_FILE_SIZE')
})

test('uploadAcademicFile uses injected client', async () => {
  const prev = { ...process.env }
  process.env.CLOUDINARY_CLOUD_NAME = 'demo'
  process.env.CLOUDINARY_API_KEY = 'key'
  process.env.CLOUDINARY_API_SECRET = 'secret'

  const mockClient = {
    uploader: {
      upload_stream: (options, cb) => {
        process.nextTick(() => cb(null, { public_id: 'okoa/test', resource_type: 'raw', format: 'pdf', bytes: 10 }))
        return { end: () => {} }
      },
    },
  }

  const result = await uploadAcademicFile(
    { buffer: Buffer.from('data'), mimeType: 'application/pdf', size: 4 },
    mockClient,
  )
  assert.equal(result.publicId, 'okoa/test')

  Object.assign(process.env, prev)
})

test('uploadAcademicFile fails when Cloudinary is not configured', async () => {
  const prev = process.env.CLOUDINARY_CLOUD_NAME
  delete process.env.CLOUDINARY_CLOUD_NAME
  delete process.env.CLOUDINARY_API_KEY
  delete process.env.CLOUDINARY_API_SECRET
  await assert.rejects(
    () => uploadAcademicFile({ buffer: Buffer.from('data'), mimeType: 'application/pdf', size: 4 }),
    (err) => err.code === 'CLOUDINARY_NOT_CONFIGURED',
  )
  if (prev) process.env.CLOUDINARY_CLOUD_NAME = prev
})
