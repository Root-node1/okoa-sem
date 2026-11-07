# Milestone 3 — Frontend end-to-end

## T-301 Frontend app shell and navigation

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D
**Objective:** Build app shell and navigation.
**Product outcome:** Users can navigate the application.
**Scope:** Layouts, routes, navigation.
**Files owned / allowed to modify:** `frontend/src/`
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004
**API/data contract:** None
**Implementation steps:** Implement shell.
**Acceptance criteria:** Navigation works.
**Tests required:** build/manual.
**Integration requirements:** None.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-302 Authentication and session integration

**Milestone:** M3
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D
**Objective:** Integrate frontend auth with backend session API.
**Product outcome:** Users can log in and maintain session.
**Scope:** API client credentials include, /me restore, protected routes, logout.
**Files owned / allowed to modify:** `frontend/src/services/api.ts`, `frontend/src/context/`, pages, layouts
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004
**API/data contract:** Auth endpoints
**Implementation steps:** Implement auth flow.
**Acceptance criteria:** Login/logout/me flow works.
**Tests required:** manual; build.
**Integration requirements:** Backend auth.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-303 Student dashboard UI

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** A
**Objective:** Build student dashboard UI.
**Product outcome:** Students see attention items.
**Scope:** Dashboard page and components.
**Files owned / allowed to modify:** `frontend/src/pages/StudentDashboard.tsx`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-101
**API/data contract:** Student dashboard endpoint
**Implementation steps:** Build UI against contract.
**Acceptance criteria:** Dashboard renders data.
**Tests required:** build/manual.
**Integration requirements:** Student API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-304 Course views

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** A
**Objective:** Build course views.
**Product outcome:** Students view enrolled courses.
**Scope:** Courses page and course detail.
**Files owned / allowed to modify:** `frontend/src/pages/CoursesPage.tsx`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-102
**API/data contract:** Enrolled courses endpoint
**Implementation steps:** Build UI.
**Acceptance criteria:** Courses render.
**Tests required:** build/manual.
**Integration requirements:** Student API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-305 Academic event views

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** A, D
**Objective:** Build academic event views.
**Product outcome:** Students view confirmed events.
**Scope:** Event list/detail.
**Files owned / allowed to modify:** `frontend/src/pages/`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-103
**API/data contract:** Academic information endpoint
**Implementation steps:** Build UI.
**Acceptance criteria:** Events render.
**Tests required:** build/manual.
**Integration requirements:** Student API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-306 Assignment and deadline views

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** A
**Objective:** Build assignment/deadline views.
**Product outcome:** Students track due work.
**Scope:** Assignment list/detail.
**Files owned / allowed to modify:** `frontend/src/pages/`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-104
**API/data contract:** Assignments endpoint
**Implementation steps:** Build UI.
**Acceptance criteria:** Assignments render.
**Tests required:** build/manual.
**Integration requirements:** Student API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-307 Academic calendar UI

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** A
**Objective:** Build academic calendar UI.
**Product outcome:** Students view calendar.
**Scope:** Calendar page and views.
**Files owned / allowed to modify:** `frontend/src/pages/CalendarPage.tsx`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-105
**API/data contract:** Calendar endpoint
**Implementation steps:** Build UI.
**Acceptance criteria:** Calendar renders events.
**Tests required:** build/manual.
**Integration requirements:** Student API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-308 Personal tasks UI

**Milestone:** M3
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** A
**Objective:** Build personal task UI.
**Product outcome:** Students manage personal tasks.
**Scope:** Task list/forms.
**Files owned / allowed to modify:** `frontend/src/pages/`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-106
**API/data contract:** Personal tasks endpoints
**Implementation steps:** Build UI.
**Acceptance criteria:** Task CRUD works in UI.
**Tests required:** build/manual.
**Integration requirements:** Student API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-309 Source submission and upload UI

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** B, D
**Objective:** Build source submission/upload UI.
**Product outcome:** Users submit academic information.
**Scope:** Paste form, file upload, validation.
**Files owned / allowed to modify:** `frontend/src/pages/`, components, services
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-107, T-201
**API/data contract:** Ingestion endpoints
**Implementation steps:** Build UI.
**Acceptance criteria:** Submission works.
**Tests required:** build/manual.
**Integration requirements:** Ingestion API.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-310 Processing status UI

