# Deployment — Okoa Sem

Status: Proposed

## 1. Architecture

- Frontend: Next.js (separate deployable).
- Backend: Node.js + TypeScript + Express API (separate deployable).
- Database: PostgreSQL.
- Workers: background job runner.

## 2. Environments

- local: developer machine.
- preview: per-PR or staging.
- production: hackathon demo + pilot.

## 3. Secrets and environment

- Managed by platform secret store.
- `.env.example` documents required keys.
- Frontend and backend have separate env configs.
- Rotate on suspected leak.

## 4. Database migrations

- Run migrations in CI/deploy pipeline before backend start.
- Backward-compatible migrations preferred.
- Backup before production migration.

## 5. Storage

- Bucket per environment.
- Signed URLs for access.
- CORS configured for frontend origin.

## 6. AI configuration

- `AI_PROVIDER`, `AI_MODEL`, API keys.
- Rate limits configured.

## 7. Background workers

- Deploy worker alongside backend or as separate process.
- Health check endpoint for worker.

## 8. CI/CD

- Pipeline: install, lint, typecheck, test, build frontend, build backend, migrate, deploy.
- Rollback on failed health check.

## 9. Monitoring

- Health endpoint `/api/health`.
- Error tracking.
- Job failure alerts.

## 10. Backups

- Daily DB backups (managed).
- Storage versioning if available.

## 11. Rollback

- Revert to previous deploy artifact.
- Run down migration only if safe; prefer forward fix.

## 11a. Cloudinary

- Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
- Keep credentials server-side only.

## 12. RumptyCloud note

- Verify platform supports Next.js frontend + Node.js API + Postgres + env secrets + background jobs.
- Fallback: Vercel (frontend) + managed Node host (backend) + managed Postgres + Inngest.
