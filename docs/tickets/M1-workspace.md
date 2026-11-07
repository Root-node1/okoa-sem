# Milestone 1 — Workspace and academic structure

## T-101 — Course management API

1. Ticket ID: T-101
2. Title: Course management API
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Implement backend CRUD for courses scoped to a workspace/institution.
7. Scope: Create, list, get, update courses; enforce tenant scoping and role permissions.
8. Files/directories owned or may modify: `backend/src/modules/courses/`, `backend/src/routes/` (if mounted), `backend/migrations/` (new migration only), `backend/tests/`
9. Files/directories that must not be modified: `frontend/`, other backend modules without coordination
10. Dependencies: none (foundation)
11. API/data contracts required: `/api/v1/courses` GET/POST/PATCH; course `{ id, code, name }`; error envelope; auth cookie
12. Implementation instructions: Use existing `courses` table; add controller/service/repository/schema/routes; mount under `/api/v1/courses` with `requireAuth`; lecturer/class_rep can create/update per policy; students read enrolled/permitted courses. Add Zod schemas.
13. Acceptance criteria: Authenticated user can list courses in workspace; lecturer can create course; student cannot create; cross-tenant access denied.
14. Tests required: API contract tests, role permission tests, tenant isolation tests.
15. Definition of Done: Code merged, tests pass, migration applied, docs/tickets updated.
16. Integration notes: Frontend courses page (T-108) consumes this API.

## T-102 — Workspace membership management API

1. Ticket ID: T-102
2. Title: Workspace membership management API
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Manage users' workspace memberships and roles.
7. Scope: List members, add member, update role/status, remove member.
8. Files/directories owned or may modify: `backend/src/modules/users/` or new `backend/src/modules/workspaces/`, `backend/migrations/` (if needed), `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-101 (for context)
11. API/data contracts required: `/api/v1/workspaces/:id/memberships` endpoints; role enum student/class_rep/lecturer; status active/suspended/removed
12. Implementation instructions: Use `workspace_memberships`; enforce that only authorized roles can change roles; prevent self-escalation to lecturer; keep workspace and course access separate.
13. Acceptance criteria: Admin/lecturer (per policy) can add/remove members; role changes audited; unauthorized changes return 403.
14. Tests required: permission tests, tenant isolation tests.
15. Definition of Done: API tested, no direct DB access from frontend.
16. Integration notes: Frontend workspace UI (T-107) depends on this.

## T-103 — Student enrolment API

1. Ticket ID: T-103
2. Title: Student enrolment API
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Enrol and unenrol students in courses.
7. Scope: Enrol current user or specified student (authorized), list enrolments, remove enrolment.
8. Files/directories owned or may modify: `backend/src/modules/enrolments/`, `backend/migrations/` (if adding role), `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-101
11. API/data contracts required: `/api/v1/me/enrolments`, `/api/v1/courses/:id/enrolments`; enrolment `{ id, userId, courseId, status }`
12. Implementation instructions: Use `course_enrolments`; enforce course-level access separate from workspace membership; class_rep/lecturer assignment policy PROPOSED and must be decided with Product Lead before coding privileged enrolment.
13. Acceptance criteria: Student can enrol in permitted course; duplicate enrolment returns 409; unenrol works.
14. Tests required: API tests, duplicate handling, tenant isolation.
15. Definition of Done: Endpoint documented in ticket/PR.
16. Integration notes: Frontend course selection (T-108).

## T-104 — Lecturer and class representative assignment policy

1. Ticket ID: T-104
2. Title: Lecturer and class representative assignment policy
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 5 — Product Lead (decision) with Dev 2
6. Objective: Decide and document how lecturers and class reps are assigned to courses.
7. Scope: Product decision + backend implementation of assignment.
8. Files/directories owned or may modify: `docs/` (decision note), `backend/src/modules/courses/`, `backend/migrations/`
9. Files/directories that must not be modified: `frontend/` until contract agreed
10. Dependencies: T-101, T-102
11. API/data contracts required: course assignment endpoint and role policy
12. Implementation instructions: Decide whether to add `course_memberships` table or extend `course_enrolments` with role; document in architecture; implement after decision.
13. Acceptance criteria: Written decision in docs or ticket; migration + API implemented.
14. Tests required: permission tests.
15. Definition of Done: Decision recorded and implemented.
16. Integration notes: Blocks T-103 privileged flows and T-108 UI.

