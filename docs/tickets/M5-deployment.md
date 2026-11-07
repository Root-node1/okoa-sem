# Milestone 5 — Deployment and production readiness

## T-501 Frontend deployment configuration

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** C
**Objective:** Configure frontend deployment.
**Product outcome:** Frontend deployable.
**Scope:** Build/deploy config.
**Files owned / allowed to modify:** `.github/workflows/`, config, docs
**Files not allowed to modify:** application source without coordination
**Dependencies:** M3 complete
**API/data contract:** None
**Implementation steps:** Configure deploy.
**Acceptance criteria:** Frontend deploys.
**Tests required:** smoke.
**Integration requirements:** CI.
**Definition of Done:** Documented.
**Risks / decisions required:** Hosting platform.

## T-502 Backend deployment configuration

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Configure backend deployment.
**Product outcome:** Backend deployable.
**Scope:** Build/deploy config.
**Files owned / allowed to modify:** `.github/workflows/`, config, docs
**Files not allowed to modify:** application source without coordination
**Dependencies:** M4 complete
**API/data contract:** None
**Implementation steps:** Configure deploy.
**Acceptance criteria:** Backend deploys.
**Tests required:** smoke.
**Integration requirements:** CI.
**Definition of Done:** Documented.
**Risks / decisions required:** Hosting platform.

## T-503 Production environment variables

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Document and configure production env vars.
**Product outcome:** Secure configuration.
**Scope:** Env vars and secrets.
**Files owned / allowed to modify:** `.env.example`, docs, CI
**Files not allowed to modify:** secrets
**Dependencies:** T-501, T-502
**API/data contract:** Env vars
**Implementation steps:** Document and configure.
**Acceptance criteria:** Vars documented.
**Tests required:** smoke.
**Integration requirements:** Deployment.
**Definition of Done:** Documented.
**Risks / decisions required:** Secret management.

## T-504 Database migration deployment

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Configure migration deployment.
**Product outcome:** DB migrations run safely.
**Scope:** Migration pipeline.
**Files owned / allowed to modify:** `.github/workflows/`, scripts, docs
**Files not allowed to modify:** migrations without coordination
**Dependencies:** T-502
**API/data contract:** None
**Implementation steps:** Configure.
**Acceptance criteria:** Migrations run in deploy.
**Tests required:** smoke.
**Integration requirements:** CI.
**Definition of Done:** Documented.
**Risks / decisions required:** Rollback.

## T-505 Cloudinary production configuration

**Milestone:** M5
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** B, C
**Objective:** Configure Cloudinary for production.
**Product outcome:** File storage works in production.
**Scope:** Cloudinary env and access.
**Files owned / allowed to modify:** docs, env config
**Files not allowed to modify:** secrets
**Dependencies:** T-503
**API/data contract:** None
**Implementation steps:** Configure.
**Acceptance criteria:** Uploads work in prod.
**Tests required:** smoke.
**Integration requirements:** Deployment.
**Definition of Done:** Documented.
**Risks / decisions required:** Credentials.

## T-506 CI/CD verification

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Verify CI/CD pipeline.
**Product outcome:** Automated checks pass.
**Scope:** CI workflow verification.
**Files owned / allowed to modify:** `.github/workflows/`, docs
**Files not allowed to modify:** application source without coordination
**Dependencies:** T-501..T-505
**API/data contract:** None
**Implementation steps:** Verify.
**Acceptance criteria:** CI green.
**Tests required:** CI run.
**Integration requirements:** GitHub Actions.
**Definition of Done:** Documented.
**Risks / decisions required:** None.

## T-507 Logging and monitoring

**Milestone:** M5
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Add logging and monitoring.
**Product outcome:** Operational visibility.
**Scope:** Logging/monitoring config.
**Files owned / allowed to modify:** backend, CI, docs
**Files not allowed to modify:** frontend without coordination
**Dependencies:** T-502
**API/data contract:** Health endpoints
**Implementation steps:** Configure.
**Acceptance criteria:** Logs/health usable.
**Tests required:** smoke.
**Integration requirements:** Deployment.
**Definition of Done:** Documented.
**Risks / decisions required:** Tooling.

## T-508 Backup and recovery

**Milestone:** M5
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B
**Objective:** Document and test backup/recovery.
**Product outcome:** Data recoverable.
**Scope:** Backup/recovery procedures.
**Files owned / allowed to modify:** docs, scripts
**Files not allowed to modify:** application source
**Dependencies:** T-504
**API/data contract:** None
**Implementation steps:** Document and test.
**Acceptance criteria:** Restore tested.
**Tests required:** manual drill.
**Integration requirements:** Deployment.
**Definition of Done:** Documented.
**Risks / decisions required:** None.

## T-509 Security review

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Perform security review.
**Product outcome:** Security hardened.
**Scope:** Security checklist.
**Files owned / allowed to modify:** docs, backend/frontend with coordination
**Files not allowed to modify:** none (coordinated)
**Dependencies:** M4 complete
**API/data contract:** Security boundaries
**Implementation steps:** Review.
**Acceptance criteria:** Checklist pass.
**Tests required:** security tests.
**Integration requirements:** All.
**Definition of Done:** Documented.
**Risks / decisions required:** None.

## T-510 Production smoke tests

**Milestone:** M5
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer D
**Supporting developers:** A, B, C
**Objective:** Run production smoke tests.
**Product outcome:** Deployment verified.
**Scope:** Smoke test suite.
**Files owned / allowed to modify:** docs, tests
**Files not allowed to modify:** application source
**Dependencies:** T-506
**API/data contract:** Health endpoints
**Implementation steps:** Run smoke tests.
**Acceptance criteria:** Smoke tests pass.
**Tests required:** smoke.
**Integration requirements:** Deployment.
**Definition of Done:** Documented.
**Risks / decisions required:** None.
