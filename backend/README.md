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

## Docker

Build the image:

```bash
docker build -t okoa-sem-backend:latest .
```

Run locally with Docker Compose:

```bash
docker compose up --build
```

Run migrations as a separate step:

```bash
docker compose run --rm backend npm run migrate
```

Required production environment variables:
- `PORT`
- `NODE_ENV=production`
- `DATABASE_URL`
- `FRONTEND_URL`
- `AUTH_SECRET`
- Cloudinary variables if file storage is enabled

The container listens on `0.0.0.0:5000`. Health check path: `/api/v1/health`.

Do not bake secrets into the image.

## Native PostgreSQL Development

No Docker is required for ordinary local backend development.

### 1. Install PostgreSQL

Ubuntu/WSL:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

Windows:
- Install PostgreSQL from the official installer.
- Start the PostgreSQL service from Services or pgAdmin.

### 2. Create the local database and user

Connect as a PostgreSQL superuser and run:

```bash
psql -U postgres -f backend/scripts/setup-local-db.sql
```

Replace `YOUR_LOCAL_PASSWORD` in the SQL file or use `psql` to set the password interactively.

Or run manually:

```sql
CREATE USER okoa_sem_dev WITH PASSWORD 'YOUR_LOCAL_PASSWORD';
CREATE DATABASE okoa_sem_dev OWNER okoa_sem_dev;
GRANT ALL PRIVILEGES ON DATABASE okoa_sem_dev TO okoa_sem_dev;
```

If PostgreSQL listens on a port other than 5432, update the connection string accordingly.

### 3. Configure the backend

Copy the example environment file:

```bash
cp backend/.env.example backend/.env
```

Set:

```env
DATABASE_URL=postgresql://okoa_sem_dev:YOUR_LOCAL_PASSWORD@localhost:5432/okoa_sem_dev
```

Do not commit `backend/.env`.

### 4. Run migrations

```bash
npm --prefix backend run migrate
```

### 5. Start the backend

```bash
npm --prefix backend run dev
```

### 6. Run tests

Create a separate test database if needed:

```sql
CREATE USER okoa_sem_test WITH PASSWORD 'YOUR_LOCAL_PASSWORD';
CREATE DATABASE okoa_sem_test OWNER okoa_sem_test;
GRANT ALL PRIVILEGES ON DATABASE okoa_sem_test TO okoa_sem_test;
```

Then run:

```bash
cd backend
DATABASE_URL=postgresql://okoa_sem_test:YOUR_LOCAL_PASSWORD@localhost:5432/okoa_sem_test NODE_ENV=test npm test
```

### 7. Check database connectivity

```bash
curl http://localhost:5000/api/v1/health/database
```

Docker remains optional. The backend can run directly against a native PostgreSQL installation.
