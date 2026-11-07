# Okoa Sem Documentation

## Authoritative documents

- [System design](./system_design.md) — product, architecture, domain modules, lifecycle, entities, API, security, status.
- [Student API contracts](./student-api-contracts.md) — proposed student-facing API contracts.
- [Source and extraction contracts](./source-extraction-contracts.md) — proposed source, claim and extraction contracts.
- [Frontend API contracts](./frontend-api-contracts.md) — proposed frontend integration contracts.
- [Authorization boundaries](./authorization-boundaries.md) — proposed authorization model.
- [Integration test strategy](./integration-test-strategy.md) — proposed testing strategy.
- [Deployment readiness](./deployment-readiness.md) — deployment and operations readiness.
- [Developer tickets](./tickets/README.md) — ticket index, ownership, workflow, dependencies.

## Implementation status legend

- **IMPLEMENTED**: exists in code and verified.
- **APPROVED**: agreed but not coded.
- **PROPOSED**: candidate requiring a decision.
- **NOT YET IMPLEMENTED**: planned but not started.

## Retained assets

- PostgreSQL migrations: `backend/migrations/`
- Postman collection: `docs/postman/`
- CI workflow: `.github/workflows/ci.yml`
