# Backend Architecture — Okoa Sem

Status: IMPLEMENTED foundation with APPROVED/PROPOSED future work
Related: [Developer tickets](./tickets/README.md)

## 1. Product definition

Okoa Sem is an Academic Coordination Intelligence Platform. It turns fragmented academic communication into reliable, traceable academic information and coordination.

It is not an LMS, a chat application, an emergency response application, or an autonomous AI agent that changes official academic records.

Core principles:

1. AI extracts and proposes information.
2. The backend validates proposed information.
3. Human verification is required before shared academic facts become authoritative.
4. PostgreSQL remains the source of truth.
5. Source provenance, confidence, verification status and change history must be preserved.
6. Conflicts and ambiguous dates must be flagged, not silently resolved.
7. Tenant and course access must be enforced by the backend.
8. Uploaded content must be treated as untrusted input.
9. AI must never independently modify official academic records.

## 2. Technology stack (verified)

Frontend:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

Backend:
- Node.js
- Express 4
- JavaScript ES modules (`"type": "module"`)
- PostgreSQL (`pg`)
- Zod request validation
- Argon2 password hashing (`argon2`)
- Cloudinary SDK

Other infrastructure:
- REST API under `/api/v1`
- PostgreSQL migrations (`backend/scripts/migrate.js`)
- Server-managed opaque authentication sessions
- GitHub Actions CI

Not used and not to be introduced without an approved decision: Python/FastAPI, Next.js, a second backend framework, microservices, an ORM, a different frontend framework.

## 3. Application roles

Exactly three application roles:

- `student`
- `class_rep`
- `lecturer`

Internal services and background workers are not application roles. No admin/super-admin/institution-admin/system-user/generic-verifier roles.

Permission boundaries:

Student:
- Access permitted workspaces and enrolled courses.
- View academic information.
- Track assignments, deadlines and academic activities.
- Submit information and source documents.
- Review extracted information where authorized.

Class representative:
- Student capabilities.
- Coordinate information for explicitly assigned courses.
- Help identify conflicting announcements.
- Submit and share class information.
- Perform verification only where a specific authorization policy permits it.

Lecturer:
- Access assigned courses.
- Publish academic announcements.
- Create and update authorized academic information.
- Share assignments, CATs and learning materials.
- Confirm official academic information.

No role receives unrestricted access because of its name. Workspace membership and course membership are separate concepts. A user belonging to a workspace does not automatically gain access to every course in that workspace.

## 4. High-level architecture

Modular monolith backend with a separately deployable React frontend and a PostgreSQL database.

```mermaid
flowchart LR
  Browser[React + TypeScript (Vite)] -->|REST /api/v1, credentials: include| API[Node.js + Express API]
  API --> DB[(PostgreSQL)]
  API --> Storage[Cloudinary (foundation)]
  API --> AI[AI provider abstraction (PROPOSED)]
  API --> Queue[Background jobs (PROPOSED)]
```

Backend layers:
- Routes
- Controllers
- Services/domain logic
- Repositories/database access
- Validation (Zod)
- Authentication and authorization middleware
- Background processing (when introduced)
- External service integrations

## 5. Frontend responsibilities (React + TypeScript)

IMPLEMENTED:
- Pages and components under `frontend/src/pages`, `frontend/src/layouts`
- Routing in `frontend/src/App.tsx`
- API client in `frontend/src/services/api.ts`
- Auth context in `frontend/src/context/AuthContext.tsx`
- Types in `frontend/src/types/index.ts`

NOT YET IMPLEMENTED:
- Authentication/session restoration using `/api/v1/auth/me`
- Workspace and course interfaces
- Academic coordination interfaces
- Extraction review interfaces
- Calendar and dashboard interfaces connected to backend data

Frontend rules:
- Frontend never implements domain rules.
- Frontend uses roles for display only; backend enforces authorization.
- Frontend requests must use `credentials: "include"`.

## 6. Backend module structure (verified)

```
backend/src/
  app.js
  server.js
  config/        env.js, database.js, cloudinary.js
  middleware/    auth.js, errorHandler.js, requestId.js, validate.js
  modules/       auth/ (implemented); others are placeholders
  routes/        health.js
  services/      cloudinaryService.js
```

