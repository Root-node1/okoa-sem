# Authorization Boundaries — Okoa Sem

Status: PROPOSED (authorization model for implementation; enforcement is partially implemented)
Owner: Developer D
Related: [System design](./system_design.md), [Student API contracts](./student-api-contracts.md), [Source and extraction contracts](./source-extraction-contracts.md), [Tickets](./tickets/README.md)

## 1. Application roles

Only three application roles exist:
- `student`
- `class_rep`
- `lecturer`

Internal services and workers are not application roles.

## 2. Workspace access

- A user accesses a workspace only through an active `workspace_memberships` record.
- Workspace membership does not grant access to every course in that workspace.
- Workspace role determines high-level capabilities, not unrestricted data access.
- Role changes are backend-controlled and auditable.
- No self-promotion or role escalation.

## 3. Course access

- Course access is separate from workspace membership.
- Students access courses through course enrolment or approved course membership.
- Lecturers and class reps access only explicitly assigned courses.
- Course access must be enforced in every query and endpoint.
- Cross-course and cross-workspace access returns 403 or 404.

## 4. Capability boundaries

Student:
- Read permitted workspace and enrolled course information.
- Read confirmed academic information.
- Manage own personal tasks.
- Submit sources where authorized.
- Never approve authoritative academic records.

Class representative:
- Student capabilities.
- Coordinate information for explicitly assigned courses.
- Submit and share class information.
- Verify information only when an explicit authorization policy permits it.
- Must not verify by default.

Lecturer:
- Access assigned courses.
- Publish and manage authorized academic information.
- Review and verify extracted claims for assigned courses.
- Create and update authorized academic records.

## 5. Verification authority

- Verification is an explicit backend authorization decision.
- Lecturers may verify claims for courses to which they are assigned.
- Class reps may verify only where a specific policy grants that permission.
- Students may not approve authoritative academic records.
- Verification actions are auditable and tied to course and claim.

## 6. Source and file access

- Source submission requires authentication and course/workspace authorization.
- Uploaded files are untrusted input.
- File type and size validation is enforced server-side.
- Private files use authenticated storage and short-lived signed access.
- Cloudinary credentials remain server-side.
- Source status is visible only to authorized users.

## 7. AI and extraction boundaries

- AI output is untrusted until backend validation.
- Extraction cannot create authoritative academic records.
- AI must not access the database directly.
- AI must not invent missing academic facts.
- Provenance, confidence and ambiguity must be preserved.

## 8. Enforcement

- Authentication middleware resolves user and memberships.
- Authorization checks occur in backend services and repositories.
- Frontend roles are display-only.
- Tenant isolation uses `institution_id` and explicit membership checks.
