# Okoa Sem

Academic Coordination Intelligence Platform.

## Applications

- Main workspace: Next.js app at `http://localhost:3000`.
- Student frontend: Next.js app at `http://localhost:5173`.
- Backend API: Express app at `http://localhost:5000`.

The student frontend currently uses isolated sample data because its documented API endpoints are not implemented. Preview interactions are not persisted.

## Getting started

Install root dependencies with either package manager, then install the frontend and backend dependencies:

```bash
npm install
# or: pnpm install
npm --prefix frontend install
npm --prefix backend install
```

Configure `backend/.env` from `backend/.env.example`, then run all three applications:

```bash
npm run dev
```

To run an individual application, use `npm run dev:portal`, `npm run dev:frontend`, or `npm run dev:backend`.

Frontend checks:

```bash
npm --prefix frontend run lint
npm --prefix frontend run build
```
