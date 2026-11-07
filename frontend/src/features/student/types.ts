export type EventType = 'CAT' | 'Assignment' | 'Lecture' | 'Exam' | 'Deadline' | 'Announcement'
export type ClaimStatus = 'Pending review' | 'Processing' | 'Verified' | 'Needs attention'

export interface Course {
  id: string
  code: string
  name: string
  lecturer: string
  color: string
  initials: string
  progress: number
  nextEvent: string
}

export interface AcademicEvent {
  id: string
  title: string
  courseCode: string
  date: string
  time: string
  type: EventType
  verified: boolean
  venue?: string
}

export interface Claim {
  id: string
  title: string
  courseCode: string
  source: string
  submittedAt: string
  status: ClaimStatus
  confidence?: number
  evidence: string
}

export interface Assignment {
  id: string
  title: string
  courseCode: string
  dueAt: string
  status: 'Not started' | 'In progress' | 'Submitted'
  progress: number
}
