# Okoa Sem

Academic Coordination Intelligence Platform.

Documentation: [docs/README.md](./docs/README.md)

## Frontend preview

The frontend uses Next.js App Router. Install the root, frontend, and backend dependencies with `npm install`, `npm --prefix frontend install`, and `npm --prefix backend install`, then start both applications with `npm run dev`. The frontend runs at `http://localhost:5173`.

The student workspace currently uses isolated sample data because the documented student API endpoints are not implemented yet. Preview interactions are not persisted. Copy `frontend/.env.example` to `frontend/.env.local` when connecting the frontend to an API.

Run `npm --prefix frontend run lint` and `npm --prefix frontend run build` to validate the frontend.
