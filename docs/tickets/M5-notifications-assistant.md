# Milestone 5 — Notifications and assistant

## T-501 — Reminders scheduling

1. Ticket ID: T-501
2. Title: Reminders scheduling
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Create and schedule reminders for academic events.
7. Scope: Reminder table, CRUD, scheduling logic.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/reminders/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-401, background runner decision
11. API/data contracts required: `/api/v1/reminders`; status scheduled/sent/cancelled/failed
12. Implementation instructions: Background processing runner is PROPOSED; implement with chosen runner; workers reuse backend services.
13. Acceptance criteria: Reminders created and scheduled.
14. Tests required: integration tests.
15. Definition of Done: Tests pass.
16. Integration notes: Notifications (T-503).

## T-502 — Notification creation and API

1. Ticket ID: T-502
2. Title: Notification creation and API
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Create notifications for affected users.
7. Scope: Notification table, list/read/read-all endpoints.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/notifications/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-403, T-501
11. API/data contracts required: `/api/v1/notifications`
12. Implementation instructions: Permission-filtered; no PII in logs.
13. Acceptance criteria: Notifications created on event changes.
14. Tests required: API tests.
15. Definition of Done: Tests pass.
16. Integration notes: Frontend inbox (T-504).

## T-503 — Notification preferences

1. Ticket ID: T-503
2. Title: Notification preferences
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer with Dev 1
6. Objective: Allow users to manage notification preferences.
7. Scope: Preference storage and endpoints.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/notifications/`, `frontend/src/pages/`
9. Files/directories that must not be modified: other backend modules without coordination
10. Dependencies: T-502
11. API/data contracts required: preferences payload
12. Implementation instructions: Defaults sensible; opt-out respected.
13. Acceptance criteria: User can update preferences.
14. Tests required: API tests; build passes.
15. Definition of Done: CI passes.
16. Integration notes: Frontend settings.

## T-504 — Academic assistant endpoint

1. Ticket ID: T-504
2. Title: Academic assistant endpoint
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer with Dev 2
6. Objective: Implement assistant query endpoint with strict permissions.
7. Scope: `POST /api/v1/assistant/query`; retrieval; citations; tool boundaries.
8. Files/directories owned or may modify: `backend/src/modules/assistant/`, `backend/src/modules/audit/` (logging), `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-401, T-301, T-105
11. API/data contracts required: assistant response with citations; unverified caveats
12. Implementation instructions: Assistant cannot modify records or verify claims; tools call backend services; permission-filtered by enrolments; log AgentRun.
13. Acceptance criteria: Answers cite stored records; unauthorized data not returned.
14. Tests required: API + permission tests.
15. Definition of Done: Tests pass.
16. Integration notes: Frontend assistant UI (T-505).

## T-505 — Academic assistant UI

1. Ticket ID: T-505
2. Title: Academic assistant UI
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: Build chat UI for assistant.
7. Scope: Chat panel, suggested prompts, citations, unverified caveat.
8. Files/directories owned or may modify: `frontend/src/pages/`, `frontend/src/components/`, `frontend/src/services/api.ts`, `frontend/src/types/index.ts`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: T-504, T-106
11. API/data contracts required: assistant endpoint
12. Implementation instructions: Display only; no domain logic.
13. Acceptance criteria: Chat works; citations shown.
14. Tests required: manual; build passes.
15. Definition of Done: Frontend build passes.
16. Integration notes: Contract freeze.

## T-506 — Daily/weekly briefing (basic)

1. Ticket ID: T-506
2. Title: Daily/weekly briefing (basic)
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer
6. Objective: Generate periodic academic briefings.
7. Scope: Scheduled job using assistant tools; notification delivery.
8. Files/directories owned or may modify: `backend/src/modules/assistant/`, `backend/src/modules/notifications/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-504, T-502
11. API/data contracts required: briefing content
12. Implementation instructions: Optional; manual trigger acceptable for MVP.
13. Acceptance criteria: Briefing generated.
14. Tests required: manual/integration.
15. Definition of Done: Documented.
16. Integration notes: Dev 4 scheduling.
