import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { PageHeader } from '@/components/student/PageHeader'
import { StatusBadge } from '@/components/student/StatusBadge'
import { getCourse, getCourseEvents, formatDate } from '@/features/student/demo-data'

export async function generateMetadata({ params }: { params: Promise<{ courseOfferingId: string }> }) {
  const { courseOfferingId } = await params
  return { title: getCourse(courseOfferingId)?.code ?? 'Course' }
}

export default async function CourseWorkspacePage({ params }: { params: Promise<{ courseOfferingId: string }> }) {
  const { courseOfferingId } = await params
  const course = getCourse(courseOfferingId)
  if (!course) notFound()
  const courseEvents = getCourseEvents(course.code)

  return <div>
    <Link className="back-link" href="/courses"><Icon name="chevron" />All courses</Link>
    <PageHeader eyebrow={`COURSE WORKSPACE · ${course.code}`} title={course.name} description={`${course.lecturer} · Semester II, 2026 / 2027`} action={{ label: 'Share course update', href: '/inbox#submit' }} />
    <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Course details are sample content and are not connected to an enrolment account.</span></div>
    <div className="course-summary-row">
      <div className="summary-tile"><span>UPCOMING</span><strong>{courseEvents.length}</strong><small>confirmed events</small></div>
      <div className="summary-tile"><span>SEMESTER PROGRESS</span><strong>{course.progress}%</strong><small>of the course complete</small></div>
      <div className="summary-tile"><span>NEXT UP</span><strong className="summary-next">{course.nextEvent.split(' · ')[0]}</strong><small>{course.nextEvent.split(' · ')[1]}</small></div>
    </div>
    <div className="content-panel detail-events">
      <div className="section-heading"><div><span className="eyebrow">CONFIRMED COURSE INFO</span><h2>Events & deadlines</h2></div><StatusBadge tone="green">Verified only</StatusBadge></div>
      {courseEvents.length ? <div className="event-list">{courseEvents.map((event) => <article className="event-row" key={event.id}>
        <div className="event-date"><strong>{new Date(`${event.date}T12:00:00`).getDate()}</strong><span>{new Date(`${event.date}T12:00:00`).toLocaleDateString('en-KE', { month: 'short' }).toUpperCase()}</span></div>
        <div className="event-main"><div className="event-title-line"><h3>{event.title}</h3><StatusBadge tone="green">Verified</StatusBadge></div><p>{formatDate(event.date)}<span>·</span>{event.time}{event.venue && <><span>·</span>{event.venue}</>}</p></div>
      </article>)}</div> : <div className="empty-state"><span className="empty-state-icon"><Icon name="calendar" /></span><h3>No confirmed events yet</h3><p>When course information is verified, it will show up here.</p></div>}
    </div>
    <div className="info-note"><Icon name="inbox" /><p>Have an update for this course? <Link href="/inbox#submit">Share it with your course</Link>. Unverified claims stay in your inbox until authorised staff review them.</p></div>
  </div>
}
