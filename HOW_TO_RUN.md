# HOW TO RUN & TEST OKOA SEM

## How Teammates Can Run & Test Locally

### 1. Frontend + Backend (Full Stack with PostgreSQL)

```bash
# 1. Install dependencies
pnpm install
npm --prefix backend install

# 2. Run database migrations & seed demo data
npm --prefix backend run migrate
npm --prefix backend run seed

# 3. Start backend (Port 5000) and Next.js frontend (Port 3000)
npm run dev:backend
pnpm run dev
```

Open `http://localhost:3000` (or `http://localhost:3000/login` to sign in with `student@okoa.ac.ke` or `lecturer@okoa.ac.ke` / `Password123`).

### 2. Frontend Quick Start (No Database Required)
If PostgreSQL is not running locally, the frontend has a built-in hybrid mode that allows instant preview of all 29 routes:
```bash
pnpm run dev
```
Open `http://localhost:3000`. Quick-fill demo account buttons on `/login` allow instant role-switching between Student and Lecturer modes.

### 3. Verification Checks Run
- `pnpm run lint` (`eslint`) — **Passed (0 errors, 0 warnings)**
- `pnpm run build` (`next build` + TypeScript check) — **Passed (all 29 routes compiled cleanly)**
- `backend` CI (`npm run migrate` + `npm test` against PostgreSQL 16) — **Passed**
- `node --check` on all backend route/service modules — **Passed**

---

## ⚠️ Action Required for Repo Owner (`Root-node1`): Cloudflare & Cloudinary Settings Guide

Both **GitHub Actions CI checks (`frontend` and `backend`) are passing**. However, the external **`Workers Builds: okoa-sem` (Cloudflare)** check is currently failing in `0s` because the Cloudflare Dashboard is still pointing to the deleted `/frontend` Vite folder.

Follow these exact copy-paste steps in your dashboard so all checks turn green and the deployment works:

### 1. Cloudflare Dashboard Build Settings (`Workers & Pages` → `okoa-sem` → `Settings` → `Build`)
Update the **Build Configuration** in Cloudflare to point to the repository root where the Next.js 16 application lives:

| Setting Field | Value to Input |
| :--- | :--- |
| **Root directory (Path)** | `/` *(leave empty / root — **remove** `frontend`)* |
| **Framework preset** | `Next.js` |
| **Build command** | `pnpm install --no-frozen-lockfile && pnpm run build` |
| **Build output directory** | `.next` |
| **Node.js version (`NODE_VERSION`)** | `22` |

**Cloudflare Environment Variables (`Settings` → `Variables and Secrets`):**
- `NEXT_PUBLIC_API_BASE_URL` = `https://<your-deployed-backend-domain>/api/v1` *(or `http://localhost:5000/api/v1` for local testing)*
- `NODE_VERSION` = `22`

> **Note:** Do **not** put `CLOUDINARY_API_SECRET`, `DATABASE_URL`, or `GEMINI_API_KEY` into the frontend Cloudflare build variables—those belong strictly on the backend server.

---

### 2. Cloudinary & Backend Environment Settings (`backend/.env` / Backend Host)
Cloudinary is **only** used by the backend (`backend/src/config/cloudinary.js`) for document uploads—it should **never** block the frontend or local development.

In your backend environment (`backend/.env` locally, or your backend container host in production), set:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/okoa_sem
FRONTEND_URL=http://localhost:3000
AUTH_SECRET=change-me-in-production

# AI Extraction (works out-of-the-box with 'mock' if you don't have a Gemini key)
AI_PROVIDER=mock
AI_MODEL=gemini-2.5-flash
GEMINI_API_KEY=

# Cloudinary (Optional — leave blank locally if not testing PDF cloud uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
*(If you do connect a Cloudinary account later, copy `Cloud name`, `API Key`, and `API Secret` from **Cloudinary Dashboard → Settings → API Keys** and paste them **only** into the backend environment variables above.)*
