# Design — Okoa Sem

Status: Proposed
Related: [System Design](./SYSTEM_DESIGN.md), [Implementation](./IMPLEMENTATION.md)

## 1. Design philosophy

- Clarity over decoration.
- Answer "What requires my attention right now?" first.
- Progressive disclosure: summary then detail.
- Consistent, accessible, responsive.
- Source transparency: show where info came from.

## 2. User personas

- Student (primary): busy, mobile-first, needs deadlines and changes.
- Lecturer: needs efficient publishing and verification.
- Class representative: bridges communication; needs low-friction submission.

## 3. User journeys

### Student MVP journey

Register -> set courses -> paste/upload academic info -> AI extracts pending claims -> track processing and verification outcome -> verified records appear on dashboard/calendar -> reminder -> assistant query.

Students can submit information and view permitted claim status/evidence, but do not approve, reject, merge, or verify claims/events. Authorised staff perform verification; pending claims remain labelled unverified.

### Lecturer journey

Login -> course workspace -> create/verify event -> notify students.

### Class rep journey

Login -> submit pasted message -> AI extracts -> lecturer verifies.

## 4. Information architecture

Top-level: Dashboard, Courses, Inbox, Calendar, Assignments, Assistant, Settings.

## 5. Navigation

- Desktop: left sidebar + top bar.
- Mobile: bottom tab bar (Dashboard, Courses, Inbox, Calendar, More).

## 6. Student experience

Dashboard cards: Today's focus, Upcoming deadlines (7 days), Recent changes, Unverified items, Quick actions.
Course workspace: events, assignments, materials, announcements.
Inbox: extracted claims, notifications, conflicts.
Calendar: month/week/agenda with verified event types colour-coded. Pending claims are shown as unverified items in the inbox, not as verified calendar events.

## 7. Lecturer experience

Course management, event creation/verification, assignment publishing, submission overview, announcement acknowledgement.

## 8. Class rep experience

Submit info, track processing status, see verification outcomes.

## 9. Dashboard layout

- Hero: "What requires attention" list.
- Grid: upcoming deadlines, recent changes, unverified, quick paste.
- Empty states guide first action.

## 10. Course workspace

Tabs: Overview, Events, Assignments, Materials, Announcements, Sources.

## 11. Academic inbox

Unified list of claims, notifications, conflicts with filters and actions.

## 12. Calendar

Views: month, week, agenda. Event chips with type colour and verification badge.

## 13. Assignment workflow

List -> detail -> submission upload -> status -> grade/feedback.

## 14. Academic assistant

Chat panel with suggested prompts; answers with citations; shows unverified caveat.

## 15. Responsive behaviour

- Mobile-first; breakpoints sm/md/lg.
- Touch targets >=44px.
- Tables convert to cards on small screens.

## 16. Accessibility

- WCAG 2.1 AA.
- Keyboard navigation, focus states, ARIA labels, colour contrast.

## 17. Design system foundations

- Tokens: colour, spacing, typography, radius, shadow.
- Theme: light default; dark mode future.
- Typography: system/Inter; clear hierarchy.

## 18. Component inventory

Button, Input, Textarea, Select, Modal, Card, Badge, Table, Tabs, Calendar, Toast, EmptyState, Skeleton, ChatBubble, FileUpload, Timeline.

## 19. States

- Loading: skeletons.
- Error: inline + retry.
- Empty: guidance + CTA.
- Success: toast + inline confirmation.
- Processing: status badge (pending/processing/done/failed).
