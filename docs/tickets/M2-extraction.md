# Milestone 2 — Extraction and processing

## T-201 Source processing contract

**Milestone:** M2
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Define source processing contract with backend owner.
**Product outcome:** Extraction integrates with shared persistence.
**Scope:** Source fields, status, retry, failure metadata.
**Files owned / allowed to modify:** `docs/`, contract notes
**Files not allowed to modify:** application source until agreed
**Dependencies:** T-003
**API/data contract:** Source processing interface
**Implementation steps:** Agree contract with D.
**Acceptance criteria:** Contract documented.
**Tests required:** schema tests plan
**Integration requirements:** Persistence.
**Definition of Done:** Contract frozen.
**Risks / decisions required:** Runner choice.

## T-202 Text extraction interface

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Define text extraction interface for sources.
**Product outcome:** Parsing can run in Node.js backend.
**Scope:** Interface accepting source content and returning text.
**Files owned / allowed to modify:** `backend/src/modules/extraction/` or `ingestion/`
**Files not allowed to modify:** frontend, shared migrations without D
**Dependencies:** T-201
**API/data contract:** Text extraction interface
**Implementation steps:** Implement interface and mock.
**Acceptance criteria:** Interface documented and tested.
**Tests required:** unit tests.
**Integration requirements:** Ingestion.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-203 PDF text extraction

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Extract text from text-based PDFs.
**Product outcome:** PDF announcements become processable.
**Scope:** PDF parsing; failure status for scanned PDFs.
**Files owned / allowed to modify:** backend extraction/ingestion modules, tests
**Files not allowed to modify:** frontend, shared migrations without D
**Dependencies:** T-202
**API/data contract:** Extracted text on source document
**Implementation steps:** Implement parser; handle failures.
**Acceptance criteria:** Text PDFs yield text; scanned PDFs fail gracefully.
**Tests required:** unit/integration tests.
**Integration requirements:** Ingestion.
**Definition of Done:** Tests pass.
**Risks / decisions required:** OCR deferred.

## T-204 Text normalization

**Milestone:** M2
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Normalize extracted text for extraction.
**Product outcome:** Cleaner extraction input.
**Scope:** Whitespace, encoding, basic cleanup.
**Files owned / allowed to modify:** backend extraction modules, tests
**Files not allowed to modify:** frontend
**Dependencies:** T-202
**API/data contract:** Normalized text
**Implementation steps:** Implement normalization.
**Acceptance criteria:** Normalized output tested.
**Tests required:** unit tests.
**Integration requirements:** Extraction.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-205 Structured academic claim schema

**Milestone:** M2
**Priority:** P0
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Define Zod schema for extracted claims.
**Product outcome:** AI output is validated before persistence.
**Scope:** Claim types, fields, confidence, provenance, ambiguity flags.
**Files owned / allowed to modify:** backend extraction/claims modules, tests
**Files not allowed to modify:** frontend types without coordination
**Dependencies:** T-003, T-201
**API/data contract:** ExtractedClaim schema
**Implementation steps:** Define schema and tests.
**Acceptance criteria:** Invalid output rejected.
**Tests required:** schema unit tests.
**Integration requirements:** Backend persistence.
**Definition of Done:** Schema agreed and tested.
**Risks / decisions required:** Field approval.

## T-206 AI provider abstraction

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Create provider abstraction and mock.
**Product outcome:** Extraction can use swappable providers.
**Scope:** Interface with extract/classify/answer/embed; config via env.
**Files owned / allowed to modify:** backend extraction/services, tests
**Files not allowed to modify:** frontend, shared migrations
**Dependencies:** T-205
**API/data contract:** Provider interface
**Implementation steps:** Implement interface and mock.
**Acceptance criteria:** Provider swappable; mock works.
**Tests required:** unit tests.
**Integration requirements:** Extraction.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Provider choice (PROPOSED).

