# Deployment Readiness — Okoa Sem

Status: PROPOSED/PARTIAL (documentation and local verification; production hosting not verified)
Owner: Developer D

## Environment

- Backend env vars documented in `backend/.env.example`.
- Frontend env vars documented in `frontend/.env.example`.
- Required backend variables: `PORT`, `NODE_ENV`, `DATABASE_URL`, `FRONTEND_URL`, `AUTH_SECRET`.
- Optional Cloudinary variables: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Database migrations

- Run `npm --prefix backend run migrate` before starting the backend.
- Migrations are idempotent and ordered by filename.

## Cloudinary

- Credentials are server-side only.
- Private uploads use authenticated delivery and signed URLs.
- Production configuration requires valid Cloudinary credentials.

## CI/CD

- GitHub Actions runs frontend build and backend migrate + tests.
- Run `npm run build` in `frontend/` and `NODE_ENV=test npm test` in `backend/`.

## Logging and monitoring

- Morgan request logging and request IDs are enabled.
- Health endpoints: `/api/v1/health` and `/api/v1/health/database`.

## Backup and recovery

- Use managed PostgreSQL backups.
- Test restore before production release.
- Store migration files in version control.

## Security review

- Argon2id password hashing.
- Opaque PostgreSQL sessions.
- Helmet, CORS with credentials, rate-limited login.
- Zod validation.
- Tenant and course authorization helpers.
- Uploaded content treated as untrusted.

## Smoke tests

- Backend health endpoint returns 200.
- Authenticated flow tested in `backend/tests/auth.test.js`.
