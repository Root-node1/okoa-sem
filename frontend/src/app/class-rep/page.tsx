import Link from 'next/link'

export const metadata = { title: 'Class representative' }

export default function ClassRepPage() {
  return <main className="placeholder-page"><span className="eyebrow">OKOA SEM · PREVIEW</span><h1>Class representative tools</h1><p>Class rep workflows are planned separately. For now, share course information through the student inbox preview.</p><Link className="button button-dark" href="/inbox#submit">Share course information</Link></main>
}
