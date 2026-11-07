# System Design — Okoa Sem

Status: Authoritative (implementation status reflects actual repository)
Related: [Developer tickets](./tickets/README.md)

## 1. Product overview

### 1.1 Problem

Academic information is fragmented across WhatsApp group announcements and exported conversations, PDFs, uploaded documents, lecturer announcements, assignment instructions, CAT/exam announcements, timetable updates and other academic communication.

Okoa Sem converts this fragmented communication into reliable, traceable and actionable academic information.

### 1.2 Target users

- Students: need to know what has been announced, which course it belongs to, what is due, what changed, what is confirmed and where it came from.
- Class representatives: coordinate academic information for assigned courses and help identify missing, duplicated or conflicting information.
- Lecturers: publish and confirm official academic information, manage assignments/CATs/exams/timetables.

### 1.3 Solution

Okoa Sem is an Academic Coordination Intelligence Platform. It ingests academic communication, extracts structured academic claims, requires human verification before publication, and presents confirmed academic information through student-facing APIs and a React frontend.

### 1.4 What Okoa Sem is and is not

Okoa Sem is:
- An academic coordination intelligence platform.
- A traceable academic information system.
- A human-verified academic record workflow.

Okoa Sem is not:
- An LMS.
- A chat application.
- An emergency response application.
- A replacement for official institutional systems.
- An autonomous AI system that publishes academic facts without human verification.

### 1.5 Application roles

Exactly three application roles:

- `student`
- `class_rep`
- `lecturer`

Internal services and background workers are not application roles. Verification is implemented through explicit authorization policies, not an invented role.

Student:
- View permitted workspaces and enrolled courses.
- View confirmed academic information.
- Track assignments and deadlines.
- View academic calendar and dashboard.
- Submit academic information and source documents.
- Review extracted information where authorized.

Class representative:
- Student capabilities.
- Coordinate academic information for explicitly assigned courses.
- Submit and share class announcements.
- Help identify missing, duplicated or conflicting information.
- Verify information only when a specific authorization policy explicitly grants that permission.

Lecturer:
- Access assigned courses.
- Publish announcements.
- Manage authorized academic information.
- Share assignments, CATs, examination and timetable information.
- Confirm official academic information.
- Review proposed extracted information.

No role receives unrestricted access because of its name. Workspace membership and course membership are separate concepts.

### 1.6 Core product principles

1. PostgreSQL is the source of truth.
2. AI extraction creates proposals, never authoritative academic records.
3. Shared academic information must pass a human verification gate.
4. Every extracted claim must retain source provenance.
5. Every confirmed academic record must be traceable to its supporting source.
6. Changes to confirmed records must preserve history.
7. Ambiguous dates must be flagged.
8. Duplicate announcements must be detected.
9. Conflicting announcements must be surfaced for review.
10. AI must not invent missing academic information.
11. Tenant and course access must be enforced by the backend.
12. Uploaded documents and extracted content are untrusted input.

## 2. High-level architecture

```mermaid
flowchart LR
  Browser[React + TypeScript + Vite frontend] -->|REST /api/v1, credentials: include| API[Node.js + Express modular monolith]
  API --> DB[(PostgreSQL)]
  API --> Storage[Cloudinary (foundation)]
  API --> AI[AI provider abstraction (planned)]
  API --> Jobs[Background processing (planned)]
```

Layers:
- React + TypeScript frontend
- REST API (`/api/v1`)
- Node.js + Express modular monolith
- PostgreSQL

Authentication and authorization:
- Argon2id password hashing
- Server-managed opaque sessions in PostgreSQL
- HttpOnly session cookie `okoa_session`
- Existing auth middleware (`authenticate`, `requireAuth`, `requireRole`)
- Frontend requests use `credentials: "include"`

Domain areas:
- Auth
- Users
- Workspaces
- Courses
- Course memberships
- Student API
- Ingestion
- Parsing
- Extraction/AI
- Reviews and verification
- Academic records
- Coordination/dashboard
- Audit
- Notifications (planned)

