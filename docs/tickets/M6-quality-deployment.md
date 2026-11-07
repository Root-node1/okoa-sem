# Milestone 6 — Quality, security and deployment

## T-601 — Tenant isolation and role-based access tests

1. Ticket ID: T-601
2. Title: Tenant isolation and role-based access tests
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Optional QA / Integration Engineer (or Dev 2)
6. Objective: Add cross-module tests for tenant and role boundaries.
7. Scope: Integration tests across resources.
8. Files/directories owned or may modify: `backend/tests/`, `frontend/` tests if added
9. Files/directories that must not be modified: application code except test fixes
10. Dependencies: M1-M4
11. API/data contracts required: all endpoints
12. Implementation instructions: Test cross-tenant and cross-role denial.
13. Acceptance criteria: Tests pass in CI.
14. Tests required: integration.
15. Definition of Done: CI green.
16. Integration notes: Blocks release.

## T-602 — Security review and hardening

1. Ticket ID: T-602
2. Title: Security review and hardening
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 4 — DevOps Engineer with all
6. Objective: Review and harden application security.
7. Scope: Headers, rate limits, upload limits, secrets, CSRF decision.
8. Files/directories owned or may modify: `backend/src/`, `.github/workflows/`, docs
9. Files/directories that must not be modified: none (coordinated)
10. Dependencies: M5
11. API/data contracts required: security boundaries in architecture
12. Implementation instructions: Use checklist; no secrets in client.
13. Acceptance criteria: Security checklist pass.
14. Tests required: security tests.
15. Definition of Done: Documented.
16. Integration notes: Release gate.

## T-603 — Accessibility review

1. Ticket ID: T-603
2. Title: Accessibility review
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer with QA
6. Objective: Achieve WCAG 2.1 AA for core flows.
7. Scope: Keyboard navigation, focus, ARIA, contrast.
8. Files/directories owned or may modify: `frontend/`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: M4/M5 frontend
11. API/data contracts required: none
12. Implementation instructions: Use axe/manual.
13. Acceptance criteria: No critical a11y issues.
14. Tests required: a11y checks.
15. Definition of Done: Documented.
16. Integration notes: Release gate.

## T-604 — Performance checks

1. Ticket ID: T-604
2. Title: Performance checks
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 4 — DevOps Engineer with Dev 1/Dev 2
6. Objective: Verify performance targets.
7. Scope: API response times, frontend build size.
8. Files/directories owned or may modify: `.github/workflows/`, docs
9. Files/directories that must not be modified: application code without coordination
10. Dependencies: M5
11. API/data contracts required: none
12. Implementation instructions: Measure key flows.
13. Acceptance criteria: Targets met or documented.
14. Tests required: perf checks.
15. Definition of Done: Documented.
16. Integration notes: Release gate.

## T-605 — Observability and logging

1. Ticket ID: T-605
2. Title: Observability and logging
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 4 — DevOps Engineer
6. Objective: Add structured logging and monitoring.
7. Scope: Request logging, error tracking, health checks.
8. Files/directories owned or may modify: `backend/src/`, `.github/workflows/`, docs
9. Files/directories that must not be modified: frontend without coordination
10. Dependencies: foundation
11. API/data contracts required: health endpoints
12. Implementation instructions: Keep request IDs; add monitoring docs.
13. Acceptance criteria: Logs and health checks usable.
14. Tests required: smoke.
15. Definition of Done: Documented.
16. Integration notes: DevOps owns.

## T-606 — Deployment configuration

1. Ticket ID: T-606
2. Title: Deployment configuration
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 4 — DevOps Engineer
6. Objective: Configure deployment for frontend/backend/db.
7. Scope: Env config, build, migrate, deploy, rollback.
8. Files/directories owned or may modify: `.github/workflows/`, `run.sh`, docs, config files
9. Files/directories that must not be modified: application code without coordination
10. Dependencies: M5, Q-001 (platform verification)
11. API/data contracts required: env vars in `.env.example`
12. Implementation instructions: Verify platform capabilities; fallback documented.
13. Acceptance criteria: Deployed app healthy.
14. Tests required: smoke.
15. Definition of Done: Documented.
16. Integration notes: Release.

## T-607 — Backup and recovery

1. Ticket ID: T-607
2. Title: Backup and recovery
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 4 — DevOps Engineer
6. Objective: Document and test backup/recovery.
7. Scope: DB backups, storage versioning, restore test.
8. Files/directories owned or may modify: docs, scripts (new operational scripts)
9. Files/directories that must not be modified: application code without coordination
10. Dependencies: T-606
11. API/data contracts required: none
12. Implementation instructions: Daily backups; restore drill.
13. Acceptance criteria: Restore tested.
14. Tests required: manual drill.
15. Definition of Done: Documented.
16. Integration notes: Release readiness.
