import { UserProfile } from "@/types/user";

export const MOCK_STUDENT: UserProfile = {
  id: "user-std-01",
  name: "Phinehas Murage",
  email: "p.murage@students.university.ac.ke",
  role: "STUDENT",
  identifier: "SCT211-0042/2026",
  department: "Computing & Mathematics",
  programme: "BSc. Mathematics & Computer Science",
  academicYear: "Year 1 • Semester 2",
};

export const MOCK_LECTURER: UserProfile = {
  id: "user-lec-01",
  name: "Dr. J. Kimani",
  email: "j.kimani@university.ac.ke",
  role: "LECTURER",
  identifier: "PAM-STF-084",
  department: "Pure & Applied Mathematics",
  title: "Senior Lecturer & Unit Coordinator",
  academicYear: "2026/2027 Academic Year",
};

export const MOCK_USERS: Record<string, UserProfile> = {
  student: MOCK_STUDENT,
  lecturer: MOCK_LECTURER,
};
