# Architecture Decision Register — Okoa Sem

Status: Proposed (decisions to be ratified by Product Lead)
Related: [System Design](./SYSTEM_DESIGN.md)

## ADR-001: Modular monolith versus microservices

**Status:** Accepted (proposed)
**Context:** Small team (5-6), hackathon timeline, need fast integration and clear ownership. Domain still evolving.
**Alternatives:** Microservices, serverless functions per domain.
**Decision:** Modular monolith backend with a separately deployable Node.js API; separate Next.js frontend.
**Consequences:** Faster delivery, simpler deploy, shared DB; requires discipline in module boundaries. Revisit if a module needs independent scaling or team growth.
**Review conditions:** After first production release or team >12.

## ADR-002: Frontend/backend separation

**Status:** Accepted (proposed)
**Context:** Academic business logic must not live in Next.js Route Handlers.
**Alternatives:** Next.js full-stack, separate backend.
**Decision:** Next.js frontend communicates with a Node.js/Express REST API. Next.js may retain frontend-specific functionality only.
**Consequences:** Clear ownership and contracts; two deployable units; more integration work.
**Review conditions:** If deployment complexity becomes a blocker.

## ADR-003: Backend runtime and framework

**Status:** Accepted (proposed)
**Context:** Need TypeScript backend with clear module boundaries and ecosystem.
**Alternatives:** Node.js/Express, Fastify, NestJS, Next.js Route Handlers.
**Decision:** Node.js + TypeScript + Express for the backend API.
**Consequences:** Familiar, flexible, large ecosystem; Express requires manual structure discipline.
**Review conditions:** If performance or structure demands a different framework.

## ADR-004: Database choice

**Status:** PROPOSED
**Context:** Need relational integrity, tenant isolation, audit history, JSON for flexible extraction payloads.
**Alternatives:** PostgreSQL, MySQL, MongoDB, Supabase Postgres.
**Decision:** PostgreSQL (managed). Supabase Postgres acceptable for hackathon if region and pricing fit.
**Consequences:** Strong relational model; migrations required. Avoid vendor lock-in by keeping SQL standard and migration tool portable.
**Review conditions:** If data residency or cost constraints require self-hosting.

## ADR-005: Authentication

**Status:** PROPOSED
**Context:** Need secure sessions, email verification, future OAuth for email ingestion.
**Alternatives:** Supabase Auth, Passport/JWT, Clerk.
**Decision:** Auth implemented in Node.js backend with middleware; provider (Supabase Auth or self-managed) to be decided.
**Consequences:** Backend owns auth context; frontend relies on API.
**Review conditions:** If pricing, region, or feature gaps appear.

## ADR-006: AI provider abstraction

**Status:** Accepted (proposed)
**Context:** Need structured extraction, assistant answers, cost control, provider flexibility.
**Alternatives:** Direct OpenAI/Gemini SDK calls, LangChain, custom.
**Decision:** Provider abstraction with `extract`, `classify`, `answer`, `embed`; default provider configurable via env. Prompts versioned in repo.
**Consequences:** Testable, swappable; adds thin abstraction layer. No framework lock-in.
**Review conditions:** If evaluation shows provider-specific features needed.

## ADR-007: Background processing

**Status:** PROPOSED
**Context:** Extraction and reminders must be async, retryable, observable.
**Alternatives:** Inngest, BullMQ+Redis, database polling.
**Decision:** Node.js backend enqueues async work; runner choice (Inngest or BullMQ) remains open.
**Consequences:** Workers reuse backend services; no bypass of validation/permissions.
**Review conditions:** If ops or cost constraints appear.

## ADR-008: File storage

**Status:** PROPOSED
**Context:** Uploads of PDFs/images/WhatsApp exports.
**Alternatives:** Supabase Storage, S3, Cloudinary.
**Decision:** S3-compatible storage (Supabase Storage acceptable for hackathon).
**Consequences:** Standard interface; signed URLs for access.
**Review conditions:** If virus scanning or large file needs arise.

## ADR-009: API architecture

**Status:** Accepted (proposed)
**Context:** Frontend and backend need typed contracts; small team.
**Alternatives:** REST, GraphQL, tRPC.
**Decision:** REST with JSON and Zod validation; shared TypeScript types in `src/contracts`; versioned routes `/api/v1`.
**Consequences:** Slightly more boilerplate; broad compatibility.
**Review conditions:** If client diversity grows.

## ADR-010: Data isolation

**Status:** Accepted (proposed)
**Context:** Multi-institution, student privacy, regulatory expectations.
**Alternatives:** DB-per-tenant, schema-per-tenant, row-level with RLS.
**Decision:** Single DB with `institution_id` row-level isolation + app-level enforcement; enable RLS where supported.
**Consequences:** Simpler ops; requires rigorous tests for tenant isolation.
**Review conditions:** If enterprise customers require physical isolation.

## ADR-011: Human verification

**Status:** Accepted (proposed)
**Context:** AI must not be source of truth; deadlines require confirmation.
**Alternatives:** Auto-apply high confidence, manual review all.
**Decision:** AI creates `ExtractedClaim` (pending). Only authorised roles can verify; verified claims create/update `AcademicEvent`. Unverified claims visible but marked unverified.
**Consequences:** Slower automation but safer; builds trust.
**Review conditions:** If accuracy metrics justify auto-apply for low-risk claims (never deadlines).

## ADR-012: WhatsApp ingestion

**Status:** Accepted (proposed)
**Context:** No unrestricted access to personal WhatsApp; privacy and ToS.
**Alternatives:** WhatsApp Business API, chat export parsing, manual paste.
**Decision:** MVP uses manual paste/forwarded text and WhatsApp chat export file upload. No live WhatsApp integration.
**Consequences:** Lower friction risk; manual effort for users.
**Review conditions:** If institution-approved WhatsApp Business integration becomes available.

## ADR-013: Deployment

**Status:** PROPOSED
**Context:** Hackathon target RumptyCloud; capabilities unknown.
**Alternatives:** RumptyCloud, Vercel+managed Postgres, Railway, Render.
**Decision:** Target RumptyCloud if it supports Next.js frontend + Node.js API + Postgres + env secrets; otherwise split frontend (Vercel) and backend (managed Node host).
**Consequences:** Deployment docs must include fallback.
**Review conditions:** After verifying RumptyCloud capabilities.

## ADR-014: ORM / query layer

**Status:** PROPOSED
**Context:** Need type-safe DB access and migrations.
**Alternatives:** Prisma, Drizzle, Kysely.
**Decision:** Drizzle (proposed) for SQL control and lightweight runtime; Prisma acceptable if team prefers.
**Consequences:** More SQL knowledge required; flexible.
**Review conditions:** Team skill survey / approval.
