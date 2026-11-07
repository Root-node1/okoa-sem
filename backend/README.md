# Okoa Sem Backend

Node.js + Express + JavaScript ES modules + PostgreSQL (`pg`) + Zod.

## Conventions

- Entry point: `src/server.js`; app composition: `src/app.js`.
- REST API base path: `/api/v1`.
- Modules live under `src/modules/<name>/` with controller, service, repository, schema and routes.
- Public module entry is `index.js`; avoid deep imports.
- Controllers handle HTTP only; business logic lives in services.
- Database access uses `pg` with parameterized SQL.
- Request validation uses Zod schemas via `src/middleware/validate.js`.
- Authentication uses server-managed opaque sessions (`src/middleware/auth.js`).
- Roles: `student`, `class_rep`, `lecturer`.
- Error responses use `{ error: { code, message, details?, requestId } }`.
- Migrations live in `migrations/` and are applied by `scripts/migrate.js`.
- Never edit an already-applied migration; add a new migration.
- Tests use Node's built-in test runner and Supertest.

## Environment

See `backend/.env.example`. Required: `DATABASE_URL`. `NODE_ENV=test` for tests.

## Commands

- `npm run dev` — watch mode
- `npm start` — production start
- `npm test` — run tests (requires PostgreSQL)
- `npm run migrate` — apply migrations
