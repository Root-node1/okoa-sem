import Link from 'next/link'

export const metadata = { title: 'Announcements' }

export default function AnnouncementsPage() {
  return <main className="placeholder-page"><span className="eyebrow">COURSE UPDATES</span><h1>Announcements live in your inbox.</h1><p>Confirmed course changes and notifications are collected alongside claim status in your student inbox.</p><Link className="button button-dark" href="/inbox">Open inbox</Link></main>
}
