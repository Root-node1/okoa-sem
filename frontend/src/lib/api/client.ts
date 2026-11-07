import type { ApiErrorResponse } from '@/contracts/api'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly requestId?: string,
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.')
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiErrorResponse | null
    throw new ApiRequestError(
      payload?.error.message ?? `Request failed with status ${response.status}.`,
      response.status,
      payload?.error.code ?? 'REQUEST_FAILED',
      payload?.error.requestId,
    )
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}
