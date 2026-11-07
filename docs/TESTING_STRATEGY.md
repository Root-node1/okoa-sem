# Testing Strategy — Okoa Sem

Status: Proposed

## 1. Test levels

- Unit: domain logic, validation, utilities.
- Integration: services + DB.
- API: endpoint contracts.
- Database: migrations, constraints, tenant isolation.
- AI evaluation: extraction accuracy.
- Workflow: ingestion to verification.
- Permissions: RBAC and tenant isolation.
- E2E: critical user journeys.
- Accessibility: WCAG 2.1 AA.
- Performance: key pages and APIs.

## 2. Tooling (proposed)

- Vitest/Jest for unit/integration.
- Playwright for E2E.
- Supertest or direct route testing.
- axe for accessibility.

## 3. Test scenarios (required)

- Ambiguous dates: "next Friday" resolves with term context or flagged.
- Conflicting announcements: two different CAT dates -> conflict flagged.
- Changed deadlines: updated deadline creates new version, notification.
- Duplicate messages: same paste twice -> duplicate detected.
- Rejected extractions: malformed claim rejected, no event created.
- Unverified information: unverified claims not in verified calendar.
- Unauthorised access: cross-tenant and cross-role denied.

## 4. Coverage expectations

- Domain services >=80%.
- API endpoints contract tests for all.
- Tenant isolation tests for every tenant-scoped resource.

## 5. AI evaluation

- Dataset in `evals/` (anonymised).
- Metrics tracked per prompt version.
- Regression gate in CI for prompt changes.

## 6. CI

- Run lint, typecheck, unit, integration on PR.
- E2E on main/nightly.
- Migration check.

## 7. Definition of done (testing)

- Tests added/updated for changed behaviour.
- No skipped tests without reason.
- CI green.
