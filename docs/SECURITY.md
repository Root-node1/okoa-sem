# Security — Okoa Sem

Status: Proposed
Related: [Privacy](./PRIVACY_AND_DATA_GOVERNANCE.md), [System Design](./SYSTEM_DESIGN.md)

## 1. Authentication

- Email/password or magic link; strong password policy.
- Session tokens in httpOnly, Secure, SameSite cookies.
- Token rotation on privilege change.
- MFA optional future.

## 2. Authorisation

- RBAC: student, lecturer, class_rep, institution_admin, system.
- Server-side enforcement in service layer.
- Tenant isolation by institution_id and enrolment.

## 3. Role boundaries

- Students: read own enrolled data; submit ingestion; create reminders; verify only own? (no verification of academic events)
- Class rep: submit claims; cannot verify deadlines.
- Lecturer: verify events for own courses; create assignments.
- Institution admin: manage institution data; view audit.
- System: background jobs only, scoped.

## 4. Data isolation

- All queries filter by institution_id.
- Students only see enrolled course offerings.
- Cross-tenant access tests required.

## 5. File uploads

- Size limits (e.g., 10MB), allowed MIME types.
- Store outside web root; signed URLs.
- Filename sanitisation; no path traversal.
- Optional virus scan future.

## 6. API security

- Rate limiting per user/IP.
- CORS restricted to app origin.
- CSRF protection for cookie auth.
- Input validation with Zod.
- No secrets in client bundle.

## 7. Secrets

- Env vars via platform secret manager.
- Never commit secrets; `.env.example` only.
- Rotate keys periodically.

## 8. Encryption

- TLS in transit.
- Encryption at rest (managed DB/storage).
- PII fields encrypted at app level if needed (future).

## 9. Audit history

- Log auth events, verification, record changes, permission denials.
- Immutable append-only audit table.

## 10. Rate limits

- Auth endpoints stricter.
- AI endpoints per user/day to control cost.
- Upload endpoints size/count limits.

## 11. AI permissions

- Agent tools scoped by user.
- No direct DB access.
- Outputs validated; no auto-execution of extracted instructions.

## 12. Prompt injection

- Source text treated as data.
- Fixed system prompts; output schema validation.
- Strip/escape control sequences in ingestion.
- Never let extracted text alter system instructions.
