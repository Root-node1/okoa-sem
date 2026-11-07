# Milestone 1 — Student API

## T-101 Student dashboard endpoint

**Milestone:** M1
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** Provide student dashboard data.
**Product outcome:** Students see attention items and upcoming work.
**Scope:** Endpoint returning confirmed events, deadlines, recent changes, unverified items.
**Files owned / allowed to modify:** `backend/src/modules/` student route files, tests
**Files not allowed to modify:** shared migrations, auth, frontend
**Dependencies:** T-002, T-005, T-409
**API/data contract:** `GET /api/v1/student/dashboard`
**Implementation steps:** Implement route/controller/service; scope by enrolment.
**Acceptance criteria:** Authorized student receives scoped dashboard data.
**Tests required:** API + authorization tests.
**Integration requirements:** Academic records API (D).
**Definition of Done:** Tests pass and documented.
**Risks / decisions required:** Data availability.

## T-102 Enrolled courses endpoint

**Milestone:** M1
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** List courses a student is enrolled in.
**Product outcome:** Students can view enrolled courses.
**Scope:** Endpoint and authorization.
**Files owned / allowed to modify:** student route files, tests
**Files not allowed to modify:** shared migrations, auth
**Dependencies:** T-002, T-005
**API/data contract:** `GET /api/v1/student/courses`
**Implementation steps:** Query enrolments; scope by user.
**Acceptance criteria:** Only enrolled courses returned.
**Tests required:** API + isolation tests.
**Integration requirements:** Course data.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-103 Confirmed academic information endpoint

**Milestone:** M1
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** Provide confirmed academic information for enrolled courses.
**Product outcome:** Students view official academic information.
**Scope:** Endpoint with course filters.
**Files owned / allowed to modify:** student route files, tests
**Files not allowed to modify:** shared migrations, auth
**Dependencies:** T-002, T-005, T-409
**API/data contract:** `GET /api/v1/student/academic-information`
**Implementation steps:** Integrate with academic records service.
**Acceptance criteria:** Only confirmed information returned.
**Tests required:** API + authorization tests.
**Integration requirements:** Academic records.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-104 Assignments and deadlines endpoint

**Milestone:** M1
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** List assignments and deadlines for enrolled courses.
**Product outcome:** Students track due work.
**Scope:** Endpoint with status filters.
**Files owned / allowed to modify:** student route files, tests
**Files not allowed to modify:** shared migrations, auth
**Dependencies:** T-002, T-005, T-409
**API/data contract:** `GET /api/v1/student/assignments`
**Implementation steps:** Integrate with assignment service.
**Acceptance criteria:** Scoped assignment data returned.
**Tests required:** API + isolation tests.
**Integration requirements:** Academic records.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-105 Academic calendar endpoint

**Milestone:** M1
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** Provide calendar events for a date range.
**Product outcome:** Students view academic calendar.
**Scope:** Endpoint with from/to parameters.
**Files owned / allowed to modify:** student route files, tests
**Files not allowed to modify:** shared migrations, auth
**Dependencies:** T-002, T-005, T-409
**API/data contract:** `GET /api/v1/student/calendar`
**Implementation steps:** Integrate with academic records service.
**Acceptance criteria:** Events returned in range.
**Tests required:** API tests.
**Integration requirements:** Academic records.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Date handling.

## T-106 Personal task CRUD

**Milestone:** M1
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** Allow students to manage personal tasks.
**Product outcome:** Students track personal academic tasks.
**Scope:** Create, list, update, delete personal tasks.
**Files owned / allowed to modify:** student route files, tests; migration coordination with D
**Files not allowed to modify:** shared migrations without D
**Dependencies:** T-002, T-005, T-401
**API/data contract:** `/api/v1/student/tasks`
**Implementation steps:** Implement endpoints; coordinate migration with D.
**Acceptance criteria:** Personal task CRUD works.
**Tests required:** API tests.
**Integration requirements:** Shared persistence.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Schema approval.

## T-107 Source submission status endpoint

**Milestone:** M1
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D, B
**Objective:** Expose source processing/extraction status to students.
**Product outcome:** Students track submitted information.
**Scope:** Endpoint returning status and non-authoritative metadata.
**Files owned / allowed to modify:** student route files, tests
**Files not allowed to modify:** shared migrations, auth
**Dependencies:** T-003, T-005, T-410
**API/data contract:** `GET /api/v1/student/sources/:id/status`
**Implementation steps:** Integrate with ingestion/extraction status.
**Acceptance criteria:** Status returned without exposing unverified info as official.
**Tests required:** API + authorization tests.
**Integration requirements:** Extraction pipeline.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-108 Student authorization and isolation tests

**Milestone:** M1
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** Verify student access boundaries.
**Product outcome:** No unauthorized data exposure.
**Scope:** Cross-tenant and cross-role tests.
**Files owned / allowed to modify:** `backend/tests/`
**Files not allowed to modify:** application source
**Dependencies:** T-101..T-107
**API/data contract:** All student endpoints
**Implementation steps:** Add integration tests.
**Acceptance criteria:** Tests pass in CI.
**Tests required:** integration tests.
**Integration requirements:** CI.
**Definition of Done:** CI green.
**Risks / decisions required:** Test DB.

## T-109 Student API Postman documentation

**Milestone:** M1
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer A
**Supporting developers:** D
**Objective:** Document student API in Postman collection.
**Product outcome:** Frontend and testers can exercise endpoints.
**Scope:** Requests and examples.
**Files owned / allowed to modify:** `docs/postman/`
**Files not allowed to modify:** backend source
**Dependencies:** T-101..T-107
**API/data contract:** Student endpoints
**Implementation steps:** Add requests.
**Acceptance criteria:** Collection runs successfully.
**Tests required:** manual.
**Integration requirements:** Backend running.
**Definition of Done:** Documented.
**Risks / decisions required:** None.
