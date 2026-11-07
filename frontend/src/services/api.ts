import { env } from '../utils/env'
import type { ApiError } from '../types'

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  })

  if (!response.ok) {
    let error: ApiError = { error: { code: 'REQUEST_FAILED', message: 'Request failed' } }
    try {
      error = (await response.json()) as ApiError
    } catch {
      // ignore
    }
    throw error
  }

  return (await response.json()) as T
}

export const healthApi = {
  check: () => apiRequest<{ status: string }>('/health'),
  database: () => apiRequest<{ status: string }>('/health/database'),
}
