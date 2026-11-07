# Frontend API Contracts — Okoa Sem

Status: PROPOSED (contracts for implementation; endpoints are not implemented yet)
Owner: Developer D with Developer C
Related: [System design](./system_design.md), [Student API contracts](./student-api-contracts.md), [Source and extraction contracts](./source-extraction-contracts.md), [Tickets](./tickets/README.md)

## 1. General rules

- Base URL: `http://localhost:5000` in development; API prefix `/api/v1`.
- Frontend stack: React, TypeScript, Vite, Tailwind CSS, React Router.
- All requests use `credentials: "include"`.
- Session tokens are never stored in localStorage or sessionStorage.
- Frontend uses roles for display only; backend enforces authorization.
- Error responses use the standard error envelope.

## 2. Authentication flow

1. App load calls `GET /api/v1/auth/me`.
2. 200: set authenticated user and memberships.
3. 401: clear auth state and route to login.
4. Login calls `POST /api/v1/auth/login`; backend sets `okoa_session`.
5. Logout calls `POST /api/v1/auth/logout`; clear auth state.
6. Expired/invalid session is treated as logged out.

## 3. TypeScript interfaces

```ts
type UserRole = 'student' | 'class_rep' | 'lecturer'

interface User {
  id: string
  email: string
  fullName: string
  accountStatus: 'active' | 'suspended' | 'inactive'
  emailVerified: boolean
  memberships: WorkspaceMembership[]
}

interface WorkspaceMembership {
  id: string
  workspaceId: string
  workspaceName: string
  workspaceCode: string
  role: UserRole
  status: 'active' | 'suspended' | 'removed'
}

interface ApiError {
  error: {
    code: string
    message: string
    details?: { field: string; message: string }[]
    requestId?: string
  }
}
```

Additional entity interfaces must mirror backend contracts in `student-api-contracts.md` and `source-extraction-contracts.md`.

## 4. API client requirements

- Centralized client in `frontend/src/services/api.ts`.
- Always send `credentials: "include"`.
- Set `Content-Type: application/json`.
- Parse error envelope on non-2xx responses.
- Treat 204 as no content.
- Do not expose secrets or Cloudinary credentials.

## 5. UI states

Every data view must handle:
- Loading: skeleton or spinner.
- Empty: guidance and call to action.
- Error: retry and support information.
- Processing: status badge (`pending`, `processing`, `completed`, `failed`).
- Unverified: clearly distinguish pending claims from confirmed academic information.

## 6. Role-based navigation

- Navigation may use memberships for display.
- Route protection must still verify auth with backend.
- No frontend-only authorization is authoritative.

## 7. Unresolved decisions

- Whether frontend uses generated types or hand-maintained interfaces.
- Mocking strategy before endpoints are available.
- Pagination component conventions.
