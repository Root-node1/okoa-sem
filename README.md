# Okoa Sem

Academic Coordination Intelligence Platform.

Okoa Sem turns fragmented academic communication into reliable, traceable academic information and coordination. AI proposes information; the backend validates it; humans verify it before it becomes authoritative.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, JavaScript ES modules, PostgreSQL (`pg`), Zod
- Authentication: server-managed opaque sessions, Argon2id password hashing
- File storage: Cloudinary (foundation implemented)
- CI: GitHub Actions

## Run locally

Prerequisites: Node.js 22+, PostgreSQL 16+.

1. Install dependencies:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

2. Configure environment:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set `DATABASE_URL` in `backend/.env`.

3. Run migrations:

```bash
npm --prefix backend run migrate
```

4. Start both apps:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/v1/health

## Tests

Backend:

```bash
cd backend && NODE_ENV=test npm test
```

Requires a running PostgreSQL database configured by `DATABASE_URL`.

Frontend build:

```bash
npm --prefix frontend run build
```

## Documentation

- [Documentation index](./docs/README.md)
- [Backend architecture](./docs/ARCHITECTURE.md)
- [Developer tickets](./docs/tickets/README.md)
