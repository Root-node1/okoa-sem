export type UserRole = 'student' | 'class_rep' | 'lecturer'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
}

export interface Course {
  id: string
  code: string
  name: string
}

export interface Announcement {
  id: string
  title: string
  body: string
  createdAt: string
}

export interface AcademicEvent {
  id: string
  title: string
  type: string
  startsAt: string
  endsAt?: string
  venue?: string
  verified: boolean
}

export interface Assignment {
  id: string
  title: string
  dueAt: string
  courseCode?: string
}

export interface ApiResponse<T> {
  data: T
}

export interface ApiError {
  error: {
    code: string
    message: string
    details?: { field: string; message: string }[]
    requestId?: string
  }
}
