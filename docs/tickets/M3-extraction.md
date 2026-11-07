# Milestone 3 — AI extraction and verification

## T-301 — AI provider abstraction

1. Ticket ID: T-301
2. Title: AI provider abstraction
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer
6. Objective: Create provider interface and mock implementation.
7. Scope: Interface with extract/classify/answer/embed; config via env; retry/timeout.
8. Files/directories owned or may modify: `backend/src/modules/extraction/` or `backend/src/services/ai/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`, DB migrations without Dev 2
10. Dependencies: foundation env
11. API/data contracts required: provider config env vars
12. Implementation instructions: Do not add ORM; keep abstraction thin; mock provider for tests; no direct DB access.
13. Acceptance criteria: Provider swappable via env; mock works in tests.
14. Tests required: unit tests.
15. Definition of Done: Tests pass.
16. Integration notes: Coordinates with Dev 2 on shared schemas.

## T-302 — Structured extraction Zod schema

1. Ticket ID: T-302
2. Title: Structured extraction Zod schema
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer with Dev 2
6. Objective: Define and validate `ExtractedClaim` schema.
7. Scope: Zod schema for claim types, dates, course hint, confidence, evidence snippet.
8. Files/directories owned or may modify: `backend/src/modules/extraction/`, `backend/src/modules/claims/`, shared contract location agreed
9. Files/directories that must not be modified: `frontend/` types without coordination
10. Dependencies: T-301
11. API/data contracts required: claim types cat/exam/assignment/lecture/meeting/deadline/venue_change/announcement/material/instruction; confidence 0-1
12. Implementation instructions: Agree schema with backend before coding; frontend types must mirror.
13. Acceptance criteria: Invalid AI output rejected; valid output typed.
14. Tests required: schema unit tests.
15. Definition of Done: Schema documented in ticket/PR.
16. Integration notes: Frontend review UI (T-307) depends.

## T-303 — Extraction job pipeline

1. Ticket ID: T-303
2. Title: Extraction job pipeline
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer with Dev 3
6. Objective: Run extraction asynchronously on ingestion sources.
7. Scope: Job runner integration (PROPOSED choice), claim creation, status updates.
8. Files/directories owned or may modify: `backend/src/modules/extraction/`, `backend/src/modules/ingestion/`, `backend/migrations/` (claims table), `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-201, T-301, T-302
11. API/data contracts required: extracted claims table; processing states
12. Implementation instructions: Background processing runner choice is PROPOSED; start with in-process async or DB polling if needed; must not bypass validation/permissions.
13. Acceptance criteria: Submitting text creates pending claims.
14. Tests required: integration tests.
15. Definition of Done: CI passes.
16. Integration notes: Dev 4 provides runner decision.

## T-304 — Extraction validation and retry

1. Ticket ID: T-304
2. Title: Extraction validation and retry
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer
6. Objective: Validate AI output with Zod and retry once on failure.
7. Scope: Correction prompt retry; mark claim failed with reason.
8. Files/directories owned or may modify: `backend/src/modules/extraction/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-303
11. API/data contracts required: claim status failed + reason
12. Implementation instructions: Never persist unvalidated payloads as events.
13. Acceptance criteria: Malformed output rejected; failed claim recorded.
14. Tests required: unit tests.
15. Definition of Done: Tests pass.
16. Integration notes: Observability (T-606).

## T-305 — Course resolution from extracted claims

1. Ticket ID: T-305
2. Title: Course resolution from extracted claims
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer with Dev 2
6. Objective: Map course hints to course offerings/enrolments.
7. Scope: Heuristic matching; ambiguous result flagged.
8. Files/directories owned or may modify: `backend/src/modules/extraction/`, `backend/src/modules/courses/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-303, T-101, T-103
11. API/data contracts required: claim courseOfferingId nullable
12. Implementation instructions: Do not silently resolve ambiguous courses; flag for review.
13. Acceptance criteria: Known course resolved; unknown/ambiguous flagged.
14. Tests required: unit tests.
15. Definition of Done: Tests pass.
16. Integration notes: Conflict detection depends.

## T-306 — Pending claims API

1. Ticket ID: T-306
2. Title: Pending claims API
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: List/get extracted claims with filters.
7. Scope: `GET /api/v1/claims`, `GET /api/v1/claims/:id`; tenant/course scoping.
8. Files/directories owned or may modify: `backend/src/modules/claims/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-303, T-105
11. API/data contracts required: claim status filters; pagination proposed
12. Implementation instructions: Enforce authorization; students see only permitted claims.
13. Acceptance criteria: Claims list filtered by status/course.
14. Tests required: API tests.
15. Definition of Done: Contract documented.
16. Integration notes: Frontend review UI (T-307).

## T-307 — Claim review UI

1. Ticket ID: T-307
2. Title: Claim review UI
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: UI to review, approve, reject extracted claims.
7. Scope: Claim list, detail, approve/reject actions, unverified labels.
8. Files/directories owned or may modify: `frontend/src/pages/`, `frontend/src/components/`, `frontend/src/services/api.ts`, `frontend/src/types/index.ts`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: T-306, T-106
11. API/data contracts required: claims endpoints + verification endpoints
12. Implementation instructions: Display confidence and provenance; no silent actions.
13. Acceptance criteria: User can review claim and trigger approve/reject.
14. Tests required: manual; build passes.
15. Definition of Done: Frontend build passes.
16. Integration notes: Backend verification endpoints (T-402).

## T-308 — Duplicate detection

1. Ticket ID: T-308
2. Title: Duplicate detection
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer
6. Objective: Detect duplicate claims and flag for resolution.
7. Scope: Heuristic + embedding similarity; never auto-merge deadlines.
8. Files/directories owned or may modify: `backend/src/modules/extraction/`, `backend/src/modules/claims/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-303, T-305
11. API/data contracts required: duplicate candidate references
12. Implementation instructions: Flag only; human resolves.
13. Acceptance criteria: Duplicate candidate flagged.
14. Tests required: unit tests.
15. Definition of Done: Tests pass.
16. Integration notes: Conflict detection (T-309).

## T-309 — Conflict detection

1. Ticket ID: T-309
2. Title: Conflict detection
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer
6. Objective: Detect conflicting academic information and surface it.
7. Scope: Differing dates/times/venues for same course+event type.
8. Files/directories owned or may modify: `backend/src/modules/extraction/`, `backend/src/modules/claims/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-305, T-308
11. API/data contracts required: conflict status and references
12. Implementation instructions: Mark claims/events as conflict; require authorized resolution.
13. Acceptance criteria: Conflicting claims flagged with references.
14. Tests required: unit tests.
15. Definition of Done: Tests pass.
16. Integration notes: UI surfaces conflicts (T-408).
