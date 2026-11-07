# Agent Design — Okoa Sem

Status: Proposed
Related: [AI Architecture](./AI_ARCHITECTURE.md), [API Design](./API_DESIGN.md), [Security](./SECURITY.md)

## 1. Primary agent: Academic Coordinator Agent

One primary agent for MVP. No multi-agent orchestration.

### Responsibilities

- Answer student academic questions using stored records.
- Summarise upcoming events/deadlines.
- Detect deadline conflicts and missing info (via tools).
- Propose reminders and actions.
- Explain source/provenance.

### Boundaries

- Cannot modify authoritative records.
- Cannot verify/reject claims without human approval.
- Cannot access data outside user permissions.
- Cannot execute arbitrary code or DB queries.

### Context

- User profile, enrolments, current term.
- Retrieved verified events/assignments.
- Pending claims labelled unverified.
- Tool results.

### Tools

| Tool | Purpose | Permission |
|---|---|---|
| `get_student_courses` | List enrolled course offerings | student+ |
| `get_upcoming_events` | Events in date range | student+ (scoped) |
| `extract_academic_information` | Trigger extraction on a source | staff/system |
| `detect_deadline_conflicts` | Analyse conflicts | student+ (scoped) |
| `search_academic_sources` | Search source documents | student+ (scoped) |
| `get_submission_status` | Submission status | student (own) / staff |
| `propose_academic_event` | Create pending claim/proposal | staff |
| `request_event_verification` | Request human verification | staff |
| `create_reminder` | Create reminder for user | student+ (own) |

### Tool contracts

- Each tool accepts validated input (Zod) and returns typed output.
- Tools call backend services, not DB directly.
- Permission checks inside service layer.
- All tool calls logged in `AgentRun`.

### Triggers

- User chat query.
- Scheduled briefing (daily/weekly) -> agent generates summary using tools.
- Event change -> notification flow (agent optional).

### Human approval

- Any record creation/verification requires human confirmation.
- Agent can propose; backend creates pending claim; user/staff verifies.

### Audit history

- `AgentRun` stores input summary, tools used, output summary, timestamps, token usage.
- No raw PII in logs beyond necessary.

### Failure behaviour

- Tool failure: report to user, no partial writes.
- Provider failure: graceful message, suggest retry.
- Timeout: cancel and log.
