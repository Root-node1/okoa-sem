import { UserRole } from "./user";

export type ItemStatus = "OPEN" | "IN_REVIEW" | "RESOLVED" | "RETURNED";
export type ItemPriority = "NORMAL" | "HIGH" | "URGENT";

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