External integrations:
- Cloudinary file storage foundation (implemented)
- AI provider abstraction (not yet implemented)
- Background job processing (not yet implemented)

Background processing is a required product capability for asynchronous extraction and reminders, but no job runner is currently implemented. Runner choice remains an architectural decision (PROPOSED).

## 3. Domain modules

1. Auth
   - Owns: registration, login, logout, current user, sessions.
   - Consumes: users, workspace memberships.
   - Produces: authenticated user context.
   - Depends on: users, workspaces.

2. Users
   - Owns: user profile and account status.
   - Consumes: auth context.
   - Produces: user records.
   - Depends on: workspaces (institution).

3. Workspaces
   - Owns: institution/workspace records and memberships.
   - Consumes: users.
   - Produces: workspace membership context.
   - Depends on: auth.

4. Courses
   - Owns: course definitions and course membership.
   - Consumes: workspaces.
   - Produces: course access context.
   - Depends on: workspaces, auth.

5. Course memberships
   - Owns: user-to-course access and role assignment.
   - Consumes: users, courses.
   - Produces: course authorization decisions.
   - Depends on: courses, auth.

6. Student API
   - Owns: student-facing endpoints and contracts.
   - Consumes: auth, courses, academic records, sources.
   - Produces: student dashboard, course, event, assignment, calendar and personal task data.
   - Depends on: auth, courses, academic records.

7. Ingestion
   - Owns: source submission, upload handling, source records, processing status.
   - Consumes: auth, workspaces/courses, Cloudinary.
   - Produces: communication sources and source documents.
   - Depends on: auth, courses, storage.

8. Parsing
   - Owns: text extraction from source content.
   - Consumes: ingestion sources.
   - Produces: extracted text.
   - Depends on: ingestion.

9. Extraction/AI
   - Owns: structured claim extraction, confidence, ambiguity, duplicate/conflict detection.
   - Consumes: parsing output, course context.
   - Produces: pending extracted claims.
   - Depends on: ingestion, parsing, courses, AI provider (planned).

10. Reviews and verification
    - Owns: claim review decisions and verification gate.
    - Consumes: extracted claims.
    - Produces: approved/rejected/clarification outcomes.
    - Depends on: extraction, auth, academic records.

11. Academic records
    - Owns: authoritative academic events, assignments, versions.
    - Consumes: verified claims.
    - Produces: confirmed academic information.
    - Depends on: reviews, courses, audit.

12. Coordination
    - Owns: dashboards, calendar, change detection, notifications (planned).
    - Consumes: academic records, personal tasks.
    - Produces: student coordination views.
    - Depends on: academic records.

13. Notifications
    - Owns: notification creation and delivery (planned).
    - Consumes: academic records, reminders.
    - Produces: user notifications.
    - Depends on: coordination, background processing (planned).

14. Audit
    - Owns: audit trail and history.
    - Consumes: all domain actions.
    - Produces: immutable audit records.
    - Depends on: auth.

## 4. Academic information lifecycle

1. A student, class representative or lecturer submits an announcement or document.
2. Backend validates the request and checks authorization.
3. The source is securely stored or retained according to source type.
4. A source record is created.
5. The source enters processing.
6. Text is extracted from submitted content.
7. The extraction layer identifies structured academic claims.
8. Each claim retains source references and extraction metadata.
9. The system checks for duplicates and potential conflicts.
10. Claims remain pending human verification.
11. An authorized lecturer or explicitly authorized class representative reviews the proposal.
12. The reviewer can approve, reject, request clarification or correct extracted fields.
13. Only an approved claim can create or update an authoritative shared academic record.
14. The backend records the verification decision and audit information.
15. Confirmed academic information becomes available to authorized students.
16. Subsequent changes create a new version and retain previous history.

An extraction failure must not create an academic event. A missing deadline must remain missing or be flagged as ambiguous. The AI must never invent a deadline.

## 5. Domain entities and relationships

