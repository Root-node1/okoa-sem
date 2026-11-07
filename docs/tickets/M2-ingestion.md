# Milestone 2 — Academic communication ingestion

## T-201 — Communication source and source document schema

1. Ticket ID: T-201
2. Title: Communication source and source document schema
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Add migrations and repositories for ingestion source records.
7. Scope: `communication_sources`, `source_documents` tables; repository CRUD; processing status.
8. Files/directories owned or may modify: `backend/migrations/`, `backend/src/modules/ingestion/`, `backend/src/modules/submissions/` (if reused), `backend/tests/`
9. Files/directories that must not be modified: `frontend/`, AI modules without coordination
10. Dependencies: T-105
11. API/data contracts required: source status pending/processing/completed/failed
12. Implementation instructions: Follow migration conventions; FK to institutions/users; store file metadata only, not Cloudinary secrets.
13. Acceptance criteria: Migrations run up/down; repository tests pass.
14. Tests required: migration test, repository tests.
15. Definition of Done: CI migrate passes.
16. Integration notes: Blocks T-202/T-203.

## T-202 — Manual text submission endpoint

1. Ticket ID: T-202
2. Title: Manual text submission endpoint
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Accept pasted academic text and create a communication source.
7. Scope: `POST /api/v1/ingestion/text`; validation; tenant scoping; processing status.
8. Files/directories owned or may modify: `backend/src/modules/ingestion/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-201, T-105
11. API/data contracts required: `{ text, courseId? }`; response source `{ id, status }`
12. Implementation instructions: Treat text as untrusted; store raw text; queue extraction later (PROPOSED); return 202 or 201.
13. Acceptance criteria: Authenticated user can submit text; source created with status pending.
14. Tests required: API tests, validation tests.
15. Definition of Done: Contract documented in PR.
16. Integration notes: Frontend paste UI (T-206).

## T-203 — Document upload endpoint using Cloudinary

1. Ticket ID: T-203
2. Title: Document upload endpoint using Cloudinary
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Upload PDF/image/WhatsApp export via backend to Cloudinary and create source document.
7. Scope: `POST /api/v1/ingestion/upload`; file validation; signed/private access.
8. Files/directories owned or may modify: `backend/src/modules/ingestion/`, `backend/src/services/cloudinaryService.js`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-201, cloudinary foundation
11. API/data contracts required: multipart upload; max size 10MB; allowed MIME types; response source/document ids
12. Implementation instructions: Reuse `validateUploadInput` and `uploadAcademicFile`; never expose Cloudinary secrets; store publicId and metadata only.
13. Acceptance criteria: Supported files upload; unsupported rejected with 422; unauthenticated rejected.
14. Tests required: upload validation tests, service tests.
15. Definition of Done: Tests pass in CI.
16. Integration notes: Frontend upload UI (T-206).

## T-204 — Ingestion status and failure handling

1. Ticket ID: T-204
2. Title: Ingestion status and failure handling
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 2 — Backend Engineer
6. Objective: Expose processing status and failure reasons for sources.
7. Scope: `GET /api/v1/ingestion/:id`; status transitions; retry endpoint (PROPOSED).
8. Files/directories owned or may modify: `backend/src/modules/ingestion/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-201, T-202
11. API/data contracts required: status pending/processing/completed/failed; error reason
12. Implementation instructions: Do not block ingestion on AI; status visible; idempotent reads.
13. Acceptance criteria: Status retrievable; failed source shows reason.
14. Tests required: API tests.
15. Definition of Done: Contract documented.
16. Integration notes: Frontend status UI (T-206).

## T-205 — WhatsApp exported chat ingestion

1. Ticket ID: T-205
2. Title: WhatsApp exported chat ingestion
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer (parsing) with Dev 2 (storage)
6. Objective: Parse WhatsApp export files into source text for extraction.
7. Scope: File upload reuse; parser for `.txt` export; metadata capture.
8. Files/directories owned or may modify: `backend/src/modules/ingestion/` (parser), `backend/src/modules/extraction/` (input), `backend/tests/`
9. Files/directories that must not be modified: `frontend/` except upload UI
10. Dependencies: T-203, T-201
11. API/data contracts required: source type `whatsapp_export`; no live WhatsApp integration
12. Implementation instructions: Treat export as untrusted; no unrestricted access to personal chats; manual export only.
13. Acceptance criteria: Export file accepted and text extracted.
14. Tests required: parser unit tests.
15. Definition of Done: Tests pass.
16. Integration notes: Aligns with approved WhatsApp ingestion policy.

## T-206 — Frontend ingestion UI

1. Ticket ID: T-206
2. Title: Frontend ingestion UI
3. Priority: High
4. Status: NOT STARTED
5. Suggested owner: Dev 1 — Frontend Engineer
6. Objective: Build paste/upload UI and status display.
7. Scope: Text paste form, file upload, status badge, error handling.
8. Files/directories owned or may modify: `frontend/src/pages/`, `frontend/src/components/`, `frontend/src/services/api.ts`, `frontend/src/types/index.ts`
9. Files/directories that must not be modified: `backend/`
10. Dependencies: T-202, T-203, T-204, T-106
11. API/data contracts required: ingestion endpoints
12. Implementation instructions: Use credentials include; show processing states; no secrets.
13. Acceptance criteria: User can submit text/file and see status.
14. Tests required: manual; build passes.
15. Definition of Done: Frontend build passes.
16. Integration notes: Contract freeze with backend.

## T-207 — PDF text extraction (basic)

1. Ticket ID: T-207
2. Title: PDF text extraction (basic)
3. Priority: Medium
4. Status: NOT STARTED
5. Suggested owner: Dev 3 — AI / Agent Engineer with Dev 2
6. Objective: Extract text from PDF uploads for AI processing.
7. Scope: Text-based PDF extraction; OCR deferred.
8. Files/directories owned or may modify: `backend/src/modules/ingestion/`, `backend/src/modules/extraction/`, `backend/tests/`
9. Files/directories that must not be modified: `frontend/`
10. Dependencies: T-203
11. API/data contracts required: extracted text stored on source document
12. Implementation instructions: Start with PDF text extraction; OCR is PROPOSED/future; handle failures gracefully.
13. Acceptance criteria: Text PDF yields extracted text; scanned PDF returns failure status without crash.
14. Tests required: unit/integration tests.
15. Definition of Done: Tests pass.
16. Integration notes: Informs extraction pipeline.