## T-105 — Cross-workspace isolation backend enforcement

1. Ticket ID: T-105
2. Title: Cross-workspace isolation backend enforcement
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Ensure all tenant-scoped queries filter by institution_id and membership.
7. Scope: Shared repository helpers or middleware for tenant context; tests.
8. Files/directories owned or may modify: `backend/src/middleware/`, `backend/src/modules/*/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-101
11. API/data contracts required: authenticated user context includes memberships
12. Implementation instructions: Add helper to extract active workspace from req.user; apply to all new repositories; add integration tests attempting cross-tenant access.
13. Acceptance criteria: Cross-tenant requests return 403/404; tests pass.
14. Tests required: tenant isolation integration tests.
15. Definition of Done: Documented pattern in code comments? (minimal) and tests.
16. Integration notes: Required before any new resource endpoint.

## T-106 — Frontend authentication integration

1. Ticket ID: T-106
2. Title: Frontend authentication integration
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: Connect React frontend to backend auth endpoints with credentials.
7. Scope: Update API client to use `credentials: "include"`, handle 204, restore session via `/me`, protected routes, logout.
8. Files/directories owned or may modify: `frontend/src/services/api.ts`, `frontend/src/context/AuthContext.tsx`, `frontend/src/pages/LoginPage.tsx`, `frontend/src/pages/RegisterPage.tsx`, `frontend/src/App.tsx`, `frontend/src/layouts/`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: none (foundation auth implemented)
11. API/data contracts required: auth endpoints and error envelope from architecture
12. Implementation instructions: Do not store tokens in localStorage/sessionStorage; send credentials include; restore auth on app load; clear state on 401.
13. Acceptance criteria: Register/login/logout/me flow works in browser; protected routes redirect.
14. Tests required: frontend unit/component tests if added; manual E2E.
15. Definition of Done: Frontend build passes.
16. Integration notes: Uses backend auth exactly as implemented.

## T-107 — Frontend workspace and course interfaces (shell)

1. Ticket ID: T-107
2. Title: Frontend workspace and course interfaces (shell)
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: Build workspace/course UI shells consuming T-101/T-103.
7. Scope: Courses page integration, enrolment UI, loading/empty/error states.
8. Files/directories owned or may modify: `frontend/src/pages/CoursesPage.tsx`, `frontend/src/components/` (new), `frontend/src/types/index.ts`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: T-101, T-103, T-106
11. API/data contracts required: course and enrolment contracts
12. Implementation instructions: Use typed API client; no domain logic in frontend; display only.
13. Acceptance criteria: User can view/enrol in courses.
14. Tests required: component tests (if framework added) or manual.
15. Definition of Done: Frontend build passes.
16. Integration notes: Contract freeze with backend before coding.

## T-108 — Frontend role-aware navigation

1. Ticket ID: T-108
2. Title: Frontend role-aware navigation
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: Show navigation based on memberships/roles without enforcing security.
7. Scope: Dashboard routing for student/class_rep/lecturer; role display only.
8. Files/directories owned or may modify: `frontend/src/App.tsx`, `frontend/src/layouts/MainLayout.tsx`, `frontend/src/pages/*Dashboard.tsx`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: T-106
11. API/data contracts required: `/me` memberships
12. Implementation instructions: Use memberships from auth context; backend remains authority.
13. Acceptance criteria: Correct dashboard shown per role; no security reliance on frontend.
14. Tests required: manual.
15. Definition of Done: Build passes.
16. Integration notes: Does not change backend.
