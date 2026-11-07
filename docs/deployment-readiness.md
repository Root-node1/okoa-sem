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


## Cloudflare Workers Builds (frontend)

- Root directory: `frontend`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler versions upload` (creates a preview version; requires Cloudflare authentication)
- Build output directory: `dist`
- Wrangler configuration: `frontend/wrangler.jsonc`
- Worker name: `okoa-sem`
- Compatibility date: `2026-11-07`

Required Cloudflare build environment variables:
- `VITE_API_URL` — production backend API base URL ending in `/api/v1`.

`VITE_` variables are embedded in client assets and must not contain secrets.

Watch paths recommendation:
- `frontend/**`
- Do not trigger frontend builds for `backend/**` or documentation-only changes.
- Root-level package files do not affect the frontend build in this repository.


## Docker (backend)

Build:

```bash
cd backend
docker build -t okoa-sem-backend:latest .
```

Run locally:

```bash
cd backend
docker compose up --build
```

Run migrations separately:

```bash
cd backend
docker compose run --rm backend npm run migrate
```

Container details:
- Base image: `node:22-alpine`
- Port: `5000`
- Health check: `GET /api/v1/health`
- Non-root user: `node`
- Production dependencies only
- Listen address: `0.0.0.0`

Rumpty Cloud needs:
- Container image in a registry.
- `DATABASE_URL` for a persistent PostgreSQL database.
- `FRONTEND_URL` set to the Cloudflare frontend origin.
- `AUTH_SECRET` and optional Cloudinary variables.
- Port `5000` and health check path `/api/v1/health`.
- A separate migration step before or during deployment.
- Persistent database storage; containers must not store database data locally.
