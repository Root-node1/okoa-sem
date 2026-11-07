# Okoa Sem

Academic Coordination Intelligence Platform.

Documentation: [docs/README.md](./docs/README.md)

## Frontend preview

The frontend uses Next.js App Router. Start the frontend and API together from the repository root with `npm install` followed by `npm run dev`. The frontend runs at `http://localhost:5173`.

The student workspace currently uses isolated sample data because the documented student API endpoints are not implemented yet. Preview interactions are not persisted. Copy `frontend/.env.example` to `frontend/.env.local` when connecting the frontend to an API.

Run `npm --prefix frontend run lint` and `npm --prefix frontend run build` to validate the frontend.
