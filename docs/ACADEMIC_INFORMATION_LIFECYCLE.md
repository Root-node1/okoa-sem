# Academic Information Lifecycle — Okoa Sem

Status: Proposed
Related: [Data Model](./DATA_MODEL.md), [AI Architecture](./AI_ARCHITECTURE.md)

## 1. Lifecycle stages

1. **Ingest** — user submits text/file/export.
2. **Store source** — create `CommunicationSource` + `SourceDocument`; store file; extract text/OCR.
3. **Extract** — AI produces `ExtractedClaim`(s) (pending).
4. **Validate** — backend Zod validation; reject malformed.
5. **Resolve context** — map course hints to `CourseOffering`; resolve dates; handle ambiguity.
6. **Detect duplicates/conflicts** — flag candidates.
7. **Verify** — authorised user approves/rejects/merges.
8. **Create/update academic record** — verified claim creates/updates `AcademicEvent`/`Assignment`.
9. **Notify** — create notifications for affected users.
10. **Schedule reminders** — create `Reminder` records/jobs.
11. **Audit** — log all actions.

## 2. State machines

### ExtractedClaim status

`pending` -> `approved` | `rejected` | `merged` | `failed`

### AcademicEvent status

`draft` -> `verified` -> `superseded` | `cancelled`

## 3. Provenance preservation

- `AcademicEvent.source_claim_id` links to originating claim.
- Claims retain evidence snippet and source document.
- Updates create new event version or supersede; old version retained via audit.

## 4. Override rules

- A class representative's message must not silently override a lecturer-confirmed deadline.
- If a new claim conflicts with a verified event, mark conflict; require authorised resolution.
- Only `lecturer`/`institution_admin` can verify deadlines/exams; `class_rep` can submit claims.

## 5. Historical values

- AuditLog stores before/after for updates.
- Superseded events remain queryable for history.
- Notifications reference event version.

## 6. Example flow

Student pastes WhatsApp message: "CAT 2 on Friday 10am Room 204 for ICS 2207".
- Ingest text -> CommunicationSource (pending).
- Extract -> claim (type cat, confidence 0.86, courseHint ICS 2207).
- Resolve context -> CourseOffering.
- Detect duplicates -> none.
- Verify -> lecturer confirms.
- Create AcademicEvent (verified).
- Notify enrolled students.
- Schedule reminder (24h before).
- Audit log entries.
