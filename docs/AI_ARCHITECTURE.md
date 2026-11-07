# AI Architecture — Okoa Sem

Status: Proposed
Related: [System Design](./SYSTEM_DESIGN.md), [Agent Design](./AGENT_DESIGN.md), [Academic Lifecycle](./ACADEMIC_INFORMATION_LIFECYCLE.md)

## 1. Principles

- AI interprets and proposes; backend validates and enforces; DB is authoritative.
- Every AI output is untrusted until backend validation.
- All claims retain source, timestamp, confidence, verification status, processing history.
- Prompts and models are versioned.

## 2. Provider abstraction

Interface (proposed):

```ts
interface AIProvider {
  extract(input: ExtractionInput): Promise<ExtractionResult>;
  classify(input: ClassificationInput): Promise<ClassificationResult>;
  answer(input: AssistantInput): Promise<AssistantResult>;
  embed?(input: EmbedInput): Promise<number[]>;
}
```

- Implementations: OpenAI, Gemini, mock (for tests).
- Selection via env `AI_PROVIDER`, `AI_MODEL`.
- Retries with exponential backoff; timeout per call.

## 3. Extraction

Input: source text + metadata + known courses/context.
Output: array of structured claims matching Zod schema `ExtractedClaimSchema`.

Claim types: `cat`, `exam`, `assignment`, `lecture`, `meeting`, `deadline`, `venue_change`, `announcement`, `material`, `instruction`.

Each claim includes: type, title, description, courseHint, proposedDates, venue, confidence (0-1), evidenceSnippet.

## 4. Structured output

- Use JSON mode / function calling where supported.
- Validate with Zod; on failure, retry once with correction prompt; then mark claim `failed`.
- Never persist unvalidated payloads as events.

## 5. Prompt management

- Prompts in `prompts/` with version suffix (e.g., `extract-v1.md`).
- Store `prompt_version` on `ExtractedClaim`.
- Changes require evaluation run.

## 6. Confidence handling

- Confidence is model-reported and calibrated via evaluation.
- Thresholds (proposed): >=0.8 high, 0.5-0.8 medium, <0.5 low.
- Low-confidence claims require manual review; high-confidence still pending verification for deadlines/exams.

## 7. Source grounding

- Every claim stores `source_document_id` or `communication_source_id`, `evidenceSnippet`, offsets if available.
- Assistant answers must cite stored records; no free-form facts without source.

## 8. Duplicate detection

- Heuristic + embedding similarity on title/type/course/date.
- Candidate duplicates flagged for user/admin resolution; never auto-merge deadlines.

## 9. Conflict detection

- Detect differing dates/times/venues for same course+event type.
- Mark claims/events as `conflict` with references; surface in UI.
- Resolution by authorised user.

## 10. Retrieval (assistant)

- Retrieve from verified academic records first; optionally include pending claims labelled unverified.
- RAG over source documents for context; cite sources.
- Permission-filtered by user enrolments.

## 11. Evaluation

- Dataset of real (anonymised) messages with expected claims.
- Metrics: precision/recall per claim type, date accuracy, course resolution accuracy, false positive rate.
- Run in CI on prompt/model changes.

## 12. Cost control

- Model selection by task (cheap model for extraction, stronger for assistant).
- Token budgets and max input size; chunk long documents.
- Cache repeated extractions by content hash.
- Monitor cost per claim.

## 13. Failure handling

- Provider outage: queue retry; claim status `failed`; user notified.
- Malformed output: retry once; then `failed` with reason.
- Partial extraction: persist successful claims, log failures.
- Never block ingestion on AI; status visible.

## 14. Security

- Prompt injection mitigation: treat source text as data, not instructions; system prompts fixed; output schema validation; no tool execution from extracted text.
- PII minimisation in prompts where possible.
