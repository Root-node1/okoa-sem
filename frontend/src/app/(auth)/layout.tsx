import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="auth-page"><div className="auth-brand"><span className="brand-mark">o</span><strong>okoa<span>.</span></strong></div>{children}<p className="auth-footnote">Academic information you can trust.</p></main>
}
