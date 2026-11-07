import Link from 'next/link'

export const metadata = { title: 'Lecturer workspace' }

export default function LecturerPage() {
  return <main className="placeholder-page"><span className="eyebrow">OKOA SEM · PREVIEW</span><h1>Lecturer workspace</h1><p>Staff publishing and verification tools are not part of this student frontend preview.</p><Link className="button button-dark" href="/dashboard">Return to student space</Link></main>
}
