import { env } from '../utils/env'
import type { ApiError } from '../types'

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = localStorage.getItem('okoa_token')

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    let error: ApiError = {
      error: {
        code: 'REQUEST_FAILED',
        message: 'Request failed',
      },
    }

    try {
      error = (await response.json()) as ApiError
    } catch {
      // Ignore invalid error responses.
    }

    throw error
  }

  return (await response.json()) as T
}

export const healthApi = {
  check: () => apiRequest<{ status: string }>('/health'),
  database: () => apiRequest<{ status: string }>('/health/database'),
}