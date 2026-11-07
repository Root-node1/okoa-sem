# Frontend Authentication Integration Examples

These examples are illustrative and compatible with the existing React + TypeScript + Vite frontend.

## 1. Centralized API client

`src/services/api.ts`
```ts
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1'

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw error
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
```

## 2-5. API functions

```ts
export const register = (payload: { fullName: string; email: string; password: string }) =>
  apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) })

export const login = (payload: { email: string; password: string }) =>
  apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) })

export const logout = () =>
  apiRequest('/auth/logout', { method: 'POST' })

export const getCurrentUser = () =>
  apiRequest('/auth/me')
```

## 6. TypeScript interfaces

```ts
export interface AuthUser {
  id: string
  email: string
  fullName: string
  accountStatus: 'active' | 'suspended' | 'inactive'
  emailVerified: boolean
  memberships: {
    id: string
    workspaceId: string
    workspaceName: string
    workspaceCode: string
    role: 'student' | 'class_rep' | 'lecturer'
    status: 'active' | 'suspended' | 'removed'
  }[]
}

export interface AuthResponse {
  data: AuthUser
}
```

## 7. Auth context

```tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

const AuthContext = createContext<{
  user: AuthUser | null
  setUser: (u: AuthUser | null) => void
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

## 8. Startup session restoration

```tsx
useEffect(() => {
  getCurrentUser()
    .then((res: AuthResponse) => setUser(res.data))
    .catch(() => setUser(null))
}, [])
```

## 9. Protected route

```tsx
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}
```

## 10. Role-aware UI

```tsx
const isLecturer = user?.memberships.some((m) => m.role === 'lecturer' && m.status === 'active')
```

Use this for display only; backend remains authoritative.

## 11. Expired sessions

On any 401 response, clear user state and redirect to login.
