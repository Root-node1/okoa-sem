# Implementation Plan — Okoa Sem

Status: Proposed
Related: [Implementation Tasks](./IMPLEMENTATION_TASKS.md), [Team Workflow](./TEAM_WORKFLOW.md), [Deployment](./DEPLOYMENT.md)

## M0 — Foundation

**Objective:** Repository, tooling, CI, basic deploy.
**Tasks:** repo scaffold, lint/typecheck, env config, DB connection, CI pipeline, deploy hello-world.
**Ownership:** DevOps/QA (R), Product Lead (A), all contributors.
**Deliverables:** running app, CI green, deploy.
**Acceptance:** `npm run dev`, `npm run build`, CI pass.
**Tests:** smoke.
**DoD:** documented setup.

## M1 — Identity and academic setup

**Objective:** Auth, profiles, institution context, courses, enrolments.
**Tasks:** auth flows, RBAC, institution CRUD (admin), course/offering, enrolment.
**Ownership:** Backend (R/A domain), Frontend (R UI), DevOps (CI).
**Dependencies:** M0.
**Acceptance:** user can register and enrol in courses.
**Tests:** auth, permission, tenant isolation.

## M2 — Information ingestion

**Objective:** Text paste, file upload, storage, source records, processing status.
**Tasks:** ingestion endpoints, storage adapter, communication source/document, status UI.
**Ownership:** Backend (R), Frontend (R), DevOps (storage).
**Dependencies:** M1.
**Acceptance:** paste/upload creates source with status.
**Tests:** upload validation, storage.

## M3 — AI extraction

**Objective:** Structured extraction, validation, course resolution, pending claims.
**Tasks:** provider abstraction, prompts, extraction job, Zod validation, claim persistence, review UI.
**Ownership:** AI (R), Backend (R), Frontend (R).
**Dependencies:** M2.
**Acceptance:** extracted claims visible and reviewable.
**Tests:** extraction eval, validation.

## M4 — Academic records

**Objective:** Events, assignments, verification, provenance, change history.
**Tasks:** event/assignment CRUD, verify/reject, provenance links, audit.
**Ownership:** Backend (R/A), Frontend (R), AI (conflict support).
**Dependencies:** M3.
**Acceptance:** verified claim creates event; calendar updates.
**Tests:** lifecycle, permissions.

## M5 — Student workspace

**Objective:** Dashboard, calendar, course workspaces, inbox.
**Tasks:** dashboard, calendar view, workspace pages, inbox.
**Ownership:** Frontend (R/A), Backend (API), Design (UX).
**Dependencies:** M4.
**Acceptance:** student sees events/deadlines and sources.
**Tests:** E2E critical journey.

## M6 — Intelligent coordination

**Objective:** Conflict detection, deadline monitoring, reminders, assistant.
**Tasks:** conflict detection, reminder scheduler, assistant endpoint + UI.
**Ownership:** AI (R), Backend (R), Frontend (R).
**Dependencies:** M4, M5.
**Acceptance:** conflicts shown; reminders scheduled; assistant answers with citations.
**Tests:** conflict scenarios, reminder jobs.

## M7 — Quality and release

**Objective:** Notifications, permissions hardening, security, accessibility, deploy verification.
**Tasks:** notifications, security review, a11y fixes, performance, release checklist.
**Ownership:** DevOps/QA (R/A), all.
**Dependencies:** M6.
**Acceptance:** release checklist pass; demo ready.
**Tests:** E2E, a11y, perf.

## Sequencing notes

- M0-M2 can have frontend/backend parallel.
- AI starts prompt design in M2 using sample data.
- Do not start M6 before M4 stable.
