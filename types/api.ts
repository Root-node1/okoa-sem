export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: { field: string; message: string }[];
    requestId?: string;
  };
}

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiList<T> {
  data: T[];
  meta?: PageMeta;
}

export interface ApiEnvelope<T> {
  data: T;
}

export interface BackendMembership {
  id: string;
  workspaceId: string;
  workspaceName?: string;
  workspaceCode?: string;
  role: "student" | "class_rep" | "lecturer";
  status: string;
}

export interface BackendUser {
  id: string;
  email: string;
  fullName: string;
  accountStatus: string;
  emailVerified: boolean;
  memberships?: BackendMembership[];
}

export interface BackendClaim {
  id: string;
  source_id: string;
  claim_type: string;
  title: string;
  description?: string | null;
  course_id?: string | null;
  course_code?: string | null;
  course_name?: string | null;
  course_hint?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  venue?: string | null;
  confidence?: number | string | null;
  ambiguity_flags?: string[];
  evidence_snippet: string;
  status: "pending" | "approved" | "rejected" | "merged" | "failed";
  extracted_at: string;
  submitted_by_name?: string | null;
  submitted_by_role?: string | null;
}

export interface BackendAcademicEvent {
  id: string;
  workspace_id: string;
  course_id?: string | null;
  course_code?: string | null;
  course_name?: string | null;
  event_type: string;
  title: string;
  description?: string | null;
  start_at: string;
  end_at?: string | null;
  venue?: string | null;
  status: "draft" | "verified" | "superseded" | "cancelled";
  source_claim_id?: string | null;
  verified_by_name?: string | null;
}

