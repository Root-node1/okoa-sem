# Integration Contracts — Okoa Sem

Status: Proposed

## 1. Frontend ↔ Backend

- API base `/api/v1`.
- Auth via httpOnly cookie.
- Error envelope as in API design.
- Pagination `page/pageSize`.
- Event types enum shared.
- Verification states enum shared.
- Processing states: `pending`, `processing`, `completed`, `failed`.

## 2. Backend ↔ AI

- Extraction request schema: `{ sourceText, metadata, knownCourses[] }`.
- Extraction response schema: `ExtractedClaim[]`.
- Confidence: number 0-1.
- Source identifiers: `communicationSourceId`, `sourceDocumentId`.
- Validation errors returned as structured errors.
- Pending claim lifecycle shared.
- Conflict detection input/output schemas in contracts.

## 3. Backend ↔ DevOps

- Env vars documented in `.env.example`.
- Migration command.
- Health endpoint.
- Worker process.
- Storage config.
- Logging format.

## 4. Frontend ↔ Design/Product

- Route map in DESIGN.md.
- Component inventory.
- Design tokens.
- Accessibility requirements.
- Acceptance criteria per screen.

## 5. Shared enums (proposed)

Event types: `cat, exam, assignment, lecture, meeting, deadline, venue_change, announcement, material, instruction`.
Claim status: `pending, approved, rejected, merged, failed`.
Event status: `draft, verified, superseded, cancelled`.
Roles: `student, lecturer, class_rep, institution_admin, system`.
Processing status: `pending, processing, completed, failed`.
