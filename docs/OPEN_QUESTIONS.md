# Open Questions — Okoa Sem

Status: Proposed

## Q-001: RumptyCloud capabilities

- **Why it matters:** Deployment target.
- **Options:** RumptyCloud vs Vercel+managed Postgres.
- **Recommended:** Verify; fallback documented.
- **Owner:** DevOps/QA.
- **Blocking:** Yes for final deploy.

## Q-002: ORM choice (Prisma vs Drizzle)

- **Why:** Team productivity.
- **Options:** Prisma, Drizzle, Kysely.
- **Recommended:** Drizzle (proposed) but decide by team survey.
- **Owner:** Backend.
- **Blocking:** M0.

## Q-003: Auth provider (Supabase vs NextAuth vs Clerk)

- **Why:** Speed/cost.
- **Options:** Supabase Auth, NextAuth, Clerk.
- **Recommended:** Supabase Auth behind abstraction.
- **Owner:** Product Lead + Backend.
- **Blocking:** M1.

## Q-004: Background runner (Inngest vs BullMQ)

- **Why:** Ops complexity.
- **Options:** Inngest, BullMQ+Redis.
- **Recommended:** Inngest for hackathon.
- **Owner:** DevOps/QA.
- **Blocking:** M3.

## Q-005: OCR provider

- **Why:** PDF/image ingestion.
- **Options:** Tesseract, cloud OCR.
- **Recommended:** Start with pdf text extraction; OCR future.
- **Owner:** AI.
- **Blocking:** No (MVP can limit to text/PDF text).

## Q-006: Kenya legal review

- **Why:** Compliance.
- **Options:** Proceed with proposed policy; obtain legal review.
- **Recommended:** Mark as requiring legal review.
- **Owner:** Product Lead.
- **Blocking:** Production release (not hackathon demo).
