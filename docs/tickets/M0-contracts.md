# Milestone 0 — Shared contracts and integration foundation

## T-001 Confirm existing backend conventions

**Milestone:** M0
**Priority:** P1
**Status:** DONE
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Document and confirm existing backend module, validation and repository conventions.
**Product outcome:** All developers implement against the same backend patterns.
**Scope:** Backend conventions, file layout, error envelope, migration process.
**Files owned / allowed to modify:** `docs/`, `backend/README` if added
**Files not allowed to modify:** application source without coordination
**Dependencies:** none
**API/data contract:** Existing `/api/v1` conventions
**Implementation steps:** Inspect repo; record conventions in system design/tickets.
**Acceptance criteria:** Conventions documented and agreed.
**Tests required:** none
**Integration requirements:** Shared by all.
**Definition of Done:** Documented and reviewed.
**Risks / decisions required:** None.

## T-002 Student API contract agreement

**Milestone:** M0
**Priority:** P0
**Status:** DONE
**Accountable owner:** Developer D
**Supporting developers:** A
**Objective:** Agree student-facing API contracts before implementation.
**Product outcome:** Student API can be built and consumed without collisions.
**Scope:** Endpoint paths, request/response shapes, status codes, pagination.
**Files owned / allowed to modify:** `docs/`, contract notes
**Files not allowed to modify:** `frontend/`, `backend/` source until agreed
**Dependencies:** T-001
**API/data contract:** Student endpoints proposed in system design
**Implementation steps:** Draft contracts with A; review with D.
**Acceptance criteria:** Written contract for each student endpoint.
**Tests required:** contract verification plan
**Integration requirements:** Frontend and backend alignment.
**Definition of Done:** Contract frozen for first increment.
**Risks / decisions required:** Endpoint readiness.

## T-003 Source and academic claim interface agreement

**Milestone:** M0
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** B
**Objective:** Agree source, processing and extracted claim contracts.
**Product outcome:** Extraction pipeline integrates with persistence.
**Scope:** Source record, processing status, claim schema, provenance fields.
**Files owned / allowed to modify:** `docs/`, contract notes
**Files not allowed to modify:** application source until agreed
**Dependencies:** T-001
**API/data contract:** Source and claim interfaces
**Implementation steps:** Define fields and statuses with B.
**Acceptance criteria:** Shared source/claim contract documented.
**Tests required:** schema validation tests plan
**Integration requirements:** Persistence integration.
**Definition of Done:** Contract frozen.
**Risks / decisions required:** AI provider output variability.

## T-004 Frontend API contract agreement

**Milestone:** M0
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** C
**Objective:** Agree frontend API interfaces and TypeScript types.
**Product outcome:** Frontend can build against stable types.
**Scope:** Response envelopes, error handling, auth flow.
**Files owned / allowed to modify:** `docs/`, `frontend/src/types` only after agreement
**Files not allowed to modify:** backend source
**Dependencies:** T-002, T-003
**API/data contract:** Frontend API interfaces
**Implementation steps:** Define typed interfaces with C.
**Acceptance criteria:** Typed contract documented.
**Tests required:** frontend integration test plan
**Integration requirements:** Backend/frontend alignment.
**Definition of Done:** Contract frozen.
**Risks / decisions required:** Mocking strategy.

## T-005 Authorization boundary definition

**Milestone:** M0
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Define workspace and course authorization boundaries.
**Product outcome:** No endpoint exposes unauthorized or unverified information.
**Scope:** Role permissions, tenant isolation, course access.
**Files owned / allowed to modify:** `docs/`, backend auth modules only by D
**Files not allowed to modify:** frontend, extraction source
**Dependencies:** T-001
**API/data contract:** Authorization rules
**Implementation steps:** Document rules; review with A/B.
**Acceptance criteria:** Authorization matrix agreed.
**Tests required:** isolation test plan
**Integration requirements:** All endpoints.
**Definition of Done:** Documented and reviewed.
**Risks / decisions required:** Course membership model.

## T-006 Integration test strategy

**Milestone:** M0
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Define cross-module integration and regression testing approach.
**Product outcome:** Integration checkpoints are verifiable.
**Scope:** Test levels, fixtures, CI integration.
**Files owned / allowed to modify:** `docs/`, `.github/workflows/` by D
**Files not allowed to modify:** application source without coordination
**Dependencies:** T-001
**API/data contract:** Test data contracts
**Implementation steps:** Agree test strategy.
**Acceptance criteria:** Strategy documented.
**Tests required:** integration suite plan
**Integration requirements:** CI.
**Definition of Done:** Documented.
**Risks / decisions required:** Test database setup.
