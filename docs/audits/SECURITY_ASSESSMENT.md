# SECURITY_ASSESSMENT.md

Status: Audit completed 2026-11-07

## 1. Controls verified

- Argon2id password hashing in `backend/src/modules/auth/auth.service.js`.
- Opaque session tokens generated with `crypto.randomBytes(32)`.
- Only SHA-256 session token hashes stored in PostgreSQL.
- Session expiry and revocation enforced in `backend/src/middleware/auth.js`.
- HttpOnly session cookie.
- Secure cookie in production.
- SameSite cookie attribute hardened for cross-origin production use.
- CORS restricted to configured `FRONTEND_URL` with credentials.
- Helmet enabled.
- Zod request validation.
- Login rate limiting.
- Parameterized SQL throughout inspected repositories.
- Cloudinary credentials server-side only; authenticated uploads and signed URLs.
- AI output validated with Zod before persistence.
- Prompt injection treated as data; source text is not executed.

## 2. Vulnerabilities and weaknesses

| ID | Severity | Status | Summary |
|---|---|---|---|
| V-01 | P1 | FIXED AND VERIFIED | Approved-claim approval endpoint skipped authorization in idempotent path. |
| V-02 | P1 | FIXED AND VERIFIED | Claim correction/approval could reassign an unauthorized course. |
| V-03 | P1 | FIXED AND VERIFIED | Vite frontend did not send credentials or restore cookie sessions. |
| V-04 | P1 | FIXED AND VERIFIED | Session cookie SameSite=Lax broke cross-origin authenticated deployment. |
| V-05 | P2 | FIXED | `.gitignore` contained unresolved merge conflict markers. |
| V-06 | P2 | OPEN | Frontend lint command/configuration is broken. |
| V-07 | P2 | OPEN | Docker Compose uses development settings and a hard-coded development secret. |
| V-08 | P2 | OPEN | `AUTH_SECRET` is documented but unused. |
| V-09 | P2 | OPEN | Email verification is not enforced before login. |
| V-10 | P2 | OPEN | Root Next.js prototype uses an unapproved stack and mock data. |
| V-11 | P3 | OPEN | No CSRF token; reliance on SameSite and CORS. |
| V-12 | P3 | OPEN | No password reset or account recovery flow. |

## 3. Authorization notes

- Backend authorization is enforced in services, not only frontend.
- Students are blocked from lecturer-only claim operations.
- Course access is separate from workspace access.
- A cross-course claim reassignment defect was fixed and covered by tests.
- The approved-claim idempotency path now performs authorization before returning data.

## 4. Secrets and environment

- `backend/.env` is ignored by Git and was not found in tracked files.
- A local Gemini API key was present in `backend/.env`; rotate it if it has been shared or exposed.
- No secrets were added to the repository during this audit.
- Production must set real values for `DATABASE_URL`, `FRONTEND_URL`, and Cloudinary variables.

## 5. Not tested

- External penetration testing.
- Production TLS/HSTS verification.
- Browser-based CSRF behavior.
- Cloudinary production credentials.
EOF
echo done