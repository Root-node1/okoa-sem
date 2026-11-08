# PROJECT_AUDIT.md

Status: Audit completed 2026-11-07

## 1. Repository and branch

- Branch: `main`
- Working tree before audit: clean
- Remote: `origin/main`
- Recent commits include auth, extraction, frontend, and integration merge commits.

## 2. Architecture review

Approved stack observed:

- Frontend intended: React + TypeScript + Vite + Tailwind CSS + React Router (`frontend/`).
- Backend: Node.js + Express + JavaScript ES modules (`backend/`).
- Database: PostgreSQL via `pg` with parameterized SQL.
- Validation: Zod.
- Authentication: Argon2id and server-managed PostgreSQL sessions.

Additional/unapproved artifact:

- Root-level Next.js application exists (`app/`, root `package.json`). It is a mock design prototype and is not used by CI or the documented Cloudflare deployment. It should not be presented as the production frontend.

## 3. Implemented functionality

Backend:

- Health endpoints: `GET /api/v1/health`, `GET /api/v1/health/database`.
- Authentication: register, login, current user, logout.
- Session handling: opaque token, SHA-256 token hash, expiry, revocation, HttpOnly cookie.
- Password hashing: Argon2id.
- Login rate limiting: 10 attempts / 15 minutes, disabled in test mode.
- Authorization helpers for workspace and course access.
- Claims verification endpoints: get, approve, reject, request clarification, correct.
- Academic event creation from approved claims.
- Audit logging.
- Extraction and processing services and PostgreSQL-backed job queue.
- Cloudinary upload validation and signed URL foundation.
- Migrations 001-003.

Frontend:

- Vite/React/TypeScript scaffold with routes and protected route component.
- Auth integration with backend session cookie was repaired during audit.
- Dashboards and feature pages are placeholders.

## 4. Incomplete or not exposed

- No HTTP routes for source submission, upload, processing status, extraction review list, student dashboard, courses, academic events, assignments, calendar, or notifications.
- Frontend feature pages are placeholders.
- Background worker must be started separately with `npm run worker`.
- AI provider defaults to mock unless `AI_PROVIDER=gemini` and a key are configured.
- No password reset, email verification workflow, or account administration UI.

## 5. Functional audit summary

| Area | Status |
|---|---|
| Backend startup | VERIFIED |
| Database migrations | VERIFIED |
| Health endpoints | VERIFIED |
| Authentication | VERIFIED |
| Protected API routes | VERIFIED |
| Role authorization | VERIFIED after fix |
| Claims approval workflow | VERIFIED after fix |
| Extraction service tests | VERIFIED |
| Worker/job queue | VERIFIED at service level |
| Frontend build | VERIFIED |
| Frontend browser UX | NOT TESTED (no browser binary in audit environment) |
| Deployed frontend/backend integration | NOT TESTED |

## 6. Key defects found

See `VULNERABILITY_REGISTER.md` and `REMEDIATION_PLAN.md`.
EOF
echo done