Module placeholders (NOT YET IMPLEMENTED): academic-events, announcements, assignments, assistant, audit, claims, courses, enrolments, extraction, ingestion, notifications, reminders, submissions, users.

Each implemented module should follow: controller, service, repository, schema, routes. Public module index only; no deep imports.

## 7. Implemented backend capabilities (verified)

- Express app with Helmet, CORS (credentials enabled), cookie parser, JSON body, Morgan, request ID, error handler.
- Health endpoints: `GET /api/v1/health`, `GET /api/v1/health/database`.
- Authentication module:
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/me`
  - `POST /api/v1/auth/logout`
- Server-managed opaque sessions in PostgreSQL (`sessions`), SHA-256 token hash stored, raw token in HttpOnly cookie `okoa_session`.
- Argon2id password hashing.
- Rate limiting on login.
- Zod validation on auth requests.
- Cloudinary service foundation (`validateUploadInput`, `uploadAcademicFile`, `createSignedDeliveryUrl`).
- Migrations `001_initial_foundation.sql`, `002_auth_foundation.sql`.
- Tests: `backend/tests/auth.test.js`, `backend/tests/cloudinary.test.js`.
- CI: frontend build + backend migrate + backend tests.

## 8. Database design (verified + proposed)

Implemented tables (from migrations):

- `institutions` (workspace/tenant): id, name, code (unique), country, timezone, created_at.
- `users`: id, institution_id (FK), email (unique), full_name, role (student/class_rep/lecturer), password_hash, account_status, email_verified, password_changed_at, created_at, updated_at.
- `courses`: id, institution_id (FK), code, name, created_at; unique (institution_id, code).
- `course_enrolments`: id, user_id (FK), course_id (FK), created_at; unique (user_id, course_id).
- `workspace_memberships`: id, user_id (FK), workspace_id (FK institutions), role, status, created_at, updated_at; unique (user_id, workspace_id).
- `sessions`: id, user_id (FK), token_hash (unique), expires_at, revoked_at, created_at, last_used_at, ip_address, user_agent.

Indexes implemented on foreign keys and session expiry.

Proposed tables (NOT YET IMPLEMENTED, require migrations and backend owner approval):
- `communication_sources`
- `source_documents`
- `extracted_claims`
- `academic_events`
- `assignments`
- `submissions`
- `course_materials`
- `reminders`
- `notifications`
- `audit_logs`
- `agent_runs`

Proposed data rules:
- Primary keys UUID.
- Timestamps `created_at`, `updated_at` (timestamptz).
- Tenant scope `institution_id` on tenant-scoped tables.
- Enums as text with check constraints (current pattern) or native enums (decide in migration).
- `AcademicEvent.version` increments on update; prior versions retained via audit log.
- `ExtractedClaim` is never overwritten; new claims reference prior via metadata.

Course access note: `course_enrolments` links users to courses. Workspace membership (`workspace_memberships`) does not grant course access. A migration adding course-level role or course offerings is PROPOSED and must be owned by the backend engineer.

## 9. Security boundaries (verified + approved)

IMPLEMENTED:
- Argon2id password hashing.
- Server-managed opaque sessions; raw token only in HttpOnly cookie; SHA-256 hash in DB.
- Session expiry and revocation enforced server-side.
- Secure cookie in production, SameSite=Lax, path `/`, 7-day max age.
- Helmet, CORS restricted to frontend origin with credentials.
- Rate limiting on login (10 attempts / 15 minutes, skipped in test).
- Zod validation on auth requests.
- Global error handler with structured error envelope.
- Request ID middleware.

APPROVED/PROPOSED:
- Tenant isolation by `institution_id` and enrolment (must be enforced in every new query).
- Role checks via `requireRole` over active workspace memberships.
- File upload size/type limits and signed URLs (Cloudinary foundation implemented).
- CSRF protection for cookie auth (PROPOSED).
- MFA (PROPOSED, future).
- Audit log immutability (PROPOSED).

Rules:
- Uploaded content is untrusted input.
- AI never accesses the database directly.
- AI output must be validated with Zod before persistence.
- No secrets in client bundle.
- Cloudinary credentials server-side only.

## 9a. Privacy and risk boundaries (proposed)

- Jurisdiction: Kenya (initial); legal review required for Kenya Data Protection Act compliance.
- Explicit consent for account creation and data processing; separate consent for AI processing of uploaded content.
- Data used only for academic coordination; no advertising or unrelated profiling.
- Imported WhatsApp exports may contain third-party personal data; warn users and allow deletion of imported sources.
- Cross-border AI processing requires contractual safeguards and transparency.
- Retention (proposed): source documents 12 months after term end; audit logs 7 years; notifications 90 days.
- Product/technical risks: extraction accuracy, AI cost overruns, deployment platform constraints, low adoption if friction high, lecturers may not verify promptly.

## 10. API conventions (verified)

- Base path: `/api/v1`
- JSON request/response, `Content-Type: application/json`
- Timestamps: ISO 8601 UTC
- IDs: UUID strings
- Authentication: HttpOnly cookie `okoa_session`; frontend must send `credentials: "include"`
- CORS origin: frontend origin only; credentials enabled
- Error response:

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

- Status codes used: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503.
- Validation: Zod on backend.
- Pagination (PROPOSED): `?page=1&pageSize=20` (max 100), response `meta: { page, pageSize, total }`.
- Sorting/filtering (PROPOSED): documented per endpoint.

Implemented endpoints:
- `GET /api/v1/health`
- `GET /api/v1/health/database`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`

