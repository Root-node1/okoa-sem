import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { PageHeader } from '@/components/student/PageHeader'
import { StatusBadge } from '@/components/student/StatusBadge'
import { assignments, courses, events, formatDate, recentChanges } from '@/features/student/demo-data'

export const metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  const nextEvents = [...events].filter((event) => event.verified).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)

  return (
    <div className="dashboard-page">
      <PageHeader eyebrow="SATURDAY, NOVEMBER 7" title="Good morning, Amara" description="A little clarity for everything on your plate this week." />
      <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Using sample academic data. Updates are not saved to an account.</span></div>

      <section aria-label="Your academic overview" className="dashboard-grid">
        <div className="focus-card">
          <div className="focus-top"><span className="focus-kicker">YOUR WEEK, AT A GLANCE</span><span className="focus-date">WEEK 08 <i /> SEM II</span></div>
          <h2>Make room for<br /><em>what matters.</em></h2>
          <p>There are <strong>4 things</strong> worth keeping an eye on this week.</p>
          <div className="focus-bottom">
            <div className="focus-avatars"><span>DS</span><span>DB</span><span>UX</span><span>+1</span></div>
            <Link href="/calendar">See your week <Icon name="arrow" /></Link>
          </div>
          <div aria-hidden="true" className="focus-decoration"><span /><span /><span /></div>
        </div>

        <div className="metric-card">
          <div className="metric-heading"><span>UP NEXT</span><span className="metric-icon amber"><Icon name="clock" /></span></div>
          <strong className="metric-number">04</strong>
          <p>deadlines this week</p>
          <div className="metric-footer"><span className="metric-line"><i /></span><span>1 due tomorrow</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-heading"><span>YOUR COURSES</span><span className="metric-icon green"><Icon name="book" /></span></div>
          <strong className="metric-number">04</strong>
          <p>active this semester</p>
          <div className="metric-footer"><Link href="/courses">View all courses <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <section className="dashboard-columns">
        <div className="content-panel week-panel">
          <div className="section-heading">
            <div><span className="eyebrow">KEEP YOUR RHYTHM</span><h2>Coming up</h2></div>
            <Link className="text-link" href="/calendar">Full calendar <Icon name="arrow" /></Link>
          </div>
          <div className="event-list">
            {nextEvents.map((event, index) => (
              <article className="event-row" key={event.id}>
                <div className="event-date"><strong>{new Date(`${event.date}T12:00:00`).getDate()}</strong><span>{new Date(`${event.date}T12:00:00`).toLocaleDateString('en-KE', { month: 'short' }).toUpperCase()}</span></div>
                <div className={`event-marker event-marker-${index}`} />
                <div className="event-main"><div className="event-title-line"><h3>{event.title}</h3><StatusBadge tone="green">Verified</StatusBadge></div><p>{event.courseCode}<span>·</span>{event.time}{event.venue && <><span>·</span>{event.venue}</>}</p></div>
                <Icon className="event-chevron" name="chevron" />
              </article>
            ))}
          </div>
          <div className="panel-footnote"><Icon name="check" /><span>Showing confirmed information from your courses</span></div>
        </div>

        <div className="content-panel changes-panel">
          <div className="section-heading">
            <div><span className="eyebrow">THE LATEST</span><h2>Recent changes</h2></div>
            <Link aria-label="View inbox" className="icon-button subtle-button" href="/inbox"><Icon name="arrow" /></Link>
          </div>
          <div className="change-list">
            {recentChanges.map((change) => (
              <article className="change-row" key={change.title}>
                <span className={`change-mark change-${change.color}`}><Icon name="check" /></span>
                <div><div className="change-title-line"><h3>{change.title}</h3><time>{change.time}</time></div><p>{change.course}<span>·</span>{change.detail}</p></div>
              </article>
            ))}
          </div>
          <Link className="panel-bottom-link" href="/inbox">Go to your inbox <Icon name="arrow" /></Link>
        </div>
      </section>

      <section className="lower-grid">
        <div className="content-panel course-panel">
          <div className="section-heading">
            <div><span className="eyebrow">YOUR SEMESTER</span><h2>In your courses</h2></div>
            <Link className="text-link" href="/courses">All courses <Icon name="arrow" /></Link>
          </div>
          <div className="course-mini-grid">
            {courses.slice(0, 3).map((course) => (
              <Link className="course-mini" href={`/courses/${course.id}`} key={course.id}>
                <span className={`course-avatar ${course.color}`}>{course.initials}</span>
                <strong>{course.code}</strong><span>{course.name}</span>
                <span className="progress-track"><i style={{ width: `${course.progress}%` }} /></span>
              </Link>
            ))}
          </div>
        </div>
        <div className="quick-action-card">
          <div className="quick-icon"><Icon name="upload" /></div>
          <div><span className="eyebrow">GOT AN UPDATE?</span><h2>Drop it in your inbox.</h2><p>Paste a course message and keep your academic info together.</p></div>
          <Link className="button button-dark" href="/inbox#submit">Share an update <Icon name="arrow" /></Link>
        </div>
      </section>
      <p className="demo-data-caption">{assignments.length} assignments are being tracked in this sample workspace.</p>
    </div>
  )
}
