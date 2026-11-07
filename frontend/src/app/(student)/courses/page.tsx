import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { PageHeader } from '@/components/student/PageHeader'
import { courses, events } from '@/features/student/demo-data'

export const metadata = { title: 'Courses' }

export default function CoursesPage() {
  return (
    <div>
      <PageHeader eyebrow="SEMESTER II · 2026 / 2027" title="Your courses" description="All your classes, updates, and work in one place." action={{ label: 'Share an update', href: '/inbox#submit' }} />
      <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Course data is sample content for the frontend preview.</span></div>
      <section className="course-grid">
        {courses.map((course) => {
          const next = events.find((event) => event.courseCode === course.code && event.verified)
          return <Link className="course-card" href={`/courses/${course.id}`} key={course.id}>
            <div className="course-card-top"><span className={`course-avatar course-avatar-large ${course.color}`}>{course.initials}</span><span className="course-more"><Icon name="arrow" /></span></div>
            <span className="course-code">{course.code}</span>
            <h2>{course.name}</h2>
            <p className="course-lecturer">{course.lecturer}</p>
            <div className="course-card-bottom"><div><span className="progress-caption">SEMESTER PROGRESS</span><span className="progress-track"><i style={{ width: `${course.progress}%` }} /></span></div><strong>{course.progress}%</strong></div>
            <div className="course-next"><span>UP NEXT</span><strong>{next?.title ?? 'No upcoming events'}</strong></div>
          </Link>
        })}
      </section>
      <div className="info-note"><Icon name="book" /><p>Only courses you're enrolled in appear here. Need to change your enrolment? Contact your institution administrator.</p></div>
    </div>
  )
}