All other endpoints are PROPOSED and must not be described as implemented. Planned modules and endpoints are tracked in `docs/tickets/`.

## 11. AI and assistant boundaries (approved/proposed)

AI extracts and proposes; backend validates; PostgreSQL is authoritative. AI must never independently modify official academic records.

AI provider abstraction (PROPOSED): interface with `extract`, `classify`, `answer`, `embed`; implementations OpenAI/Gemini/mock; selection via env.

Extraction (PROPOSED):
- Input: source text + metadata + known courses/context.
- Output: array of structured claims matching a Zod schema.
- Claim types: cat, exam, assignment, lecture, meeting, deadline, venue_change, announcement, material, instruction.
- Each claim: type, title, description, courseHint, proposedDates, venue, confidence (0-1), evidenceSnippet.
- Validate with Zod; retry once on failure; then mark claim `failed`.
- Never persist unvalidated payloads as events.

Confidence thresholds (PROPOSED): >=0.8 high, 0.5-0.8 medium, <0.5 low. Low-confidence claims require manual review; high-confidence claims still pending verification for deadlines/exams.

Duplicate/conflict detection (PROPOSED): heuristic + embedding similarity; differing dates/times/venues for same course+event type flagged as conflict; never auto-merge deadlines.

Assistant (PROPOSED): one primary academic coordinator agent; cannot modify records, verify/reject claims without human approval, access data outside permissions, or execute arbitrary code/DB queries. Tools call backend services, not the DB directly. All tool calls logged in `AgentRun`.

Ingestion policy (APPROVED): MVP uses manual paste/forwarded text and WhatsApp chat export file upload. No live WhatsApp integration or unrestricted access to personal chats.

## 12. External services

- Cloudinary: file storage foundation IMPLEMENTED (server-side config, validation, upload helper, signed delivery URL). Academic document ingestion workflow NOT YET IMPLEMENTED.
- AI provider abstraction: NOT YET IMPLEMENTED.
- Background job processing: NOT YET IMPLEMENTED.

## 13. Unresolved decisions (proposed)

- Background runner choice (Inngest vs BullMQ+Redis).
- OCR provider (start with PDF text extraction).
- Course-level access model and migration (course offerings vs simple enrolments).
- Deployment target verification (RumptyCloud vs Vercel + managed Postgres).
- Legal/privacy review for Kenya Data Protection Act compliance.
- Whether to add CSRF protection mechanism details.

## 14. Status legend usage

Every document and ticket in this repository must label work as IMPLEMENTED, APPROVED, PROPOSED, or NOT YET IMPLEMENTED. Planned functionality must never be described as implemented.
