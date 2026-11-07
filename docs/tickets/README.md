# Developer Tickets — Okoa Sem

Single source of truth for implementation tickets. All work must reference a ticket ID.

## Status legend

- `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `REVIEW`, `TESTING`, `DONE`

## Kanban workflow

`BACKLOG → READY → IN PROGRESS → REVIEW → TESTING → DONE`

Add `BLOCKED` for tickets awaiting dependencies or decisions.

## Ticket format

Every ticket contains: Ticket ID, Title, Priority, Status, Suggested owner, Objective, Scope, Files/directories owned or may modify, Files/directories that must not be modified, Dependencies, API/data contracts required, Implementation instructions, Acceptance criteria, Tests required, Definition of Done, Integration notes.

## Owners

- Dev 1 — Frontend Engineer: `frontend/`
- Dev 2 — Backend Engineer: `backend/`
- Dev 3 — AI / Agent Engineer: AI provider, extraction, schemas, confidence, provenance, conflict detection, assistant boundaries
- Dev 4 — DevOps Engineer: CI/CD, environments, deployment, DB operations, observability
- Dev 5 — Product Lead: requirements, priorities, acceptance criteria, coordination (no implementation tickets by default)
- Optional QA / Integration Engineer: cross-module tests, contract verification, accessibility, release verification

## Collision-prevention rules

1. Every ticket has one accountable owner.
2. A developer must not start a ticket until dependencies are satisfied.
3. Developers must not edit another developer's owned files without coordination.
4. Shared files require an explicitly identified owner.
5. Database migrations must have one accountable backend owner.
6. API contracts must be agreed between frontend and backend before parallel implementation.
7. AI extraction schemas must be agreed between AI and backend before implementation.
8. DevOps owns CI/CD and deployment configuration, but application developers must provide required build/test commands.
9. All changes go through pull requests.
10. No direct pushes to `main` during normal team development.
11. Each PR must reference its ticket ID.
12. Keep PRs small and focused.
13. Run relevant tests before requesting review.
14. Integration tickets verify that separately developed modules work together.

WIP limit: one active implementation ticket per developer initially.

## Milestone files

- [Milestone 0 — Verified foundation](./M0-foundation.md) (completed, reference only)
- [Milestone 1 — Workspace and academic structure](./M1-workspace.md)
- [Milestone 2 — Academic communication ingestion](./M2-ingestion.md)
- [Milestone 3 — AI extraction and verification](./M3-extraction.md)
- [Milestone 4 — Academic records and coordination](./M4-records.md)
- [Milestone 5 — Notifications and assistant](./M5-notifications-assistant.md)
- [Milestone 6 — Quality, security and deployment](./M6-quality-deployment.md)

## Dependency summary

- M1 backend schema/API work precedes M2 ingestion.
- M2 ingestion precedes M3 extraction.
- M3 extraction precedes M4 records.
- M4 records precede M5 notifications/assistant and M6 quality.
- M6 quality depends on M5.

## Parallel workstreams

- Dev 1 can build frontend shells against agreed contracts while Dev 2 implements backend.
- Dev 3 can design extraction schemas/prompts in parallel with Dev 2 ingestion, but must agree schemas before coding.
- Dev 4 can set up CI/env/deploy in parallel with M1.
- Dev 5 coordinates contract freezes and acceptance criteria.

## Implemented foundation (do not re-ticket)

IMPLEMENTED and verified: Express app, health endpoints, DB pool, migrations 001/002, auth module and tests, Cloudinary service and tests, React/Vite/Tailwind/Router scaffold, GitHub Actions CI.

## Ticket counts by milestone

| Milestone | Tickets | Primary owner |
|---|---|---|
| M1 | 8 | Dev 2 (backend), Dev 1 (frontend) |
| M2 | 7 | Dev 2 (backend), Dev 1 (frontend), Dev 3 (AI) |
| M3 | 9 | Dev 3 (AI), Dev 2 (backend), Dev 1 (frontend) |
| M4 | 8 | Dev 2 (backend), Dev 1 (frontend), Dev 3 (AI) |
| M5 | 6 | Dev 2/Dev 3 (backend/AI), Dev 1 (frontend) |
| M6 | 7 | Dev 4 (DevOps), all |
