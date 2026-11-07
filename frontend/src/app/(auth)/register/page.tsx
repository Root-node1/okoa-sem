import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

export const metadata = { title: 'Create account' }

export default function RegisterPage() {
  return <section className="auth-card">
    <span className="eyebrow">A FRESH START</span><h1>Your semester, together.</h1><p className="auth-lede">Create a student account to bring your academic week into focus.</p>
    <div className="auth-demo-note"><strong>Preview mode</strong><span>Account creation is not connected yet. This form is a frontend preview only.</span></div>
    <form action="/dashboard" className="auth-form"><label>Full name<input autoComplete="name" placeholder="Your name" /></label><label>University email<input autoComplete="email" placeholder="you@university.ac.ke" type="email" /></label><label>Password<input autoComplete="new-password" placeholder="Create a password" type="password" /></label><button className="button button-dark" type="submit">Continue to demo <Icon name="arrow" /></button></form>
    <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
  </section>
}
