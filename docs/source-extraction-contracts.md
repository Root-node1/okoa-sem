# Source and Extraction Contracts — Okoa Sem

Status: PROPOSED (contracts for implementation; persistence and extraction are not implemented)
Owner: Developer D with Developer B
Related: [System design](./system_design.md), [Student API contracts](./student-api-contracts.md), [Tickets](./tickets/README.md)

## 1. Boundary definitions

### 1.1 Submitted source

A submitted source is the user-provided academic communication or document. It may be pasted text, a PDF, an image, a plain text file or a WhatsApp export.

- Source content is untrusted input.
- A source is not an authoritative academic record.
- A source may be submitted by a student, class representative or lecturer according to authorization policy.

### 1.2 Source record

A source record tracks the submission and processing state. PROPOSED fields:

- `id` (UUID)
- `workspaceId` (UUID)
- `courseId` (UUID, nullable)
- `submittedBy` (UUID user)
- `type` (`text`, `document`, `whatsapp_export`)
- `status` (`pending`, `processing`, `completed`, `failed`)
- `metadata` (JSON, minimal and non-secret)
- `createdAt`, `updatedAt`

### 1.3 Source document

A source document tracks a stored file. PROPOSED fields:

- `id` (UUID)
- `sourceId` (UUID)
- `publicId` (storage provider identifier)
- `resourceType` (`raw`, `image`, etc.)
- `format`
- `bytes`
- `mimeType`
- `checksum` (optional)
- `extractedText` (nullable)
- `textExtractionStatus` (`pending`, `completed`, `failed`)
- `createdAt`

File storage uses the existing Cloudinary foundation. Cloudinary credentials remain server-side. Private files use authenticated delivery.

### 1.4 Extracted text

- Extracted text is derived from a source or source document.
- It is stored as source-derived data, not as an authoritative academic record.
- Text extraction failure does not create an academic event.
- OCR is not yet approved or implemented.

### 1.5 Academic claim

An academic claim is a proposal produced by extraction. PROPOSED fields:

- `id` (UUID)
- `sourceId` (UUID)
- `sourceDocumentId` (UUID, nullable)
- `claimType` (`cat`, `exam`, `assignment`, `lecture`, `meeting`, `deadline`, `venue_change`, `announcement`, `material`, `instruction`)
- `title`
- `description` (nullable)
- `courseId` (UUID, nullable)
- `courseHint` (string, nullable)
- `startAt` (ISO-8601, nullable)
- `endAt` (ISO-8601, nullable)
- `venue` (nullable)
- `confidence` (number, 0 to 1)
- `ambiguityFlags` (array of strings)
- `evidenceSnippet` (string)
- `status` (`pending`, `approved`, `rejected`, `merged`, `failed`)
- `extractedAt`
- `model` (nullable)
- `promptVersion` (nullable)
- `duplicateOf` (UUID, nullable)
- `conflictsWith` (array of UUIDs, nullable)
- `failureReason` (nullable)

### 1.6 Verification

- Claims remain `pending` until reviewed.
- Review decisions: approve, reject, request clarification, or correct fields.
- Only an approved claim may create or update an authoritative academic record.
- Verification decisions and audit information are recorded by the backend.

### 1.7 Approved academic record

- An approved claim creates or updates an `AcademicEvent` or related academic record.
- The record retains `sourceClaimId` for provenance.
- Later changes create a new version and retain previous history.
- Approved records are the only academic information returned as confirmed.

## 2. Processing lifecycle

1. Source submitted.
2. Backend validates request and authorization.
3. Source record created with status `pending`.
4. File stored if applicable; source document record created.
5. Text extracted or text input retained.
6. Extraction produces zero or more academic claims.
7. Each claim is validated against the Zod schema before persistence.
8. Confidence and ambiguity flags are attached.
9. Duplicate and conflict checks run.
10. Claims remain `pending`.
11. Extraction failure leaves claims as `failed` or absent and does not create an academic event.
12. Missing dates remain missing or are flagged as ambiguous; they are never invented.
13. Reviewer approves, rejects, requests clarification or corrects.
14. Approved claim creates or updates an authoritative academic record.
15. Audit information is recorded.

## 3. Provenance requirements

Every extracted claim must retain:

- `sourceId`
- `sourceDocumentId` when applicable
- `evidenceSnippet`
- `extractedAt`
- `confidence`
- `ambiguityFlags`
- `model` and `promptVersion` when available

Every approved academic record must retain:

- `sourceClaimId`
- version information
- audit history

## 4. Duplicate and conflict handling

- Duplicate detection flags candidate duplicates; it does not auto-merge.
- Conflict detection flags differing dates, times or venues for the same course and event type.
- Resolution is performed by an authorized reviewer.
- A class representative message must not silently override a lecturer-confirmed deadline.

## 5. Validation and safety rules

- Uploaded content is untrusted input.
- AI output must be validated with Zod before persistence.
- AI must not invent missing dates, venues, course codes or instructions.
- Failed extraction must not create an academic event.
- AI must not directly create authoritative academic records.
- The backend is the sole authority for validation and persistence.

## 6. Status vocabulary

Processing status:
- `pending`
- `processing`
- `completed`
- `failed`

Claim status:
- `pending`
- `approved`
- `rejected`
- `merged`
- `failed`

Academic event status:
- `draft`
- `verified`
- `superseded`
- `cancelled`

## 7. Unresolved dependencies

- AI provider selection remains PROPOSED.
- OCR provider remains PROPOSED; start with PDF text extraction.
- Background job runner remains PROPOSED.
- Final source/claim persistence schema requires Developer D migration ownership.
- Course identification strategy depends on the approved course membership model.
- Confidence thresholds remain PROPOSED.
