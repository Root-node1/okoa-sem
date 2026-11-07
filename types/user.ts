export type UserRole = "LEARNER" | "LECTURER";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  identifier: string; // Reg number for learners, Staff/Payroll ID for lecturers
  avatarUrl?: string;
  department: string;
}
