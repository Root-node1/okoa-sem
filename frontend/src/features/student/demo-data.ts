import type { AcademicEvent, Assignment, Claim, Course } from './types'

export const demoMode = true

export const courses: Course[] = [
  { id: 'cs-2207', code: 'ICS 2207', name: 'Data Structures & Algorithms', lecturer: 'Dr. Njeri Kamau', color: 'mint', initials: 'DS', progress: 68, nextEvent: 'CAT 2 · Mon, Nov 9' },
  { id: 'cs-2211', code: 'ICS 2211', name: 'Database Systems', lecturer: 'Mr. Peter Otieno', color: 'lavender', initials: 'DB', progress: 54, nextEvent: 'Project checkpoint · Wed, Nov 11' },
  { id: 'cs-2203', code: 'ICS 2203', name: 'Human Computer Interaction', lecturer: 'Ms. Wanjiku Maina', color: 'peach', initials: 'UX', progress: 82, nextEvent: 'Design critique · Thu, Nov 12' },
  { id: 'ma-2201', code: 'MAT 2201', name: 'Discrete Mathematics', lecturer: 'Dr. James Kariuki', color: 'blue', initials: 'DM', progress: 43, nextEvent: 'Problem set 4 · Fri, Nov 13' },
]

export const events: AcademicEvent[] = [
  { id: 'e-1', title: 'CAT 2: Algorithms', courseCode: 'ICS 2207', date: '2026-11-09', time: '10:00 AM', type: 'CAT', verified: true, venue: 'LT 2' },
  { id: 'e-2', title: 'Project checkpoint', courseCode: 'ICS 2211', date: '2026-11-11', time: '11:59 PM', type: 'Deadline', verified: true },
  { id: 'e-3', title: 'Design critique', courseCode: 'ICS 2203', date: '2026-11-12', time: '2:00 PM', type: 'Assignment', verified: true, venue: 'Studio 4' },
  { id: 'e-4', title: 'Problem set 4', courseCode: 'MAT 2201', date: '2026-11-13', time: '5:00 PM', type: 'Deadline', verified: true },
  { id: 'e-5', title: 'Data structures lecture', courseCode: 'ICS 2207', date: '2026-11-10', time: '9:00 AM', type: 'Lecture', verified: true, venue: 'Block C 14' },
  { id: 'e-6', title: 'Database normalization', courseCode: 'ICS 2211', date: '2026-11-13', time: '1:00 PM', type: 'CAT', verified: true, venue: 'LT 1' },
  { id: 'e-7', title: 'End of semester exam', courseCode: 'ICS 2203', date: '2026-11-20', time: '8:30 AM', type: 'Exam', verified: true, venue: 'Main Hall' },
  { id: 'e-8', title: 'Guest lecture: accessible design', courseCode: 'ICS 2203', date: '2026-11-10', time: '3:00 PM', type: 'Announcement', verified: true, venue: 'Online' },
]

export const claims: Claim[] = [
  { id: 'c-1', title: 'CAT 2 moved to Monday, 10am', courseCode: 'ICS 2207', source: 'Class group message', submittedAt: 'Today, 9:42 AM', status: 'Verified', confidence: 96, evidence: '“Quick update: CAT 2 will be on Monday at 10am in LT 2.”' },
  { id: 'c-2', title: 'Project checkpoint date', courseCode: 'ICS 2211', source: 'WhatsApp export', submittedAt: 'Today, 8:16 AM', status: 'Pending review', confidence: 84, evidence: '“Checkpoint is due next Wednesday before midnight.”' },
  { id: 'c-3', title: 'Design critique venue', courseCode: 'ICS 2203', source: 'Pasted message', submittedAt: 'Yesterday, 4:30 PM', status: 'Needs attention', confidence: 61, evidence: '“Critique next week, same place as last time.”' },
  { id: 'c-4', title: 'Problem set 4 reminder', courseCode: 'MAT 2201', source: 'Course announcement', submittedAt: 'Yesterday, 11:05 AM', status: 'Processing', evidence: '“Remember to submit problem set four by Friday.”' },
]

export const assignments: Assignment[] = [
  { id: 'a-1', title: 'Design critique', courseCode: 'ICS 2203', dueAt: '2026-11-12T14:00:00', status: 'In progress', progress: 62 },
  { id: 'a-2', title: 'Problem set 4', courseCode: 'MAT 2201', dueAt: '2026-11-13T17:00:00', status: 'Not started', progress: 0 },
  { id: 'a-3', title: 'Database project checkpoint', courseCode: 'ICS 2211', dueAt: '2026-11-11T23:59:00', status: 'Submitted', progress: 100 },
  { id: 'a-4', title: 'Algorithm analysis worksheet', courseCode: 'ICS 2207', dueAt: '2026-11-17T23:59:00', status: 'Not started', progress: 0 },
]

export const recentChanges = [
  { title: 'CAT 2 time confirmed', course: 'ICS 2207', detail: 'Monday at 10:00 AM · LT 2', time: '2 hours ago', color: 'mint' },
  { title: 'New project checkpoint', course: 'ICS 2211', detail: 'Due Wednesday, Nov 11', time: 'Yesterday', color: 'lavender' },
  { title: 'Room updated for critique', course: 'ICS 2203', detail: 'Studio 4 · Thursday at 2:00 PM', time: 'Nov 5', color: 'peach' },
]

export const notifications = [
  { id: 'n-1', title: 'CAT 2 time confirmed', body: 'ICS 2207 · Monday, Nov 9 at 10:00 AM', time: '2 hours ago', unread: true },
  { id: 'n-2', title: 'New course update', body: 'ICS 2211 · Project checkpoint details', time: 'Yesterday', unread: true },
  { id: 'n-3', title: 'Your submitted information is being reviewed', body: 'ICS 2203 · Design critique venue', time: 'Yesterday', unread: true },
  { id: 'n-4', title: 'Reminder', body: 'Database project checkpoint is due soon', time: 'Nov 5', unread: false },
]

export function getCourse(id: string) {
  return courses.find((course) => course.id === id)
}

export function getCourseEvents(courseCode: string) {
  return events.filter((event) => event.courseCode === courseCode && event.verified)
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-KE', options ?? { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(date))
}
