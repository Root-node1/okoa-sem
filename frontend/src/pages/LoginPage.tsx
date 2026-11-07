
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { User } from '../types'

interface AuthResponse {
  data: {
    user: User
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const destinations = {
    student: '/student',
    lecturer: '/lecturer',
    class_rep: '/class-rep',
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      login(response.data.user)

      const from = location.state?.from?.pathname
      navigate(from || destinations[response.data.user.role], {
        replace: true,
      })
    } catch (err) {
      const message = err as { error?: { message?: string } }
      setError(message.error?.message ?? 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Already signed in. Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Welcome back
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          Sign in to your OKOA-SEM account.
        </p>

        {error && (
          <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="mb-2 block text-sm font-medium">
          Email address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mb-5 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

        <label className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}
