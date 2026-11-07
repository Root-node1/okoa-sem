'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/student/StatusBadge'
import { events, formatDate } from './demo-data'
import type { AcademicEvent } from './types'

type ViewMode = 'Month' | 'Week' | 'Agenda'

export function CalendarWorkspace() {
  const [view, setView] = useState<ViewMode>('Week')
  const [month, setMonth] = useState(new Date(2026, 10, 1))
  const [selectedDate, setSelectedDate] = useState('2026-11-09')
  const currentEvents = useMemo(() => events.filter((event) => event.verified), [])
  const monthLabel = month.toLocaleDateString('en-KE', { month: 'long', year: 'numeric' })

  const eventsForDay = (date: string) => currentEvents.filter((event) => event.date === date)
  const dateList = view === 'Week' ? getWeekDates(selectedDate) : []

  function moveMonth(amount: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1))
  }

  return <div className="calendar-workspace content-panel">
    <div className="calendar-toolbar">
      <div className="calendar-month-control"><button aria-label="Previous month" className="icon-button calendar-arrow" onClick={() => moveMonth(-1)}><Icon name="chevron" /></button><h2>{monthLabel}</h2><button aria-label="Next month" className="icon-button calendar-arrow" onClick={() => moveMonth(1)}><Icon name="chevron" /></button><button className="button button-quiet today-button" onClick={() => { setMonth(new Date(2026, 10, 1)); setSelectedDate('2026-11-09') }}>Today</button></div>
      <div aria-label="Calendar view" className="view-switch" role="tablist">{(['Month', 'Week', 'Agenda'] as ViewMode[]).map((item) => <button aria-selected={view === item} className={view === item ? 'view-option selected' : 'view-option'} key={item} onClick={() => setView(item)} role="tab">{item}</button>)}</div>
    </div>
    {view === 'Month' && <MonthView month={month} selectedDate={selectedDate} setSelectedDate={setSelectedDate} eventsForDay={eventsForDay} />}
    {view === 'Week' && <WeekView dates={dateList} eventsForDay={eventsForDay} setSelectedDate={setSelectedDate} />}
    {view === 'Agenda' && <AgendaView items={currentEvents} />}
    <div className="calendar-legend"><span><i className="legend-dot green-dot" />Verified academic event</span><span><i className="legend-dot lavender-dot" />Assignment / deadline</span><span className="legend-hint">Pending information stays in your inbox.</span></div>
  </div>
}

function MonthView({ month, selectedDate, setSelectedDate, eventsForDay }: {
  month: Date
  selectedDate: string
  setSelectedDate: (date: string) => void
  eventsForDay: (date: string) => AcademicEvent[]
}) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)]
  while (cells.length % 7) cells.push(null)
  return <div className="month-grid">
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <div className="month-weekday" key={day}>{day}</div>)}
    {cells.map((day, index) => {
      if (!day) return <div aria-hidden="true" className="month-cell outside-month" key={`empty-${index}`} />
      const date = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = eventsForDay(date)
      return <button aria-label={`${date}${dayEvents.length ? `, ${dayEvents.length} events` : ''}`} aria-pressed={selectedDate === date} className={`month-cell${selectedDate === date ? ' selected-day' : ''}`} key={date} onClick={() => setSelectedDate(date)}>
        <span className="month-day-number">{day}</span>{dayEvents.slice(0, 2).map((event) => <span className={`month-event type-${event.type.toLowerCase()}`} key={event.id}>{event.title}</span>)}{dayEvents.length > 2 && <span className="month-overflow">+{dayEvents.length - 2} more</span>}
      </button>
    })}
  </div>
}

function WeekView({ dates, eventsForDay, setSelectedDate }: {
  dates: string[]
  eventsForDay: (date: string) => AcademicEvent[]
  setSelectedDate: (date: string) => void
}) {
  return <div className="week-view">
    {dates.map((date) => {
      const todayEvents = eventsForDay(date)
      const parsed = new Date(`${date}T12:00:00`)
      return <button className={`week-day${todayEvents.length ? ' has-events' : ''}`} key={date} onClick={() => setSelectedDate(date)}>
        <span>{parsed.toLocaleDateString('en-KE', { weekday: 'short' }).toUpperCase()}</span><strong>{parsed.getDate()}</strong>
        <div className="week-day-events">{todayEvents.map((event) => <span className={`week-event type-${event.type.toLowerCase()}`} key={event.id}><b>{event.time}</b>{event.title}<small>{event.courseCode}</small></span>)}</div>
      </button>
    })}
  </div>
}

function AgendaView({ items }: { items: AcademicEvent[] }) {
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date))
  return <div className="agenda-list">{sorted.map((event) => <article className="agenda-event" key={event.id}>
    <div className="agenda-date"><strong>{new Date(`${event.date}T12:00:00`).getDate()}</strong><span>{new Date(`${event.date}T12:00:00`).toLocaleDateString('en-KE', { weekday: 'short', month: 'short' }).toUpperCase()}</span></div>
    <div className={`agenda-event-mark type-${event.type.toLowerCase()}`} /><div className="agenda-event-info"><div><h3>{event.title}</h3><StatusBadge tone="green">Verified</StatusBadge></div><p>{event.courseCode}<span>·</span>{formatDate(event.date)}<span>·</span>{event.time}{event.venue && <><span>·</span>{event.venue}</>}</p></div>
  </article>)}</div>
}

function addDays(date: string, offset: number) {
  const result = new Date(`${date}T12:00:00`)
  result.setDate(result.getDate() + offset)
  return `${result.getFullYear()}-${String(result.getMonth() + 1).padStart(2, '0')}-${String(result.getDate()).padStart(2, '0')}`
}

function getWeekDates(date: string) {
  const weekday = new Date(`${date}T12:00:00`).getDay()
  const mondayOffset = (weekday + 6) % 7
  return Array.from({ length: 7 }, (_, index) => addDays(date, index - mondayOffset))
}
