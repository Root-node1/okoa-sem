export type UserRole = "STUDENT" | "LECTURER" | "CLASS_REP" | "ADMIN" | "LEARNER";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  identifier: string; // Reg number for students, Staff ID for lecturers
  avatarUrl?: string;
  department: string;
  programme?: string;
  academicYear?: string;
  title?: string;
}
