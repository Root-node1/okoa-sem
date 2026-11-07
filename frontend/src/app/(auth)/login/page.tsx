import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

export const metadata = { title: 'Sign in' }

export default function LoginPage() {
  return <section className="auth-card">
    <span className="eyebrow">WELCOME BACK</span><h1>Good to see you.</h1><p className="auth-lede">Sign in to pick up where you left off.</p>
    <div className="auth-demo-note"><strong>Preview mode</strong><span>Authentication isn&apos;t connected yet. Continue to explore the student workspace.</span></div>
    <form action="/dashboard" className="auth-form"><label>Email address<input autoComplete="email" placeholder="you@university.ac.ke" type="email" /></label><label>Password<input autoComplete="current-password" placeholder="Enter your password" type="password" /></label><button className="button button-dark" type="submit">Continue to demo <Icon name="arrow" /></button></form>
    <p className="auth-switch">New to Okoa? <Link href="/register">Create an account</Link></p>
  </section>
}
