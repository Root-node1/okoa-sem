# Developer Tickets — Okoa Sem

Single source of truth for implementation tickets. All work must reference a ticket ID.

## Team ownership

- Developer A — Student API Routes
- Developer B — Extraction and Processing Layers
- Developer C — Frontend UI End-to-End
- Developer D — Backend Foundation and Deployment (accountable owner of shared backend, migrations, contracts, CI/CD, deployment)

## Status flow

`BACKLOG → READY → IN PROGRESS → REVIEW → TESTING → DONE`

Also allow `BLOCKED` for tickets awaiting dependencies or decisions. A ticket cannot enter READY until dependencies and contracts are satisfied.

## Ticket format

Every ticket contains: Ticket ID, Title, Milestone, Priority, Status, Accountable owner, Supporting developers, Objective, Product outcome, Scope, Files owned/allowed to modify, Files not allowed to modify, Dependencies, API/data contract, Implementation steps, Acceptance criteria, Tests required, Integration requirements, Definition of Done, Risks/decisions required.

## Ownership matrix

| Area | Accountable owner |
|---|---|
| Student API routes/controllers/tests | Developer A |
| Extraction and processing implementation | Developer B |
| Frontend application | Developer C |
| Shared backend foundation | Developer D |
| Database migrations | Developer D |
| Shared backend contracts | Developer D, with input from A and B |
| CI/CD and deployment | Developer D |
| Product acceptance criteria | Team agreement |

## Collision-prevention rules

1. One accountable owner per ticket.
2. One owner for every shared file.
3. No overlapping implementation tickets without explicit coordination.
4. No independent database migrations from A or B.
5. No independent changes to authentication from A, B or C.
6. Frontend does not invent API contracts.
7. Extraction does not write directly to authoritative academic records.
8. No student API endpoint exposes unverified information as official.
9. Shared contracts are agreed before parallel implementation.
10. Every PR references a ticket ID.
11. Every implementation change goes through review.
12. No normal direct pushes to `main`.
13. Keep PRs small and focused.
14. Developers communicate before changing shared interfaces.
15. Each developer initially works on no more than one active implementation ticket.

## Milestone files

- [M0 — Shared contracts and integration foundation](./M0-contracts.md)
- [M1 — Student API](./M1-student-api.md)
- [M2 — Extraction and processing](./M2-extraction.md)
- [M3 — Frontend end-to-end](./M3-frontend.md)
- [M4 — Shared backend and integration](./M4-shared-backend.md)
- [M5 — Deployment and production readiness](./M5-deployment.md)

## Dependency graph

- Developer D establishes shared contracts and integration boundaries first.
- Developer A can start student API work once relevant data and authorization contracts are agreed.
- Developer B can start schema design and isolated parsing work in parallel, but must agree source/claim/processing contracts before persistence integration.
- Developer C can start UI shell, navigation, reusable components and page structure immediately; integrates with actual endpoints as they become available.

Integration checkpoints:
1. API contract agreement.
2. Source/extraction contract agreement.
3. Shared persistence integration.
4. Student API integration.
5. Frontend integration.
6. End-to-end workflow verification.
7. Deployment verification.

## Implemented features excluded from new tickets

Already implemented and verified: Express app, health endpoints, DB pool, migrations 001/002, auth module and tests, Cloudinary foundation and tests, React/Vite/Tailwind/Router scaffold, GitHub Actions CI. Do not re-ticket these.

## Ticket counts by milestone

| Milestone | Tickets | Accountable owner |
|---|---|---|
| M0 | 6 | Developer D |
| M1 | 9 | Developer A |
| M2 | 13 | Developer B |
| M3 | 16 | Developer C |
| M4 | 11 | Developer D |
| M5 | 10 | Developer D |
