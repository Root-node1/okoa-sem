# REMEDIATION_PLAN.md

Status: Audit completed 2026-11-07

## Fixed during audit

| ID | Priority | Files changed | Verification |
|---|---|---|---|
| V-01 | P1 | `backend/src/modules/claims/claims.service.js` | `claims.test.js` passes |
| V-02 | P1 | `backend/src/modules/claims/claims.service.js` | Code review and targeted test |
| V-03 | P1 | `frontend/src/services/api.ts`, `frontend/src/context/AuthContext.tsx`, login/register pages | `npm run build` passes |
| V-04 | P1 | `backend/src/modules/auth/auth.controller.js` | Backend tests pass |
| V-05 | P2 | `.gitignore` | File inspected |
| Build defect | P2 | `frontend/src/pages/RegisterPage.tsx` | `npm run build` passes |
| Test reset defect | P2 | `backend/tests/extraction.test.js` | Backend tests pass |
| Frontend role defect | P2 | `frontend/src/pages/RegisterPage.tsx` | `npm run build` passes |

## Outstanding issues

| ID | Priority | Action |
|---|---|---|
| V-06 | P2 | Repair frontend lint setup |
| V-07 | P2 | Productionize Docker Compose |
| V-08 | P2 | Resolve unused `AUTH_SECRET` |
| V-09 | P2 | Define email verification policy |
| V-10 | P2 | Clarify root Next.js prototype status |
| V-11 | P3 | Add CSRF protection if needed |
| V-12 | P3 | Implement account recovery later |

## Recommended next actions

1. Expose and secure ingestion/extraction HTTP APIs before frontend integration.
2. Implement student API endpoints.
3. Replace frontend placeholder pages with real API-backed views.
4. Add frontend automated tests.
5. Add CI for backend lint and security checks.
6. Rotate the local Gemini API key if it has been exposed.
EOF
echo done