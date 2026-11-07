# Team Workflow — Okoa Sem

Status: Proposed

## 0. RACI matrix

R=Responsible, A=Accountable, C=Consulted, I=Informed. One A per deliverable.

| Deliverable | PL | FE | BE | AI | DO | DX |
|---|---|---|---|---|---|---|
| Product requirements | A | C | C | C | I | R |
| MVP scope | A | C | C | C | I | R |
| System architecture | A | C | C | C | C | I |
| UI/UX design | A | R | I | I | I | A |
| Frontend implementation | I | A | C | I | C | R |
| Backend implementation | I | C | A | C | C | I |
| Database design | I | I | A | C | C | I |
| AI extraction | I | I | C | A | I | C |
| Agent tools | I | I | C | A | I | C |
| API contracts | A | C | R | C | I | C |
| Security | A | C | R | C | R | I |
| CI/CD | I | I | C | I | A | I |
| Testing | I | R | R | R | A | R |
| Integration | A | R | R | R | R | R |
| Deployment | I | I | C | I | A | I |
| Documentation | A | C | C | C | C | R |
| Demo acceptance | A | C | C | C | C | R |

## 1. Communication

- Daily async standup (what done, next, blockers) in team channel.
- Weekly integration checkpoint (demo + contract review).
- Decisions recorded in ADRs.

## 2. Kanban flow

Backlog -> Ready -> In Progress -> Review -> Integration -> Done.

- WIP limit: 1 task per developer in progress (max 2 for small tasks).
- Avoid multiple developers editing same files; coordinate via contracts.

## 3. Task ownership

- One accountable owner per task (see backlog).
- Contributors support; owner merges.

## 4. Branch strategy

- `main` protected.
- Branch naming: `feature/T-123-short-desc`, `fix/T-123-desc`.
- Rebase or merge; team chooses one (proposed: squash merge).

## 5. Pull request workflow

- PR references task ID.
- CI must pass.
- At least one review from another workstream for cross-module changes.
- Small PRs (<400 lines) preferred.

## 6. Code review

- Review for correctness, tests, security, contract compliance.
- Use checklist in DEVELOPMENT_GUIDELINES.

## 7. Definition of ready

- Task has ID, owner, acceptance criteria, deps clear.
- Contracts updated if needed.

## 8. Definition of done

- Code merged, tests pass, docs updated, demoable.

## 9. Integration checkpoints

- End of each milestone: integration demo.
- Contract freeze 24h before checkpoint.

## 10. Conflict resolution

- Technical disputes escalated to Product Lead/System Architect.
- ADR documents outcome.

## 11. Daily progress reporting

- Standup template: Done/Next/Blockers.
- Blockers raised immediately.
