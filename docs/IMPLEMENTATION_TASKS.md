# Implementation Task Backlog — Okoa Sem

Status: Proposed
Owner legend: PL=Product Lead, FE=Frontend, BE=Backend, AI=AI/Agent, DO=DevOps/QA, DX=Design/Integration (if 6th)

## M0 Foundation

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-001 | M0 | Initialize Next.js TS app with App Router | DO | FE | - | High | S | app | build passes | smoke |
| T-002 | M0 | Configure ESLint/Prettier/TS strict | DO | all | T-001 | High | S | tooling | lint passes | - |
| T-003 | M0 | Env config + `.env.example` | DO | BE | T-001 | High | S | config | app boots | - |
| T-004 | M0 | CI pipeline (lint,typecheck,test,build) | DO | all | T-002 | High | M | ci | PR checks green | - |
| T-005 | M0 | DB connection + migration tool | BE | DO | T-003 | High | M | db | migrate up/down | migration |
| T-006 | M0 | Basic deploy hello-world | DO | PL | T-004 | Medium | M | deploy | URL responds | smoke |
| T-007 | M0 | Shared contracts package setup | BE | FE | T-001 | High | S | contracts | types compile | - |

## M1 Identity

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-101 | M1 | Auth module (register/login/logout/me) | BE | FE | T-005 | High | M | auth | auth flows work | API |
| T-102 | M1 | RBAC middleware + permission helpers | BE | - | T-101 | High | M | auth | roles enforced | unit |
| T-103 | M1 | Tenant isolation helpers | BE | - | T-102 | High | M | auth/db | cross-tenant denied | integration |
| T-104 | M1 | Institution admin CRUD | BE | FE | T-101 | Medium | M | institutions | admin manages | API |
| T-105 | M1 | Course & offering management | BE | FE | T-104 | High | M | academic | CRUD works | API |
| T-106 | M1 | Enrolment flows | BE | FE | T-105 | High | M | academic | student enrols | E2E |
| T-107 | M1 | Auth screens UI | FE | DX | T-101 | High | M | ui | login/register | E2E |
| T-108 | M1 | Course selection UI | FE | - | T-106 | High | M | ui | select courses | E2E |

## M2 Ingestion

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-201 | M2 | Storage adapter (upload/download/signed URL) | BE | DO | T-003 | High | M | storage | upload works | integration |
| T-202 | M2 | Ingestion text endpoint | BE | - | T-103 | High | S | ingestion | source created | API |
| T-203 | M2 | Ingestion upload endpoint | BE | - | T-201 | High | M | ingestion | file stored | API |
| T-204 | M2 | CommunicationSource/SourceDocument models + migration | BE | - | T-005 | High | M | db | migrate | migration |
| T-205 | M2 | Processing status tracking | BE | FE | T-204 | Medium | S | ingestion | status visible | API |
| T-206 | M2 | Paste/upload UI | FE | - | T-202,T-203 | High | M | ui | submit info | E2E |
| T-207 | M2 | OCR/text extraction for PDF/image (basic) | AI | BE | T-201 | Medium | M | ingestion | text extracted | integration |

## M3 AI extraction

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-301 | M3 | AI provider abstraction + mock | AI | BE | T-003 | High | M | ai | swap provider | unit |
| T-302 | M3 | Extraction prompt v1 + schema | AI | - | T-301 | High | M | ai/prompts | valid JSON | eval |
| T-303 | M3 | Extraction job (async) | BE/AI | DO | T-204,T-302 | High | M | jobs | claims created | integration |
| T-304 | M3 | Zod validation + retry | AI | BE | T-303 | High | S | ai | invalid rejected | unit |
| T-305 | M3 | Course resolution logic | AI | BE | T-303 | High | M | ai | course mapped | unit |
| T-306 | M3 | Pending claims API | BE | - | T-303 | High | S | claims | list/get | API |
| T-307 | M3 | Claim review UI (approve/reject) | FE | - | T-306 | High | M | ui | review works | E2E |
| T-308 | M3 | Eval dataset v1 | AI | - | T-302 | Medium | M | evals | metrics baseline | eval |

## M4 Academic records

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-401 | M4 | AcademicEvent model + CRUD | BE | - | T-306 | High | M | events | CRUD works | API |
| T-402 | M4 | Verification endpoints | BE | - | T-401 | High | M | events | verify/reject | API |
| T-403 | M4 | Claim approval creates event | BE/AI | - | T-402 | High | M | events/claims | event created | integration |
| T-404 | M4 | Assignment model + CRUD | BE | - | T-401 | High | M | assignments | CRUD works | API |
| T-405 | M4 | Submission upload + status | BE/FE | - | T-404 | Medium | M | submissions | submit works | E2E |
| T-406 | M4 | Provenance + audit logging | BE | - | T-402 | High | M | audit | audit entries | integration |
| T-407 | M4 | Change history/versioning | BE | - | T-406 | Medium | M | events | history view | API |
| T-408 | M4 | Conflict detection (basic) | AI | BE | T-403 | High | M | ai | conflicts flagged | unit |

## M5 Student workspace

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-501 | M5 | Dashboard API + UI | FE | BE | T-401 | High | M | ui/api | attention list | E2E |
| T-502 | M5 | Calendar API + UI | FE | BE | T-401 | High | M | ui/api | events shown | E2E |
| T-503 | M5 | Course workspace pages | FE | BE | T-404 | High | M | ui | tabs work | E2E |
| T-504 | M5 | Academic inbox UI | FE | BE | T-306 | High | M | ui | claims/notifications | E2E |
| T-505 | M5 | Empty/loading/error states | FE | DX | T-501 | Medium | S | ui | states present | - |

## M6 Intelligent coordination

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-601 | M6 | Deadline monitoring job | BE | AI | T-401 | Medium | M | jobs | detects overdue | integration |
| T-602 | M6 | Reminder scheduling | BE | DO | T-601 | High | M | reminders | reminders created | integration |
| T-603 | M6 | Notification creation + UI | FE/BE | - | T-602 | High | M | notifications | notify users | E2E |
| T-604 | M6 | Academic assistant endpoint | AI | BE | T-401 | High | M | assistant | answers cite sources | API |
| T-605 | M6 | Assistant UI | FE | - | T-604 | High | M | ui | chat works | E2E |
| T-606 | M6 | Daily/weekly briefing (basic) | AI | - | T-604 | Medium | M | assistant | briefing generated | manual |

## M7 Quality/release

| ID | Milestone | Description | Owner (A) | Contributors | Deps | Priority | Complexity | Modules | Acceptance | Tests |
|---|---|---|---|---|---|---|---|---|---|---|
| T-701 | M7 | Security review + hardening | DO | all | M6 | High | M | security | checklist pass | security |
| T-702 | M7 | Accessibility audit fixes | FE | DX | M5 | High | M | ui | WCAG AA | a11y |
| T-703 | M7 | Performance checks | DO | FE/BE | M6 | Medium | M | perf | targets met | perf |
| T-704 | M7 | Release verification + demo script | DO | PL/DX | M7 | High | S | docs | demo runs | manual |
| T-705 | M7 | Deployment verification | DO | PL | T-006 | High | M | deploy | prod healthy | smoke |
