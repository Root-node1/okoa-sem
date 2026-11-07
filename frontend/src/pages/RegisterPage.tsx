import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { User, UserRole } from '../types'

interface AuthResponse {
  data: {
    user: User
    token: string
  }
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [institutionCode, setInstitutionCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          institutionCode,
          password,
          role,
        }),
      })

      login(response.data.user, response.data.token)

      const destinations: Record<UserRole, string> = {
        student: '/student',
        lecturer: '/lecturer',
        class_rep: '/class-rep',
      }

      navigate(destinations[response.data.user.role], { replace: true })
    } catch (err) {
      const message = err as { error?: { message?: string } }
      setError(message.error?.message ?? 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Join OKOA-SEM to coordinate your academic work.</p>
        </div>

        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Your full name" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email address</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="you@university.ac.ke" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Account role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full rounded-md border border-slate-300 px-3 py-2">
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="At least 8 characters" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Confirm password</label>
          <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Repeat your password" />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-700 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  )
}