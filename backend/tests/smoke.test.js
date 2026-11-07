import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import app from '../src/app.js'

test('health endpoint smoke test', async () => {
  const res = await request(app).get('/api/v1/health')
  assert.equal(res.status, 200)
  assert.equal(res.body.status, 'ok')
})
