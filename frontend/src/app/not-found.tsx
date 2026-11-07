import Link from 'next/link'

export default function NotFound() {
  return <main className="placeholder-page"><span className="eyebrow">404 · NOT FOUND</span><h1>That page isn&apos;t here.</h1><p>The link may have changed, or this course isn&apos;t in the demo workspace.</p><Link className="button button-dark" href="/dashboard">Back to dashboard</Link></main>
}
