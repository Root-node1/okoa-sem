# Integration Test Strategy — Okoa Sem

Status: PROPOSED
Owner: Developer D
Related: [System design](./system_design.md), [Tickets](./tickets/README.md)

## 1. Test levels

- Unit: validation, services, utilities.
- Integration: services with PostgreSQL.
- API: endpoint contracts and authorization.
- Migration: schema and constraints.
- Extraction: pipeline and provenance.
- Frontend: component and integration tests.
- End-to-end: critical workflows.

## 2. Tooling

- Backend: Node.js test runner and Supertest.
- Frontend: Vite build and future test runner.
- Database: PostgreSQL test database via `DATABASE_URL`.
- CI: GitHub Actions.

## 3. Required scenarios

- Unauthorized source submission rejected.
- Unauthorized course access rejected.
- Invalid file type rejected.
- Oversized file rejected.
- Duplicate source handling.
- Storage failure handling.
- Job creation and retry.
- Text extraction failure.
- Malformed AI output rejected.
- Provenance preserved.
- Claims cannot approve themselves.
- Students cannot approve claims.
- Unauthorized lecturer cannot approve another course's claim.
- Approved claims create records only once.
- Cross-workspace and cross-course access rejected.
- Confirmed-only information returned to students.

## 4. Database testing

- Use a dedicated test database.
- Run migrations before tests.
- Reset data between tests.
- Test constraints and tenant isolation.

## 5. CI expectations

- Run lint/build where configured.
- Run backend migrations and tests.
- Run frontend build.
- Fail on test failures.

## 6. Ownership

- Developer D owns test infrastructure and shared integration tests.
- Developers A, B and C own module-specific tests.
