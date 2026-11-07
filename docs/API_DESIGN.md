# API Design — Okoa Sem

Status: Proposed (all contracts proposed)
Related: [System Design](./SYSTEM_DESIGN.md), [Data Model](./DATA_MODEL.md), [Integration Contracts](./INTEGRATION_CONTRACTS.md)

## 1. Conventions

- Base path: `/api/v1`.
- JSON request/response. Content-Type `application/json`.
- Authentication: httpOnly session cookie; `Authorization: Bearer` optional for non-browser clients.
- Timestamps: ISO 8601 UTC.
- IDs: UUID strings.
- Pagination: `?page=1&pageSize=20` (max 100). Response includes `meta: { page, pageSize, total }`.
- Filtering: query params documented per endpoint.
- Sorting: `?sort=field&order=asc|desc`.

## 2. Error response format

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

## 3. Authentication endpoints (proposed)

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/magic-link`

## 4. Academic profile

- `GET /me/profile`
- `PATCH /me/profile`

## 5. Institutions (admin)

- `GET /institutions/:id`
- `PATCH /institutions/:id`
- `POST /institutions/:id/departments`
- `POST /institutions/:id/programmes`
- `POST /institutions/:id/terms`

## 6. Courses and enrolments

- `GET /courses?institutionId=`
- `POST /courses`
- `GET /course-offerings?termId=&classGroupId=`
- `POST /course-offerings`
- `GET /me/enrolments`
- `POST /me/enrolments` (join by code)
- `DELETE /me/enrolments/:id`

## 7. Ingestion

- `POST /ingestion/text` body `{ sourceType, text, courseId? }` -> 202 `{ communicationSourceId, status }`
- `POST /ingestion/upload` multipart file -> 202
- `GET /ingestion/:id` status + extracted claims
- `POST /ingestion/:id/reprocess`

## 8. Documents

- `GET /documents/:id`
- `GET /documents/:id/text`

## 9. Extracted claims

- `GET /claims?status=&courseOfferingId=`
- `GET /claims/:id`
- `POST /claims/:id/approve`
- `POST /claims/:id/reject` body `{ reason }`
- `POST /claims/:id/merge` body `{ targetClaimId }`

## 10. Verification

- `POST /events/:id/verify`
- `POST /events/:id/reject`
- `GET /events/:id/history`

## 11. Academic events

- `GET /events?from=&to=&courseOfferingId=&type=`
- `POST /events`
- `GET /events/:id`
- `PATCH /events/:id`
- `DELETE /events/:id` (soft)

## 12. Assignments

- `GET /assignments?courseOfferingId=&status=`
- `POST /assignments`
- `GET /assignments/:id`
- `PATCH /assignments/:id`

## 13. Submissions

- `GET /submissions?assignmentId=&studentId=`
- `POST /submissions` (multipart)
- `GET /submissions/:id`
- `PATCH /submissions/:id/grade`

## 14. Calendar

- `GET /calendar?from=&to=&view=month|week`

## 15. Reminders

- `GET /reminders`
- `POST /reminders`
- `PATCH /reminders/:id`
- `DELETE /reminders/:id`

## 16. Notifications

- `GET /notifications?unread=`
- `POST /notifications/:id/read`
- `POST /notifications/read-all`

## 17. Academic assistant

- `POST /assistant/query` body `{ question, context? }` -> `{ answer, sources: [{ type, id, snippet }], confidence }`
- `GET /assistant/history`

## 18. Admin/monitoring (future)

- `GET /admin/jobs`
- `GET /admin/audit-logs`

## 19. Contract rules

- All proposed endpoints must be implemented behind feature flags until stable.
- Breaking changes require version bump.
- Shared types live in `src/contracts`.
- AI never calls endpoints directly; agent tools wrap backend services.
