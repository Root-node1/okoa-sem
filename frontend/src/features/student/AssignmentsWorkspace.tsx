'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/student/StatusBadge'
import { assignments as initialAssignments, formatDate } from './demo-data'

export function AssignmentsWorkspace() {
  const [filter, setFilter] = useState('All assignments')
  const [items, setItems] = useState(initialAssignments)
  const visible = items.filter((item) => filter === 'All assignments' || item.status === filter)

  function markSubmitted(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: 'Submitted', progress: 100 } : item))
  }

  return <div>
    <div className="assignment-summary">
      <div className="summary-tile"><span>DUE THIS WEEK</span><strong>03</strong><small>one deadline in 2 days</small></div>
      <div className="summary-tile"><span>IN PROGRESS</span><strong>{items.filter((item) => item.status === 'In progress').length.toString().padStart(2, '0')}</strong><small>keep the momentum going</small></div>
      <div className="summary-tile"><span>SUBMITTED</span><strong>{items.filter((item) => item.status === 'Submitted').length.toString().padStart(2, '0')}</strong><small>nice work, Amara</small></div>
    </div>
    <section className="content-panel assignment-panel">
      <div className="section-heading"><div><span className="eyebrow">SEMESTER II</span><h2>Your assignments</h2></div>
        <label className="filter-label">Show <select aria-label="Filter assignments" onChange={(event) => setFilter(event.target.value)} value={filter}><option>All assignments</option><option>Not started</option><option>In progress</option><option>Submitted</option></select></label>
      </div>
      <div className="assignment-list">{visible.map((assignment) => <article className="assignment-row" key={assignment.id}>
        <div className={`assignment-status-mark${assignment.status === 'Submitted' ? ' complete' : ''}`}>{assignment.status === 'Submitted' ? <Icon name="check" /> : <Icon name="assignment" />}</div>
        <div className="assignment-info"><div className="assignment-title-line"><h3>{assignment.title}</h3><StatusBadge tone={assignment.status === 'Submitted' ? 'green' : assignment.status === 'In progress' ? 'blue' : 'neutral'}>{assignment.status}</StatusBadge></div><p>{assignment.courseCode}<span>·</span>Due {formatDate(assignment.dueAt, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
          <div className="assignment-progress"><span className="progress-track"><i style={{ width: `${assignment.progress}%` }} /></span><small>{assignment.progress === 100 ? 'Submitted' : assignment.progress ? `${assignment.progress}% complete` : 'Not started'}</small></div>
        </div>
        {assignment.status !== 'Submitted' ? <button className="button button-quiet" onClick={() => markSubmitted(assignment.id)}>Mark submitted <Icon name="arrow" /></button> : <span className="submitted-label"><Icon name="check" />Done</span>}
      </article>)}</div>
      {!visible.length && <div className="empty-state"><h3>No assignments in this view</h3><p>Choose another status to see more work.</p></div>}
    </section>
  </div>
}
