# API Design — Okoa Sem

Status: Proposed (all contracts proposed)
Related: [System Design](./SYSTEM_DESIGN.md), [Data Model](./DATA_MODEL.md), [Integration Contracts](./INTEGRATION_CONTRACTS.md)

## 1. Architecture

- Frontend: Next.js.
- Backend: Node.js + JavaScript (ES modules) + Express REST API.
- Base path: `/api/v1`.
- Frontend communicates only through documented API contracts.

## 2. Environment configuration

- `NEXT_PUBLIC_API_BASE_URL` for frontend.
- `API_BASE_URL` / `PORT` for backend.
- CORS origin configured to frontend origin(s).

## 3. Authentication and sessions

- Backend auth middleware resolves user + tenant context.
- Session via httpOnly cookie or bearer token for non-browser clients.
- All protected endpoints require authenticated session.
- Role and tenant checks enforced server-side.

## 4. CORS policy

- Allow frontend origin(s) only.
- Credentials allowed for cookie auth.
- Preflight handled by backend middleware.

## 5. Conventions

- JSON request/response. Content-Type `application/json`.
- Timestamps: ISO 8601 UTC.
- IDs: UUID strings.
- Pagination: `?page=1&pageSize=20` (max 100). Response includes `meta: { page, pageSize, total }`.
- Filtering: query params documented per endpoint.
- Sorting: `?sort=field&order=asc|desc`.

## 6. Typed contracts

- Shared TypeScript types in `src/contracts` (frontend) and backend schema modules.
- Zod schemas validate request/response.
- Frontend API client uses typed responses.
- Breaking changes require version bump (e.g., `/api/v2`).

## 7. Error response format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": [{ "field": "dueAt", "message": "Invalid date" }],
    "requestId": "uuid"
  }
}
```

Status codes: 200, 201, 202, 204, 400, 401, 403, 404, 409, 422, 429, 500.

## 8. Frontend states

- Loading: skeletons/spinners.
- Validation: inline field errors.
- Error: retry + support info.
- Empty: guidance + CTA.
- Processing: status badge for async jobs.

## 9. Endpoints (proposed)

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/magic-link`

### Academic profile
- `GET /me/profile`
- `PATCH /me/profile`
- `GET /me/dashboard` — student dashboard summary: today's focus, upcoming deadlines (next 7 days), recent changes, and permitted pending claims. Pending claims must be labelled unverified and excluded from verified academic events. Quick actions are frontend navigation, not dashboard data.

### Institutions (admin)
- `GET /institutions/:id`
- `PATCH /institutions/:id`
- `POST /institutions/:id/departments`
- `POST /institutions/:id/programmes`
- `POST /institutions/:id/terms`

### Courses and enrolments
- `GET /courses?institutionId=`
- `POST /courses`
- `GET /course-offerings?termId=&classGroupId=`
- `POST /course-offerings`
- `GET /me/enrolments`
- `POST /me/enrolments`
- `DELETE /me/enrolments/:id`

### Ingestion
- `POST /ingestion/text`
- `POST /ingestion/upload`
- `GET /ingestion/:id`
- `POST /ingestion/:id/reprocess`

### Documents
- `GET /documents/:id`
- `GET /documents/:id/text`

### Extracted claims
- `GET /claims?status=&courseOfferingId=`
- `GET /claims/:id`
- `POST /claims/:id/approve`
- `POST /claims/:id/reject`
- `POST /claims/:id/merge`
- Claim reads are filtered by the authenticated user's role and data access. Student clients are read-only for claims; approve/reject/merge actions require the appropriate staff permission.

### Verification
- `POST /events/:id/verify`
- `POST /events/:id/reject`
- `GET /events/:id/history`

### Academic events
- `GET /events?from=&to=&courseOfferingId=&type=`
- `POST /events`
- `GET /events/:id`
- `PATCH /events/:id`
- `DELETE /events/:id`

### Assignments
- `GET /assignments?courseOfferingId=&status=`
- `POST /assignments`
- `GET /assignments/:id`
- `PATCH /assignments/:id`

### Submissions
- `GET /submissions?assignmentId=&studentId=`
- `POST /submissions`
- `GET /submissions/:id`
- `PATCH /submissions/:id/grade`

### Calendar
- `GET /calendar?from=&to=&view=month|week|agenda`
- Student calendar results contain verified academic events visible to the authenticated student through their enrolments. Pending claims are surfaced separately as unverified items and do not appear as verified events.

### Reminders
- `GET /reminders`
- `POST /reminders`
- `PATCH /reminders/:id`
- `DELETE /reminders/:id`

### Notifications
- `GET /notifications?unread=`
- `POST /notifications/:id/read`
- `POST /notifications/read-all`

### Academic assistant
- `POST /assistant/query`
- `GET /assistant/history`

### Admin/monitoring (future)
- `GET /admin/jobs`
- `GET /admin/audit-logs`

## 10. Contract rules

- All proposed endpoints must be implemented behind feature flags until stable.
- Breaking changes require version bump.
- Shared types live in `src/contracts`.
- AI never calls endpoints directly; agent tools wrap backend services.
- Backend is the sole authority for domain state.
