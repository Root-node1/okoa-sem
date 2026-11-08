# PRESENTATION_READINESS.md

Status: Ready with limitations

## 1. Overall readiness

Ready with limitations.

The backend authentication, authorization, and claims verification workflow can be demonstrated. The frontend is a buildable scaffold but most feature pages are placeholders.

## 2. Demonstration checklist

### Prerequisites

- Node.js 22+
- PostgreSQL 16+
- Isolated test database
- Backend dependencies installed
- Frontend dependencies installed

### Environment setup

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set `DATABASE_URL` to an isolated database. Do not use production data.

```bash
npm --prefix backend run migrate
npm --prefix backend run dev
npm --prefix frontend run dev
```

### Test accounts

Create synthetic accounts during the demo using registration, or seed them in the isolated database. Do not use real student data or production secrets.

### Exact demonstration sequence

1. Show `GET /api/v1/health`.
2. Show `GET /api/v1/health/database`.
3. Register a student.
4. Log in as the student.
5. Call `GET /api/v1/auth/me`.
6. Log out and show `/me` returns 401.
7. Seed or log in as a lecturer with course access.
8. Show a pending extracted claim.
9. Approve the claim and show the resulting verified academic event.
10. Show a student cannot approve the same claim.
11. Show source provenance and audit records in the database.

### Expected results

- Authentication lifecycle works.
- Protected endpoints enforce sessions.
- Role authorization is enforced server-side.
- Approved claims create verified events.
- Unapproved claims remain pending.

### Known limitations

- Source submission and extraction are service-level, not exposed through HTTP routes.
- Frontend pages are placeholders.
- Gemini extraction was not tested with a live provider.
- Cloudinary production upload was not tested.
- Visual frontend verification was not performed.

### Backup plan

If live services fail, use the backend test suite and Postman collection to demonstrate the implemented API. Use mock AI provider mode.

## 3. Technical talking points

- Okoa Sem addresses fragmented academic information by converting communication into traceable academic records.
- Architecture is React/Vite frontend, Node/Express API, PostgreSQL.
- AI creates pending claims only.
- Human verification is mandatory before authoritative records.
- Provenance is preserved through source and claim IDs.
- Authorization is enforced server-side by workspace and course membership.
- Current implementation status: auth, health, claims verification, extraction services, worker, and Cloudinary foundation are implemented; student APIs and frontend integration are incomplete.
EOF
echo done