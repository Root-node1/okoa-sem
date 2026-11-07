# Development Guidelines — Okoa Sem

Status: Proposed

## 1. Code standards

- TypeScript strict mode.
- ESLint + Prettier.
- No `any` without justification.
- Prefer pure functions in domain layer.

## 2. Module boundaries

- Backend modules under `src/server/modules/*`.
- Public module index only; no deep imports.
- Frontend features under `src/features/*`.
- Shared contracts in `src/contracts`.

## 3. Naming conventions

- Files: kebab-case.
- Components: PascalCase.
- Functions/variables: camelCase.
- DB tables: snake_case.
- Env vars: UPPER_SNAKE_CASE.

## 4. Environment handling

- `.env.example` committed; `.env.local` gitignored.
- Validate env at startup with Zod.

## 5. Commit conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`.
- Reference task ID in commit body.

## 6. Testing requirements

- Tests for new domain logic and endpoints.
- Tenant isolation tests for new resources.
- No merge with failing tests.

## 7. AI coding agent rules

- Do not modify authoritative records from AI code.
- Validate all AI output with Zod.
- Preserve provenance fields.
- Do not introduce new dependencies without approval.

## 8. Review expectations

- Check contract changes.
- Check security/permissions.
- Check migration safety.
- Check accessibility for UI.
