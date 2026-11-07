# Milestone 4 — Academic records and coordination

## T-401 — Academic event model and CRUD

1. Ticket ID: T-401
2. Title: Academic event model and CRUD
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Implement academic events storage and CRUD.
7. Scope: Migration + repository + service + controller + routes.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/academic-events/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-105, T-101
11. API/data contracts required: `/api/v1/events`; event types and status draft/verified/superseded/cancelled
12. Implementation instructions: Tenant and course scoping; provenance fields (source_claim_id).
13. Acceptance criteria: CRUD works for authorized users.
14. Tests required: API tests, permission tests.
15. Definition of Done: CI passes.
16. Integration notes: Calendar API (T-502).

## T-402 — Verification endpoints

1. Ticket ID: T-402
2. Title: Verification endpoints
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Approve/reject/merge extracted claims into academic events.
7. Scope: `POST /claims/:id/approve`, `/reject`, `/merge`; role policy.
8. Files/directories owned or may modify: `backend/src/modules/claims/`, `backend/src/modules/academic-events/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-306, T-401, T-104
11. API/data contracts required: verification status; role permissions
12. Implementation instructions: Only lecturer (and policy-permitted roles) verifies deadlines/exams; class_rep verification only where policy permits; audit changes.
13. Acceptance criteria: Verified claim creates/updates event; rejected claim creates no event.
14. Tests required: API + permission tests.
15. Definition of Done: CI passes.
16. Integration notes: Frontend review UI (T-307).

## T-403 — Claim approval creates academic event

1. Ticket ID: T-403
2. Title: Claim approval creates academic event
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer with Dev 3
6. Objective: Link approved claim to academic event with provenance.
7. Scope: Transactional create/update; versioning.
8. Files/directories owned or may modify: `backend/src/modules/claims/`, `backend/src/modules/academic-events/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-402
11. API/data contracts required: event.source_claim_id
12. Implementation instructions: Preserve source provenance; do not overwrite claims.
13. Acceptance criteria: Approved claim creates verified event.
14. Tests required: integration tests.
15. Definition of Done: Tests pass.
16. Integration notes: Notification triggers (M5).

## T-404 — Assignment model and CRUD

1. Ticket ID: T-404
2. Title: Assignment model and CRUD
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Implement assignments tied to courses/events.
7. Scope: Migration + CRUD endpoints.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/assignments/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-401, T-101
11. API/data contracts required: `/api/v1/assignments`; due_at ISO 8601
12. Implementation instructions: Lecturer creates/updates; students read enrolled courses.
13. Acceptance criteria: CRUD works with permissions.
14. Tests required: API tests.
15. Definition of Done: CI passes.
16. Integration notes: Submission (T-405), frontend (T-503).

## T-405 — Submission upload and status

1. Ticket ID: T-405
2. Title: Submission upload and status
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer with Dev 1
6. Objective: Allow students to submit work and track status.
7. Scope: Submission records, file upload via Cloudinary, grading fields.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/submissions/`, `backend/src/services/cloudinaryService.js`, `backend/tests/`, `frontend/src/pages/`
9. Files/directories that must not be modified: other backend modules without coordination
10. Dependencies: T-404, T-203
11. API/data contracts required: submission status not_submitted/submitted/late/graded
12. Implementation instructions: Students only own submissions; grading restricted to lecturer.
13. Acceptance criteria: Student submits; lecturer grades.
14. Tests required: API + permission tests.
15. Definition of Done: CI passes.
16. Integration notes: Frontend assignment workflow.

## T-406 — Audit logging

1. Ticket ID: T-406
2. Title: Audit logging
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Record auth, verification, record changes, permission denials.
7. Scope: Audit table + service; append-only.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/audit/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-402
11. API/data contracts required: audit entry `{ actorId, action, entityType, entityId, before, after }`
12. Implementation instructions: Immutable append-only; no PII beyond necessary.
13. Acceptance criteria: Verification and changes create audit entries.
14. Tests required: integration tests.
15. Definition of Done: Tests pass.
16. Integration notes: Compliance (M6).

## T-407 — Change history and versioning

1. Ticket ID: T-407
2. Title: Change history and versioning
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Track academic event versions and supersession.
7. Scope: version increment, history endpoint.
8. Files/directories owned or may modify: `backend/src/modules/academic-events/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-406
11. API/data contracts required: `GET /events/:id/history`
12. Implementation instructions: Superseded events remain queryable.
13. Acceptance criteria: History shows prior versions.
14. Tests required: API tests.
15. Definition of Done: Tests pass.
16. Integration notes: Frontend history view.

## T-408 — Frontend dashboard and calendar integration

1. Ticket ID: T-408
2. Title: Frontend dashboard and calendar integration
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: Connect dashboard and calendar to backend APIs.
7. Scope: Dashboard attention list, calendar month/week, event chips, unverified badges.
8. Files/directories owned or may modify: `frontend/src/pages/StudentDashboard.tsx`, `ClassRepDashboard.tsx`, `LecturerDashboard.tsx`, `CalendarPage.tsx`, `frontend/src/components/`, `frontend/src/services/api.ts`, `frontend/src/types/index.ts`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: T-401, T-404, T-106
11. API/data contracts required: events and assignments endpoints
12. Implementation instructions: Show source/provenance; empty/loading/error states.
13. Acceptance criteria: Events/deadlines visible.
14. Tests required: manual; build passes.
15. Definition of Done: Frontend build passes.
16. Integration notes: Contract freeze with backend.
