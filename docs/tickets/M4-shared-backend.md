# Milestone 4 — Shared backend and integration

## T-401 Shared database schema and migration coordination

**Milestone:** M4
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Coordinate shared schema changes and migrations.
**Product outcome:** Safe, consistent persistence layer.
**Scope:** Migrations for sources, claims, events, assignments, tasks, audit.
**Files owned / allowed to modify:** `backend/migrations/`, repositories
**Files not allowed to modify:** frontend
**Dependencies:** T-003, T-005
**API/data contract:** Shared entity schemas
**Implementation steps:** Add migrations; coordinate with A/B.
**Acceptance criteria:** Migrations run in CI.
**Tests required:** migration tests.
**Integration requirements:** CI.
**Definition of Done:** CI green.
**Risks / decisions required:** Schema approval.

## T-402 Academic domain services

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Implement shared academic domain services.
**Product outcome:** Business logic centralized in backend.
**Scope:** Services for events, assignments, tasks.
**Files owned / allowed to modify:** `backend/src/modules/` shared services
**Files not allowed to modify:** frontend
**Dependencies:** T-401
**API/data contract:** Domain service interfaces
**Implementation steps:** Implement services.
**Acceptance criteria:** Services tested.
**Tests required:** unit/integration tests.
**Integration requirements:** Student/extraction.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-403 Source and provenance persistence

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** B
**Objective:** Persist sources and provenance.
**Product outcome:** Extracted information is traceable.
**Scope:** Source/document records and provenance fields.
**Files owned / allowed to modify:** migrations, ingestion repositories
**Files not allowed to modify:** frontend
**Dependencies:** T-401, T-201
**API/data contract:** Source/provenance interface
**Implementation steps:** Implement persistence.
**Acceptance criteria:** Provenance stored.
**Tests required:** integration tests.
**Integration requirements:** Extraction.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-404 Review and verification service

**Milestone:** M4
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** B
**Objective:** Implement verification service.
**Product outcome:** Claims become authoritative only after approval.
**Scope:** Approve/reject/clarify/correct endpoints.
**Files owned / allowed to modify:** claims/academic-events modules
**Files not allowed to modify:** frontend
**Dependencies:** T-401, T-205
**API/data contract:** Verification endpoints
**Implementation steps:** Implement service.
**Acceptance criteria:** Verification gate enforced.
**Tests required:** API + permission tests.
**Integration requirements:** Extraction review UI.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Role policy.

## T-405 Academic event creation and version history

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Create events from approved claims with versioning.
**Product outcome:** Confirmed records traceable and versioned.
**Scope:** Event creation, supersession, history.
**Files owned / allowed to modify:** academic-events modules
**Files not allowed to modify:** frontend
**Dependencies:** T-404
**API/data contract:** Event endpoints
**Implementation steps:** Implement creation/versioning.
**Acceptance criteria:** Versions preserved.
**Tests required:** integration tests.
**Integration requirements:** Student API.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-406 Audit trail

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Implement audit logging.
**Product outcome:** Actions are auditable.
**Scope:** Audit table and service.
**Files owned / allowed to modify:** audit module, migrations
**Files not allowed to modify:** frontend
**Dependencies:** T-401
**API/data contract:** Audit entries
**Implementation steps:** Implement append-only audit.
**Acceptance criteria:** Actions audited.
**Tests required:** integration tests.
**Integration requirements:** All modules.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-407 Workspace and course authorization

**Milestone:** M4
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A
**Objective:** Enforce workspace and course authorization.
**Product outcome:** Tenant/course isolation.
**Scope:** Authorization helpers and middleware.
**Files owned / allowed to modify:** auth/middleware, shared helpers
**Files not allowed to modify:** frontend
**Dependencies:** T-005
**API/data contract:** Authorization rules
**Implementation steps:** Implement helpers.
**Acceptance criteria:** Unauthorized access denied.
**Tests required:** isolation tests.
**Integration requirements:** All endpoints.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Course membership model.

## T-408 Background processing infrastructure decision and implementation

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** B
**Objective:** Decide and implement background processing approach.
**Product outcome:** Async extraction/reminders supported.
**Scope:** Runner decision, implementation, env config.
**Files owned / allowed to modify:** backend, CI, docs
**Files not allowed to modify:** frontend
**Dependencies:** T-001
**API/data contract:** Job interface
**Implementation steps:** Evaluate and implement.
**Acceptance criteria:** Async processing works.
**Tests required:** integration tests.
**Integration requirements:** Extraction.
**Definition of Done:** Documented and tested.
**Risks / decisions required:** Runner choice (PROPOSED).

## T-409 Integration of student APIs with domain services

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A
**Objective:** Connect student API to domain services.
**Product outcome:** Student endpoints return real data.
**Scope:** Service integration.
**Files owned / allowed to modify:** student modules, domain services
**Files not allowed to modify:** frontend
**Dependencies:** T-101..T-107, T-402
**API/data contract:** Student endpoints
**Implementation steps:** Integrate.
**Acceptance criteria:** Endpoints return data.
**Tests required:** integration tests.
**Integration requirements:** Student API.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-410 Integration of extraction pipeline with persistence

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** B
**Objective:** Connect extraction pipeline to persistence.
**Product outcome:** Extracted claims stored as pending.
**Scope:** Integration.
**Files owned / allowed to modify:** extraction modules, repositories
**Files not allowed to modify:** frontend
**Dependencies:** T-201..T-213, T-403
**API/data contract:** Source/claim interface
**Implementation steps:** Integrate.
**Acceptance criteria:** Claims stored pending.
**Tests required:** integration tests.
**Integration requirements:** Extraction.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-411 Cross-module integration tests

**Milestone:** M4
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Test integrated workflow.
**Product outcome:** End-to-end confidence.
**Scope:** Integration tests.
**Files owned / allowed to modify:** `backend/tests/`, `frontend/` tests
**Files not allowed to modify:** application source
**Dependencies:** T-409, T-410
**API/data contract:** All endpoints
**Implementation steps:** Add tests.
**Acceptance criteria:** Tests pass.
**Tests required:** integration tests.
**Integration requirements:** CI.
**Definition of Done:** CI green.
**Risks / decisions required:** None.
