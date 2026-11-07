import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  token: string | null
  loading: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('okoa_user')
    const savedToken = localStorage.getItem('okoa_token')

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser) as User)
        setToken(savedToken)
      } catch {
        localStorage.removeItem('okoa_user')
        localStorage.removeItem('okoa_token')
      }
    }

    setLoading(false)
  }, [])

  const login = (newUser: User, newToken: string) => {
    localStorage.setItem('okoa_user', JSON.stringify(newUser))
    localStorage.setItem('okoa_token', newToken)
    setUser(newUser)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('okoa_user')
    localStorage.removeItem('okoa_token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
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