import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { env } from '../utils/env'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function restoreSession() {
      try {
        const response = await fetch(`${env.apiUrl}/auth/me`, {
          credentials: 'include',
        })

        if (response.ok) {
          const payload = (await response.json()) as { data: User }
          if (active) setUser(payload.data)
        } else {
          if (active) setUser(null)
        }
      } catch {
        if (active) setUser(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    void restoreSession()

    return () => {
      active = false
    }
  }, [])

  const login = (newUser: User) => {
    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
    void fetch(`${env.apiUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}