Implemented in database (from migrations):
- `institutions` (workspace/tenant): IMPLEMENTED
- `users`: IMPLEMENTED (role: student/class_rep/lecturer)
- `courses`: IMPLEMENTED
- `course_enrolments`: IMPLEMENTED
- `workspace_memberships`: IMPLEMENTED
- `sessions`: IMPLEMENTED

Planned entities (NOT YET IMPLEMENTED, require migrations owned by Developer D):
- `communication_sources`: planned
- `source_documents`: planned
- `extracted_claims`: planned
- `academic_events`: planned
- `assignments`: planned
- `submissions`: planned
- `personal_tasks`: planned
- `audit_logs`: planned
- `notifications`: planned
- `reminders`: planned

Relationships:
- Institution has many users, courses, workspace memberships.
- User belongs to institution; has workspace memberships; has course enrolments.
- Course belongs to institution; has enrolments.
- Workspace membership is separate from course membership.
- Source produces extracted claims.
- Extracted claim may create/update academic event only after verification.
- Academic event belongs to course offering/course and institution.
- Academic event versions preserve history.
- Audit log records actions.

Do not present reference SQL as implemented schema. Do not silently introduce fields or relationships without approval.

## 6. API architecture

Base path: `/api/v1`

Authentication:
- Session cookie `okoa_session`.
- Frontend uses `credentials: "include"`.
- Protected endpoints require authenticated session.

Conventions:
- JSON request/response, `Content-Type: application/json`
- Timestamps ISO 8601 UTC
- IDs UUID strings
- Error envelope:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": [{ "field": "email", "message": "Invalid email" }],
    "requestId": "uuid"
  }
}
```

Status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503.

Validation: Zod on backend. Workspace and course authorization enforced server-side.

IMPLEMENTED endpoints:
- `GET /api/v1/health`
- `GET /api/v1/health/database`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`

APPROVED/PROPOSED (not implemented) endpoints include student dashboard, enrolled courses, confirmed academic information, assignments/deadlines, calendar, personal tasks, source submission/status, extraction review, verification. These are tracked in tickets and must not be described as implemented.

## 7. Security and privacy

- Session security: opaque token in HttpOnly cookie; SHA-256 hash stored in DB; expiry/revocation server-side.
- Password hashing: Argon2id.
- Role-based access: three roles only.
- Workspace isolation: all tenant-scoped queries filter by institution.
- Course membership enforcement: course access separate from workspace membership.
- Backend authorization: frontend roles are display-only.
- Private document access: Cloudinary credentials server-side; signed URLs.
- File validation: size/type limits.
- Source retention and deletion: proposed policy; legal review required.
- Audit history: append-only audit records.
- Prompt injection defenses: treat source text as data; fixed system prompts; schema validation.
- AI output validation: Zod before persistence.
- Data minimization: collect only necessary data.

Do not claim Kenya DPA or ODPC compliance without legal review.

## 8. Technology and implementation status

- React + TypeScript + Vite + Tailwind + React Router frontend: IMPLEMENTED (scaffold)
- Node.js + Express + JS ES modules backend: IMPLEMENTED
- PostgreSQL + pg: IMPLEMENTED
- Zod validation: IMPLEMENTED
- Argon2id + opaque sessions: IMPLEMENTED
- Cloudinary foundation: IMPLEMENTED
- GitHub Actions CI: IMPLEMENTED
- Auth API: IMPLEMENTED
- Health endpoints: IMPLEMENTED
- Backend tests: IMPLEMENTED (auth, cloudinary)
- Frontend build: IMPLEMENTED/verified
- Student API endpoints: NOT YET IMPLEMENTED
- Ingestion/extraction pipeline: NOT YET IMPLEMENTED
- Academic records/events: NOT YET IMPLEMENTED
- Verification workflow: NOT YET IMPLEMENTED
- Coordination/dashboard API: NOT YET IMPLEMENTED
- Notifications: NOT YET IMPLEMENTED
- Background processing: NOT YET IMPLEMENTED
- AI provider abstraction: NOT YET IMPLEMENTED
- Deployment to production: NOT YET IMPLEMENTED
