# Student API Contracts — Okoa Sem

Status: PROPOSED (contracts for implementation; no endpoints are implemented yet)
Owner: Developer D with Developer A
Related: [System design](./system_design.md), [Tickets](./tickets/README.md)

## 1. General conventions

- Base path: `/api/v1`
- Authentication: HttpOnly session cookie `okoa_session`; frontend uses `credentials: "include"`.
- Authorization: backend-only. A valid session is required. Student endpoints require an active `student` workspace membership. Course-scoped data requires an active course enrolment.
- Request/response: JSON, `Content-Type: application/json`.
- Timestamps: ISO 8601 UTC.
- IDs: UUID strings.
- Error envelope:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": [{ "field": "field", "message": "Invalid value" }],
    "requestId": "uuid"
  }
}
```

- Status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500.
- Pagination (PROPOSED): `?page=1&pageSize=20` (max 100), response `meta: { page, pageSize, total }`.
- Filtering/sorting (PROPOSED): query parameters documented per endpoint.

## 2. Workspace selection

- `workspaceId` is optional on student endpoints.
- If omitted, the endpoint may aggregate across all active student workspaces for the authenticated user.
- If provided, it must match an active `student` workspace membership; otherwise return 403.
- Course filters must belong to the selected or permitted workspace and to the user's enrolments.

## 3. Confirmed vs pending information

- Academic information, calendar and assignment endpoints return only confirmed academic records.
- Pending extracted claims, conflicts and processing status are exposed only through source/status and review contracts.
- Unverified information must never be presented as confirmed academic information.

## 4. Endpoint contracts

### 4.1 Dashboard

`GET /api/v1/student/dashboard` — PROPOSED

Query: `workspaceId?`

Response 200:

```json
{
  "data": {
    "workspace": { "id": "uuid", "name": "string", "code": "string" },
    "upcomingDeadlines": [
      { "id": "uuid", "title": "string", "courseCode": "string", "dueAt": "ISO-8601", "status": "not_submitted" }
    ],
    "recentChanges": [
      { "entityType": "academic_event", "entityId": "uuid", "title": "string", "changedAt": "ISO-8601" }
    ],
    "unverifiedItems": [
      { "sourceId": "uuid", "title": "string", "status": "pending", "submittedAt": "ISO-8601" }
    ]
  }
}
```

### 4.2 Enrolled courses

`GET /api/v1/student/courses` — PROPOSED

Query: `workspaceId?`

Response 200:

```json
{
  "data": [
    { "id": "uuid", "code": "string", "name": "string", "workspaceId": "uuid", "enrolledAt": "ISO-8601" }
  ]
}
```

### 4.3 Confirmed academic information

`GET /api/v1/student/academic-information` — PROPOSED

Query: `workspaceId?`, `courseId?`, `type?`, `from?`, `to?`, `page?`, `pageSize?`

Response 200:

```json
{
  "data": [
    {
      "id": "uuid",
      "workspaceId": "uuid",
      "courseId": "uuid",
      "courseCode": "string",
      "courseName": "string",
      "type": "cat",
      "title": "string",
      "description": "string",
      "startAt": "ISO-8601",
      "endAt": "ISO-8601",
      "venue": "string",
      "status": "verified",
      "sourceClaimId": "uuid",
      "version": 1,
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 0 }
}
```

Only records with status `verified` are returned.

### 4.4 Assignments

`GET /api/v1/student/assignments` — PROPOSED

Query: `workspaceId?`, `courseId?`, `status?` (`upcoming`, `overdue`, `completed`), `page?`, `pageSize?`

Response 200:

```json
{
  "data": [
    {
      "id": "uuid",
      "courseId": "uuid",
      "courseCode": "string",
      "courseName": "string",
      "title": "string",
      "instructions": "string",
      "dueAt": "ISO-8601",
      "status": "not_submitted",
      "maxScore": 100,
      "createdAt": "ISO-8601"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 0 }
}
```

### 4.5 Deadlines

`GET /api/v1/student/deadlines` — PROPOSED

Query: `workspaceId?`, `courseId?`, `from?`, `to?`

Response 200:

```json
{
  "data": [
    {
      "id": "uuid",
      "sourceType": "assignment",
      "title": "string",
      "courseId": "uuid",
      "courseCode": "string",
      "dueAt": "ISO-8601",
      "status": "not_submitted"
    }
  ]
}
```

### 4.6 Calendar

`GET /api/v1/student/calendar` — PROPOSED

Query: `from` (required), `to` (required), `workspaceId?`, `courseId?`, `view?` (`month`, `week`, `agenda`)

Response 200:

```json
{
  "data": [
    {
      "id": "uuid",
      "type": "cat",
      "title": "string",
      "courseId": "uuid",
      "courseCode": "string",
      "startAt": "ISO-8601",
      "endAt": "ISO-8601",
      "venue": "string",
      "status": "verified"
    }
  ]
}
```

### 4.7 Personal tasks

`GET /api/v1/student/tasks` — PROPOSED

Query: `workspaceId?`, `status?`, `page?`, `pageSize?`

Response 200:

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "dueAt": "ISO-8601",
      "courseId": "uuid",
      "status": "todo",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 0 }
}
```

`POST /api/v1/student/tasks` — PROPOSED

Request:

```json
{
  "title": "string",
  "description": "string",
  "dueAt": "ISO-8601",
  "courseId": "uuid",
  "priority": "low"
}
```

Response 201: `{ "data": { "id": "uuid" } }`

`PATCH /api/v1/student/tasks/:id` — PROPOSED

Request: partial task fields.

Response 200: `{ "data": { "id": "uuid" } }`

`DELETE /api/v1/student/tasks/:id` — PROPOSED

Response 204.

Personal task persistence is PROPOSED and requires a migration owned by Developer D.

### 4.8 Source submission and status

`POST /api/v1/student/sources` — PROPOSED

Request:

```json
{
  "workspaceId": "uuid",
  "courseId": "uuid",
  "type": "text",
  "text": "string"
}
```

Response 201:

```json
{
  "data": {
    "id": "uuid",
    "status": "pending",
    "submittedAt": "ISO-8601"
  }
}
```

`GET /api/v1/student/sources/:id/status` — PROPOSED

Response 200:

```json
{
  "data": {
    "id": "uuid",
    "status": "processing",
    "failureReason": "string",
    "extractedClaimCount": 0,
    "updatedAt": "ISO-8601"
  }
}
```

Source ingestion and extraction are NOT YET IMPLEMENTED.

### 4.9 Submissions

`GET /api/v1/student/submissions` — PROPOSED

Query: `assignmentId?`, `page?`, `pageSize?`

Response 200:

```json
{
  "data": [
    {
      "id": "uuid",
      "assignmentId": "uuid",
      "status": "submitted",
      "submittedAt": "ISO-8601",
      "grade": 0,
      "feedback": "string"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 0 }
}
```

`POST /api/v1/student/submissions` — PROPOSED

Request:

```json
{
  "assignmentId": "uuid",
  "fileId": "uuid"
}
```

Response 201: `{ "data": { "id": "uuid", "status": "submitted" } }`

`GET /api/v1/student/submissions/:id` — PROPOSED

Response 200: submission detail.

Submission storage is PROPOSED and requires backend coordination.

## 5. Authorization requirements

- All endpoints require an authenticated session.
- Student endpoints require an active `student` workspace membership.
- Course-scoped data requires an active course enrolment.
- A student may only read their own submissions and personal tasks.
- Unverified claims are never returned as confirmed academic information.

## 6. Error responses

- 401 `UNAUTHENTICATED`: no valid session.
- 403 `FORBIDDEN`: valid session but insufficient workspace/course role.
- 404 `NOT_FOUND`: resource not found or not visible.
- 422 `VALIDATION_ERROR`: invalid request parameters or body.
- 409 `CONFLICT`: duplicate or conflicting operation.
- 429 `RATE_LIMITED`: too many requests.
- 500 `INTERNAL_ERROR`: unexpected server failure.

## 7. Unresolved decisions

- Whether `workspaceId` is required or optional on all endpoints.
- Final personal task schema and migration.
- Final submission upload flow and file ownership.
- Whether deadlines are a separate endpoint or derived from assignments/calendar.
- Pagination defaults and maximum page size.