**Milestone:** M3
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** B
**Objective:** Display processing status.
**Product outcome:** Users track submitted sources.
**Scope:** Status badges and detail.
**Files owned / allowed to modify:** `frontend/src/`
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-107, T-212
**API/data contract:** Processing status
**Implementation steps:** Build UI.
**Acceptance criteria:** Status visible.
**Tests required:** build/manual.
**Integration requirements:** Extraction.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-311 Extraction review UI

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** B, D
**Objective:** Build extraction review UI.
**Product outcome:** Reviewers can approve/reject claims.
**Scope:** Claim list/detail, actions, provenance.
**Files owned / allowed to modify:** `frontend/src/`
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004, T-003, verification endpoints
**API/data contract:** Claims/verification endpoints
**Implementation steps:** Build UI.
**Acceptance criteria:** Review actions work.
**Tests required:** build/manual.
**Integration requirements:** Extraction/backend.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-312 Lecturer experience UI

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D
**Objective:** Build lecturer experience.
**Product outcome:** Lecturers manage academic information.
**Scope:** Lecturer dashboard/pages.
**Files owned / allowed to modify:** `frontend/src/pages/LecturerDashboard.tsx`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004
**API/data contract:** Lecturer endpoints (TBD)
**Implementation steps:** Build UI shell.
**Acceptance criteria:** Lecturer views render.
**Tests required:** build/manual.
**Integration requirements:** Backend APIs.
**Definition of Done:** Build passes.
**Risks / decisions required:** API readiness.

## T-313 Class representative experience UI

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D
**Objective:** Build class representative experience.
**Product outcome:** Class reps coordinate information.
**Scope:** Class rep dashboard/pages.
**Files owned / allowed to modify:** `frontend/src/pages/ClassRepDashboard.tsx`, components
**Files not allowed to modify:** `backend/`
**Dependencies:** T-004
**API/data contract:** Class rep endpoints (TBD)
**Implementation steps:** Build UI shell.
**Acceptance criteria:** Views render.
**Tests required:** build/manual.
**Integration requirements:** Backend APIs.
**Definition of Done:** Build passes.
**Risks / decisions required:** API readiness.

## T-314 Empty, loading and error states

**Milestone:** M3
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D
**Objective:** Implement UX states.
**Product outcome:** Robust user experience.
**Scope:** Empty/loading/error components.
**Files owned / allowed to modify:** `frontend/src/`
**Files not allowed to modify:** `backend/`
**Dependencies:** T-301
**API/data contract:** None
**Implementation steps:** Add states.
**Acceptance criteria:** States present.
**Tests required:** build/manual.
**Integration requirements:** None.
**Definition of Done:** Build passes.
**Risks / decisions required:** None.

## T-315 Responsive and accessibility verification

**Milestone:** M3
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D, QA
**Objective:** Verify responsive design and accessibility.
**Product outcome:** Usable on mobile and accessible.
**Scope:** Responsive layouts, WCAG checks.
**Files owned / allowed to modify:** `frontend/src/`
**Files not allowed to modify:** `backend/`
**Dependencies:** T-303..T-314
**API/data contract:** None
**Implementation steps:** Test and fix.
**Acceptance criteria:** No critical a11y issues.
**Tests required:** a11y checks.
**Integration requirements:** None.
**Definition of Done:** Documented.
**Risks / decisions required:** None.

## T-316 Frontend API integration tests

**Milestone:** M3
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer C
**Supporting developers:** D
**Objective:** Add frontend integration tests.
**Product outcome:** Frontend contracts verified.
**Scope:** API integration tests.
**Files owned / allowed to modify:** `frontend/` tests
**Files not allowed to modify:** `backend/`
**Dependencies:** T-302..T-314
**API/data contract:** All frontend endpoints
**Implementation steps:** Add tests.
**Acceptance criteria:** Tests pass.
**Tests required:** integration tests.
**Integration requirements:** Backend running.
**Definition of Done:** CI green.
**Risks / decisions required:** None.
