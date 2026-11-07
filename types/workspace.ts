import { UserRole } from "./user";

export type ItemStatus = "OPEN" | "IN_REVIEW" | "RESOLVED" | "RETURNED";
export type ItemPriority = "NORMAL" | "HIGH" | "URGENT";

export type EventType =
  | "CAT"
  | "Assignment"
  | "Lecture"
  | "Exam"
  | "Deadline"
  | "Announcement";

export type ClaimStatus =
  | "Pending review"
  | "Processing"
  | "Verified"
  | "Needs attention";

export type AssignmentStatus =
  | "Not started"
  | "In progress"
  | "Submitted"
  | "Under review"
  | "Feedback available";

export interface StudentReference {
  id: string;
  name: string;
  regNumber: string;
  avatarUrl?: string;
}

export interface UnitModule {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  venue: string;
  schedule: string;
  progress: number;
  nextEvent: string;
  unreadCount: number;
  totalSubmissions: number;
}

export interface RubricScore {
  criterion: string;
  score: number;
  maxScore: number;
}

export interface QueueItem {
  id: string;
  unitId: string;
  unitCode: string;
  title: string;
  snippet: string;
  status: ItemStatus;
  priority: ItemPriority;
  unread: boolean;
  createdAt: string;
  student: StudentReference;
  rubricSummary?: RubricScore[];
}

export interface DiscussionMessage {
  id: string;
  authorId: string;
  authorName: string;
  role: UserRole;
  content: string;
  createdAt: string;
  isCodeSnippet?: boolean;
}

export interface AcademicEvent {
  id: string;
  unitId: string;
  courseCode: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
  verified: boolean;
  venue?: string;
  source?: string;
}

export interface Claim {
  id: string;
  unitId: string;
  courseCode: string;
  title: string;
  source: string;
  submittedAt: string;
  status: ClaimStatus;
  confidence?: number;
  evidence: string;
}

export interface AssignmentTask {
  id: string;
  unitId: string;
  courseCode: string;
  title: string;
  description: string;
  dueAt: string;
  status: AssignmentStatus;
  progress: number;
  weight: string;
}

export interface CourseMaterial {
  id: string;
  unitId: string;
  courseCode: string;
  title: string;
  type: "Lecture Notes" | "Problem Set" | "Lab Specification" | "Syllabus";
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
}

export interface AcademicNotification {
  id: string;
  courseCode: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  verified: boolean;
  source: string;
}