## T-207 Assignment and deadline extraction

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Extract assignments and deadlines from academic text.
**Product outcome:** Deadlines are proposed, never invented.
**Scope:** Extraction logic and ambiguity flags.
**Files owned / allowed to modify:** backend extraction modules, tests
**Files not allowed to modify:** frontend, authoritative records
**Dependencies:** T-205, T-206
**API/data contract:** Claim payload for assignments/deadlines
**Implementation steps:** Implement extraction and tests.
**Acceptance criteria:** Missing deadlines remain missing or flagged.
**Tests required:** extraction tests.
**Integration requirements:** Source processing.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Accuracy.

## T-208 Course identification

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D, A
**Objective:** Map course hints to courses.
**Product outcome:** Claims are associated with courses where possible.
**Scope:** Heuristic matching and ambiguity handling.
**Files owned / allowed to modify:** backend extraction modules, tests
**Files not allowed to modify:** frontend
**Dependencies:** T-205, T-102 (course data)
**API/data contract:** courseHint resolution
**Implementation steps:** Implement matching; flag ambiguous.
**Acceptance criteria:** Known courses resolved; unknown flagged.
**Tests required:** unit tests.
**Integration requirements:** Course data.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Course model.

## T-209 Confidence and ambiguity handling

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Attach confidence and ambiguity flags to claims.
**Product outcome:** Reviewers can assess proposals.
**Scope:** Confidence scoring, ambiguity flags.
**Files owned / allowed to modify:** backend extraction modules, tests
**Files not allowed to modify:** frontend
**Dependencies:** T-205
**API/data contract:** Confidence/ambiguity fields
**Implementation steps:** Implement and test.
**Acceptance criteria:** Claims include confidence and flags.
**Tests required:** unit tests.
**Integration requirements:** Review UI.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Thresholds.

## T-210 Duplicate detection

**Milestone:** M2
**Priority:** P2
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Detect duplicate claims.
**Product outcome:** Duplicate announcements flagged.
**Scope:** Heuristic similarity; no auto-merge.
**Files owned / allowed to modify:** backend extraction modules, tests
**Files not allowed to modify:** frontend
**Dependencies:** T-205, T-208
**API/data contract:** Duplicate candidate references
**Implementation steps:** Implement detection.
**Acceptance criteria:** Duplicates flagged.
**Tests required:** unit tests.
**Integration requirements:** Review.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Similarity thresholds.

## T-211 Conflict detection

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Detect conflicting academic information.
**Product outcome:** Conflicts surfaced for review.
**Scope:** Differing dates/times/venues for same course/event type.
**Files owned / allowed to modify:** backend extraction modules, tests
**Files not allowed to modify:** frontend
**Dependencies:** T-208, T-210
**API/data contract:** Conflict references
**Implementation steps:** Implement detection.
**Acceptance criteria:** Conflicts flagged with references.
**Tests required:** unit tests.
**Integration requirements:** Review UI.
**Definition of Done:** Tests pass.
**Risks / decisions required:** None.

## T-212 Extraction status and retry handling

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Manage extraction processing status and retries.
**Product outcome:** Failures are visible and recoverable.
**Scope:** Status transitions, retry, failure metadata.
**Files owned / allowed to modify:** backend extraction/ingestion modules, tests
**Files not allowed to modify:** frontend
**Dependencies:** T-201
**API/data contract:** Processing status
**Implementation steps:** Implement status handling.
**Acceptance criteria:** Failed extraction recorded with reason.
**Tests required:** integration tests.
**Integration requirements:** Ingestion.
**Definition of Done:** Tests pass.
**Risks / decisions required:** Runner choice.

## T-213 Extraction pipeline tests

**Milestone:** M2
**Priority:** P1
**Status:** NOT STARTED
**Accountable owner:** Developer B
**Supporting developers:** D
**Objective:** Test extraction pipeline end-to-end.
**Product outcome:** Extraction quality and safety verified.
**Scope:** Pipeline tests including no invented deadlines.
**Files owned / allowed to modify:** `backend/tests/`
**Files not allowed to modify:** application source
**Dependencies:** T-201..T-212
**API/data contract:** Extraction pipeline
**Implementation steps:** Add tests.
**Acceptance criteria:** Tests pass in CI.
**Tests required:** integration tests.
**Integration requirements:** CI.
**Definition of Done:** CI green.
**Risks / decisions required:** None.
