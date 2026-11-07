# Implementation Plan — Okoa Sem

Status: Proposed
Related: [Implementation Tasks](./IMPLEMENTATION_TASKS.md), [Team Workflow](./TEAM_WORKFLOW.md), [Deployment](./DEPLOYMENT.md)

## Architecture

- Frontend: Next.js.
- Backend: Node.js + TypeScript + Express modular monolith.
- Frontend communicates with backend via REST `/api/v1`.

## M0 — Foundation

**Objective:** Repos, tooling, CI, basic deploy.
**Tasks:** scaffold frontend and backend, lint/typecheck, env config, DB connection, CI pipeline, deploy hello-world.
**Ownership:** DevOps/QA (R), Product Lead (A), all contributors.
**Deliverables:** running apps, CI green, deploy.
**Acceptance:** `npm run dev` (both), build passes, CI pass.
**Tests:** smoke.
**DoD:** documented setup.

## M1 — Identity and academic setup

**Objective:** Auth, profiles, institution context, courses, enrolments in Node.js backend; auth screens in frontend.
**Tasks:** backend auth module + middleware, RBAC, tenant isolation, institution/course/enrolment APIs; frontend auth and course selection.
**Ownership:** Backend (R/A domain), Frontend (R UI), DevOps (CI).
**Dependencies:** M0.
**Acceptance:** user can register and enrol in courses.
**Tests:** auth, permission, tenant isolation.

## M2 — Information ingestion

**Objective:** Text paste, file upload, storage, source records, processing status.
**Tasks:** backend ingestion/storage modules, status APIs; frontend paste/upload UI.
**Ownership:** Backend (R), Frontend (R), DevOps (storage).
**Dependencies:** M1.
**Acceptance:** paste/upload creates source with status.
**Tests:** upload validation, storage.

## M3 — AI extraction

**Objective:** Structured extraction, validation, course resolution, pending claims.
**Tasks:** backend extraction module + queue jobs, provider abstraction, prompts, Zod validation; frontend review UI.
**Ownership:** AI (R), Backend (R), Frontend (R).
**Dependencies:** M2.
**Acceptance:** extracted claims visible and reviewable.
**Tests:** extraction eval, validation.

## M4 — Academic records

**Objective:** Events, assignments, verification, provenance, change history.
**Tasks:** backend events/assignments modules, verify/reject, audit; frontend views.
**Ownership:** Backend (R/A), Frontend (R), AI (conflict support).
**Dependencies:** M3.
**Acceptance:** verified claim creates event; calendar updates.
**Tests:** lifecycle, permissions.

## M5 — Student workspace

**Objective:** Dashboard, calendar, course workspaces, inbox.
**Tasks:** backend APIs; frontend dashboard, calendar, workspace pages, inbox.
**Ownership:** Frontend (R/A), Backend (API), Design (UX).
**Dependencies:** M4.
**Acceptance:** student sees events/deadlines and sources.
**Tests:** E2E critical journey.

## M6 — Intelligent coordination

**Objective:** Conflict detection, deadline monitoring, reminders, assistant.
**Tasks:** backend jobs + assistant module; frontend assistant UI.
**Ownership:** AI (R), Backend (R), Frontend (R).
**Dependencies:** M4, M5.
**Acceptance:** conflicts shown; reminders scheduled; assistant answers with citations.
**Tests:** conflict scenarios, reminder jobs.

## M7 — Quality and release

**Objective:** Notifications, permissions hardening, security, accessibility, deploy verification.
**Tasks:** backend/frontend hardening, security review, a11y fixes, performance, release checklist.
**Ownership:** DevOps/QA (R/A), all.
**Dependencies:** M6.
**Acceptance:** release checklist pass; demo ready.
**Tests:** E2E, a11y, perf.

## Sequencing notes

- M0-M2 can have frontend/backend parallel.
- AI starts prompt design in M2 using sample data.
- Do not start M6 before M4 stable.
- Backend owns all academic business logic; frontend never implements domain rules.

## Known limitations (current foundation)

- Real authentication is not implemented.
- Domain modules are still placeholders.
- Background workers are not implemented.
- RumptyCloud deployment has not been verified.
- PostgreSQL testing has been performed locally only.
