'use client'

import { useState, type FormEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/student/StatusBadge'
import { claims as initialClaims, notifications as initialNotifications } from './demo-data'
import type { Claim } from './types'

type InboxTab = 'updates' | 'shared'

export function InboxWorkspace() {
  const [tab, setTab] = useState<InboxTab>('updates')
  const [filter, setFilter] = useState('All items')
  const [items, setItems] = useState(initialClaims)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [message, setMessage] = useState('')
  const [course, setCourse] = useState('ICS 2207')
  const [notice, setNotice] = useState('')

  function submitUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!message.trim()) return
    const newClaim: Claim = {
      id: `c-${Date.now()}`,
      title: 'New information submitted',
      courseCode: course,
      source: 'Your message',
      submittedAt: 'Just now',
      status: 'Processing',
      evidence: message.trim(),
    }
    setItems((current) => [newClaim, ...current])
    setMessage('')
    setNotice('Added to this demo inbox. It has not been sent to the academic system.')
    setTab('shared')
  }

  function markAllRead() {
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })))
  }

  const visibleClaims = items.filter((claim) => filter === 'All items' || claim.status === filter)

  return <div className="inbox-workspace">
    <div className="inbox-toolbar">
      <div className="inbox-tabs" role="tablist" aria-label="Inbox views">
        <button aria-selected={tab === 'updates'} className={tab === 'updates' ? 'inbox-tab selected' : 'inbox-tab'} onClick={() => setTab('updates')} role="tab">Updates <span>4</span></button>
        <button aria-selected={tab === 'shared'} className={tab === 'shared' ? 'inbox-tab selected' : 'inbox-tab'} onClick={() => setTab('shared')} role="tab">Shared by you <span>{items.length}</span></button>
      </div>
      {tab === 'updates' && <button className="button button-quiet" onClick={markAllRead}>Mark all as read</button>}
    </div>
    {notice && <p aria-live="polite" className="inline-notice">{notice}</p>}

    {tab === 'updates' ? <div className="inbox-columns">
      <section className="content-panel inbox-notifications">
        <div className="section-heading"><div><span className="eyebrow">FROM YOUR COURSES</span><h2>Notifications</h2></div><span className="subtle-count">{notifications.filter((item) => item.unread).length} new</span></div>
        <div className="notification-list">{notifications.map((item) => <article className={`notification-row${item.unread ? ' is-unread' : ''}`} key={item.id}>
          <span className="notification-mark"><Icon name="bell" /></span><div><div className="change-title-line"><h3>{item.title}</h3>{item.unread && <span className="unread-dot" />}</div><p>{item.body}</p><time>{item.time}</time></div>
        </article>)}</div>
      </section>
      <section className="content-panel">
        <div className="section-heading"><div><span className="eyebrow">NEEDS A LOOK</span><h2>Items to review</h2></div><span className="subtle-count">2 pending</span></div>
        <div className="claim-teasers">{initialClaims.filter((item) => item.status !== 'Verified').map((item) => <article className="claim-teaser" key={item.id}><div className="claim-top"><strong>{item.courseCode}</strong><StatusBadge tone={item.status === 'Needs attention' ? 'amber' : 'blue'}>{item.status}</StatusBadge></div><h3>{item.title}</h3><p>{item.source}<span>·</span>{item.submittedAt}</p><div className="unverified-note"><span className="unverified-icon">i</span>This is unverified and won't appear as a confirmed event.</div></article>)}</div>
        <div className="permission-note"><Icon name="check" /><span>Only authorised course staff can verify or resolve academic information.</span></div>
      </section>
    </div> : <section aria-label="Your shared information" className="content-panel shared-claims">
      <div className="section-heading claim-list-heading"><div><span className="eyebrow">YOUR SUBMISSIONS</span><h2>Shared information</h2></div>
        <label className="filter-label">Show <select aria-label="Filter claims by status" onChange={(event) => setFilter(event.target.value)} value={filter}><option>All items</option><option>Processing</option><option>Pending review</option><option>Needs attention</option><option>Verified</option></select></label>
      </div>
      {visibleClaims.length ? <div className="claim-list">{visibleClaims.map((claim) => <article className="claim-row" key={claim.id}>
        <span className="claim-document"><Icon name="assignment" /></span><div className="claim-details"><div className="claim-title-line"><h3>{claim.title}</h3><StatusBadge tone={claim.status === 'Verified' ? 'green' : claim.status === 'Needs attention' ? 'amber' : claim.status === 'Processing' ? 'blue' : 'neutral'}>{claim.status}</StatusBadge></div><p>{claim.courseCode}<span>·</span>{claim.source}<span>·</span>{claim.submittedAt}</p><blockquote>{claim.evidence}</blockquote></div>
        {claim.confidence !== undefined && <span className="confidence">{claim.confidence}% <small>match</small></span>}
      </article>)}</div> : <div className="empty-state"><h3>No items in this filter</h3><p>Try a different status or share new course information.</p></div>}
    </section>}

    <section className="content-panel submit-panel" id="submit">
      <div className="submit-intro"><span className="submit-icon"><Icon name="upload" /></span><div><span className="eyebrow">SHARE AN UPDATE</span><h2>Found something useful?</h2><p>Paste a course message below. In the live app, authorised staff review it before it changes your calendar.</p></div></div>
      <form className="submit-form" onSubmit={submitUpdate}>
        <label htmlFor="course-select">Course</label>
        <select id="course-select" onChange={(event) => setCourse(event.target.value)} value={course}><option>ICS 2207</option><option>ICS 2211</option><option>ICS 2203</option><option>MAT 2201</option></select>
        <label htmlFor="source-message">Message or announcement</label>
        <textarea id="source-message" onChange={(event) => setMessage(event.target.value)} placeholder="Paste the message here..." rows={4} value={message} />
        <div className="submit-footer"><span><Icon name="check" /> Only your enrolled courses can be selected.</span><button className="button button-dark" disabled={!message.trim()} type="submit">Add to demo inbox <Icon name="arrow" /></button></div>
      </form>
    </section>
  </div>
}
