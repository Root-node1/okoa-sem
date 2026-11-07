# Deployment — Okoa Sem

Status: Proposed

## 1. Environments

- local: developer machine.
- preview: per-PR or staging.
- production: hackathon demo + pilot.

## 2. Secrets

- Managed by platform secret store.
- `.env.example` documents required keys.
- Rotate on suspected leak.

## 3. Database migrations

- Run migrations in CI/deploy pipeline before app start.
- Backward-compatible migrations preferred.
- Backup before production migration.

## 4. Storage

- Bucket per environment.
- Signed URLs for access.
- CORS configured for app origin.

## 5. AI configuration

- `AI_PROVIDER`, `AI_MODEL`, API keys.
- Rate limits configured.

## 6. Background workers

- Deploy job runner alongside app or as separate process.
- Health check endpoint for worker.

## 7. CI/CD

- Pipeline: install, lint, typecheck, test, build, migrate, deploy.
- Rollback on failed health check.

## 8. Monitoring

- Health endpoint `/api/health`.
- Error tracking.
- Job failure alerts.

## 9. Backups

- Daily DB backups (managed).
- Storage versioning if available.

## 10. Rollback

- Revert to previous deploy artifact.
- Run down migration only if safe; prefer forward fix.

## 11. RumptyCloud note

- Verify platform supports Next.js, Postgres, env secrets, background jobs.
- Fallback: Vercel + managed Postgres + Inngest.
