# PROJECT.md

# Academic Coordination Platform --- Frontend Product & Experience Specification

> **Document purpose:** This is the product and frontend source of truth
> for the coding agent. It defines what the application is, who it
> serves, how the interface should behave, and what the frontend must
> communicate. It intentionally does not specify backend implementation.

---

## 1. Product identity

### 1.1 Product definition

Build an **Academic Coordination Platform** for university students,
lecturers, class representatives and academic administrators.

The platform brings academic information and academic activity into one
coherent workspace. It helps people understand what is happening, what
requires attention, what is due, what has changed, and where
authoritative information can be found.

The product is not simply: - a learning management system (LMS); - a
chat application; - a lecturer-only assignment marking tool; - a student
task manager; - a dashboard full of charts; - an AI chatbot wrapped
around course information.

It is a coordination layer for the everyday academic life of a
university.

### 1.2 The problem

**Academic information is everywhere, but academic coordination is
nowhere.**

Students often reconstruct their academic responsibilities from
scattered announcements, class messages, documents, course portals,
lecturer instructions and informal updates. Lecturers communicate with
multiple classes and manage assignments, materials, questions and
deadlines. Class representatives often become unofficial information
intermediaries.

The result is fragmented information, repeated questions, uncertainty
about which update is authoritative, missed deadlines and unnecessary
coordination work.

The frontend must make this problem visibly easier to manage.

### 1.3 Product promise

> Convert fragmented academic communication into a reliable,
> understandable academic workspace that tells each person what is
> happening, what needs attention, what is due and what has changed.

The core product loop is:

1.  **Understand** --- make academic information easy to find and
    interpret.
2.  **Organise** --- place information in the correct course, timeline
    and workflow.
3.  **Coordinate** --- make responsibilities, changes, outstanding
    actions and confirmations visible.

### 1.4 The most important design question

For every screen, ask:

> What does this person need to understand or accomplish here, and what
> is the shortest clear path to doing it?

Do not design a screen merely because a component exists or because the
current route needs to be filled.

---

## 2. Product principles

These principles take priority over individual visual preferences.

### 2.1 Clarity before density

Show useful information without forcing users to decode the interface.
Density is appropriate for queues, tables and professional workspaces,
but not every page should be dense.

Use progressive disclosure: - show the most important information
first; - reveal supporting details when needed; - keep secondary
metadata visually quiet; - avoid displaying every available property at
once.

### 2.2 The student's academic day is the primary experience

The student experience should answer, quickly: - What is happening
today? - What is coming up? - What do I need to submit? - What has
changed? - What information is uncertain or awaiting confirmation? -
Where can I find the original announcement or material?

The student dashboard is not a generic analytics dashboard. It is an
actionable academic overview.

### 2.3 Every important fact needs context

Dates, deadlines, announcements and status labels should be associated
with a course, activity and, where appropriate, a source.

Do not show isolated numbers or ambiguous labels. For example: - Prefer
**"Calculus I · CAT · Tue, 17 Nov · 10:00 AM"** - Avoid **"17 Nov · High
priority"** without context.

### 2.4 Status must be understandable

Use plain language for states: - Confirmed - Awaiting confirmation -
Updated - Changed - Cancelled - Submitted - Under review - Feedback
available - Overdue

Do not rely on colour alone to communicate a state. Pair colour with a
label or icon.

### 2.5 Distinguish official information from informal information

The UI must distinguish confirmed academic information from a proposed
or unverified update. A class representative's message should not look
identical to an official lecturer announcement unless it has been
confirmed.

The interface should communicate uncertainty calmly and clearly. Never
make an uncertain date look definitive.

### 2.6 One product, multiple role experiences

Students, lecturers, class representatives and administrators share a
design language, but they do not share the same priorities or
navigation.

Do not force all roles into the same dashboard or workspace.

### 2.7 Task-oriented, not component-oriented

A page is successful when it supports a coherent user task. It is not
successful merely because it contains cards, tabs, tables, sidebars or
charts.

### 2.8 Functional realism

Use believable academic examples and realistic content lengths. Avoid
placeholder-heavy layouts, repetitive lorem ipsum, fake analytics and
decorative charts that do not answer a real question.

---

## 3. Users and their goals

### 3.1 Student --- primary product experience

The student needs to: - see a clear overview of academic
responsibilities; - understand upcoming CATs, exams, assignments and
lectures; - find announcements and course materials; - identify changes
to dates, venues or instructions; - distinguish confirmed information
from unconfirmed information; - track assignment submission and feedback
status; - retrieve the original source of an academic update; - ask
questions about their own academic information.

**The student's interface should feel like a personal academic command
centre, not an administrative control panel.**

### 3.2 Lecturer

The lecturer needs to: - see their courses and class groups; - publish
announcements and learning materials; - create and manage assignments; -
see submission progress; - review submissions and return feedback; -
communicate changes clearly; - reuse previous course materials or
assignments where appropriate.

The lecturer experience may use denser tables, queues and split-pane
workspaces because lecturers perform repeated management and review
tasks.

### 3.3 Class representative

The class representative needs to: - share class-level information; -
submit a proposed update or report; - communicate a class concern; - see
whether a lecturer has acknowledged or confirmed an update.

The interface must not imply that every class-representative post is an
official academic instruction.

### 3.4 Administrator

The administrator needs to: - understand the institution's academic
structure; - manage programmes, departments, class groups and academic
terms; - publish institution-wide or targeted notices; - manage roles
and permissions; - inspect activity and audit information.

The administrator experience should be operational and structured, not
visually identical to the student experience.

---

## 4. Frontend scope

### 4.1 In scope

This specification covers: - responsive application shell; - role-aware
navigation and page layouts; - student dashboard and academic
overview; - academic inbox and announcement presentation; - course list
and course workspaces; - academic calendar; - tasks and assignment
views; - submission status and feedback presentation; - lecturer
dashboard and course management views; - class representative views; -
administrator views; - reusable UI patterns; - mock data and frontend
service interfaces; - local interaction states and realistic
prototypes; - responsive behaviour, accessibility and visual
consistency.

### 4.2 Out of scope for this frontend phase

Do not independently start implementing: - database schemas or
migrations; - API routes or server actions; - authentication providers
or production session management; - real email, WhatsApp or SMS
integrations; - AI model orchestration or agent execution; - background
jobs or notification delivery infrastructure; - production file
storage; - payment systems; - deployment infrastructure.

The frontend may consume mock data through the existing service
interface. It may model future states in TypeScript, but must not invent
backend work.

### 4.3 Mock-data rule

Mock data should represent realistic university activity. Keep it
centralised in the existing `data/` directory and typed.

Do not hardcode unrelated examples inside individual components.
Components should receive typed data through props or existing frontend
services.

Use realistic content such as: - Calculus I (SMA 2104); - Introduction
to Programming (ICS 2101); - Discrete Mathematics; - Data Structures; -
CAT dates, assignment deadlines, lecture venue changes and uploaded
notes.

These are illustrative examples. Do not imply that fictional information
is a real university announcement.

---

## 5. Information architecture

The app should have a coherent navigation model. Navigation labels
should describe the user's work, not internal implementation
terminology.

### 5.1 Student navigation

Recommended primary navigation:

1.  **Overview** --- personal academic dashboard.
2.  **Academic Inbox** --- announcements, updates, documents and
    academic messages.
3.  **My Courses** --- course workspaces.
4.  **Calendar** --- academic schedule and deadlines.
5.  **My Tasks** --- assignments and other actions requiring the
    student's attention.
6.  **Announcements** --- browsable academic notices, if separate from
    the inbox is useful.
7.  **AI Assistant** --- contextual academic questions and summaries.
8.  **Settings** --- profile, preferences and notification settings.

Avoid duplicating the same content in multiple destinations without a
clear reason. If Announcements is simply a filter inside Academic Inbox,
do not create a redundant standalone page just to fill the navigation.

### 5.2 Lecturer navigation

Recommended: 1. Overview 2. My Courses / Classes 3. Assignments 4.
Submissions 5. Course Materials 6. Academic Calendar 7. Announcements 8.
Archive 9. Settings

### 5.3 Class representative navigation

Recommended: 1. Overview 2. Class Updates 3. Announcements 4. Questions
& Concerns 5. Course Information

### 5.4 Administrator navigation

Recommended: 1. Institution Overview 2. Departments & Programmes 3.
Academic Terms 4. Class Groups 5. Students & Lecturers 6. Institutional
Announcements 7. Audit & Permissions 8. Settings

### 5.5 Navigation behaviour

- Make the current location unmistakable.
- Use labels and icons together where space permits.
- Keep primary navigation stable across routes.
- Group secondary links logically.
- Do not use icon-only navigation without accessible labels or
  tooltips.
- On smaller screens, convert the sidebar into a drawer or compact
  navigation pattern.
- Avoid deeply nested navigation that makes users lose their location.

---

## 6. Core screen specifications

These are experience requirements, not permission to build every screen
at once. Build coherent flows in priority order.

### 6.1 Student overview / dashboard

**Purpose:** Answer "What requires my attention right now?"

Recommended hierarchy:

1.  Page heading and current academic context (semester, programme or
    year).
2.  A concise academic briefing.
3.  Today's schedule / next academic activity.
4.  Upcoming assessments and deadlines.
5.  Tasks requiring action.
6.  Recent announcements and changes.
7.  Course overview or quick access to courses.

The page should prioritise urgency and time: - overdue or due soon; -
today; - next few days; - later.

A briefing should be concise and actionable, not a long AI-generated
paragraph. Example:

> You have one assignment due tomorrow, a Calculus CAT next week, and
> one timetable update awaiting confirmation.

Each item should link to the relevant detail.

Do not fill the dashboard with: - decorative KPI cards; - arbitrary
percentages; - charts without a decision-making purpose; - repeated
lists of the same events; - large empty hero sections.

A compact metric can be useful when it answers a real question, e.g. "2
tasks due this week". It should not dominate the screen.

### 6.2 Academic inbox

**Purpose:** Help a student find, understand and act on academic
communication.

The inbox should feel like a well-organised information workspace, not a
support-ticket system.

Useful features: - search; - filters by course, type, date and status; -
chronological or priority-based list; - clear unread/read state; -
source and sender information; - concise preview; - detail view with
original content; - extracted or summarised information where
available; - action links to course, event or assignment.

Possible categories: - All - Assignments - CATs & Exams - Lectures &
Timetable - Course Materials - University Notices - Changes - Awaiting
Confirmation

A split-pane layout is appropriate here on desktop: - list/queue on the
left; - selected message detail on the right.

On mobile, use a list page followed by a detail page. Do not squeeze
desktop columns into a narrow viewport.

The detail view should make these elements clear: - what was
communicated; - who communicated it; - when it was received; - which
course it relates to; - what academic action or event it represents; -
whether it is confirmed; - the original source content.

### 6.3 Course list

**Purpose:** Give students a simple route into each course workspace.

Use a responsive grid or clean list, depending on the number of courses
and the available space.

A course item may show: - course code; - course title; - lecturer; -
next upcoming activity; - outstanding task count; - recent update
indicator.

Do not turn every course into a large decorative card. The course code
and title should be easy to scan.

### 6.4 Course workspace

**Purpose:** Make each course a persistent home for its academic
information.

A course workspace may contain: - Overview - Announcements - Materials -
Assessments - Submissions

The course header should identify the course clearly and provide useful
context. Tabs should represent genuinely different content areas.

**Overview** should show: - course description or short context; -
lecturer and class information; - next activity; - upcoming
assessments; - recent announcements; - quick access to materials.

**Materials** should support a readable document/file list with file
type, title, date and uploader.

**Assessments** should show CATs, exams and assignments with dates and
status.

**Submissions** should show the student's own submission status and
feedback, not other students' private work.

### 6.5 Calendar

**Purpose:** Show academic commitments over time.

Provide day, week and month views when useful. A list/agenda view is
essential for small screens.

Event types may include: - lecture; - CAT; - exam; - assignment
deadline; - consultation; - university event.

Use restrained type indicators. The event title, course and time must
remain readable.

Distinguish: - confirmed events; - tentative events; - changed events; -
cancelled events.

Selecting an event should reveal its details and source context.
Calendar navigation should be predictable, and users should be able to
filter by course or event type.

### 6.6 My Tasks

**Purpose:** Turn academic responsibilities into a manageable action
list.

Show: - task title; - course; - due date; - status; - priority only when
meaningful; - action or destination.

Useful filters: - All - Upcoming - Due soon - Overdue - Submitted -
Completed

Do not confuse an academic event with a task. A lecture is an event;
submitting an assignment is an action. The interface may connect them,
but their meaning should remain distinct.

### 6.7 Assignment detail and submission

**Purpose:** Help the student understand requirements and complete a
submission confidently.

Show: - assignment title; - course; - lecturer; - published date; -
deadline and timezone; - instructions; - attached resources; - accepted
file formats or submission requirements; - current submission status; -
submission receipt/timestamp where available; - feedback and grade when
returned.

Use a clear status progression:
`Not submitted → Submitted → Under review → Reviewed → Feedback available`

Do not use a status label without explaining what it means when the
state is not self-evident.

### 6.8 Lecturer overview

**Purpose:** Give lecturers a useful operational view of teaching
responsibilities.

Prioritise: - courses/classes; - upcoming teaching activities; -
assignments requiring attention; - submissions awaiting review; - recent
student questions or class updates; - quick actions to publish material
or create an assignment.

A lecturer may benefit from a more information-dense layout than a
student. Density must still be intentional.

### 6.9 Lecturer review workspace

This is where the existing screenshot's three-pane design may be useful.

Use it for a focused task such as reviewing a submission: - left
navigation or course context; - middle submission queue; - main review
canvas; - optional collapsible context/rubric inspector.

Do not make the review workspace the default application shell for every
role and every route.

The review canvas should prioritise the student's actual work. A
discussion thread is supporting context, not necessarily the main
content. Rubric criteria should be clear, editable only when
appropriate, and connected to feedback.

For mathematical work: - render equations legibly; - preserve line
breaks and notation; - provide a readable source/code view where
appropriate; - do not force all mathematical content into a generic chat
bubble; - ensure LaTeX does not display as raw escaped text in the final
presentation.

### 6.10 Class representative workspace

Prioritise: - class updates; - questions and concerns; - notices
awaiting lecturer confirmation; - recently confirmed updates; -
course/class context.

Use explicit states such as "Submitted for confirmation" and "Confirmed
by lecturer". Do not style a proposed update as an official notice.

### 6.11 Administrator workspace

Prioritise structured management: - institution structure; - academic
terms; - departments and programmes; - class groups; - role
assignments; - notices and their target audiences; - audit information.

Tables and filters are appropriate for administrative data. Provide
clear empty states and confirmation before destructive actions.

---

## 7. Layout system

### 7.1 Layout is contextual

There is no universal page layout. Choose the layout based on the task.

Use: - **Dashboard layout** for overview and prioritisation. -
**List/detail layout** for inboxes and queues. - **Course workspace
layout** for course-specific content. - **Calendar layout** for
time-based navigation. - **Form layout** for creating or editing
structured information. - **Focused review layout** for lecturer
assessment and feedback. - **Table layout** for administrative
management.

### 7.2 Three-pane workspace

The current design system proposes: - icon rail: approximately 64px; -
navigation sidebar: approximately 240px; - queue/list: approximately
320--360px; - focus workspace: flexible; - context inspector:
approximately 300px.

Treat these as starting points, not fixed laws.

Rules: - Use the full multi-pane layout only when it materially improves
a workflow. - Allow the inspector to collapse. - Prevent horizontal
overflow. - At narrower desktop widths, collapse secondary panes before
compressing the main content. - On tablet/mobile, replace panes with
sequential navigation. - Do not put a 4-column layout on the student
overview page merely for consistency.

### 7.3 Content width and spacing

- Use consistent page gutters.
- Align page headings and content edges.
- Keep line lengths comfortable for reading.
- Use spacing to establish groups and hierarchy.
- Avoid both excessive whitespace and cramped content.
- Use consistent spacing tokens rather than arbitrary one-off values.

### 7.4 Responsive breakpoints

Use the project's Tailwind breakpoints consistently. Test at minimum: -
small mobile: 360--390px; - large mobile: 414--430px; - tablet: 768px; -
laptop: 1280px; - desktop: 1440px and above.

Responsive behaviour must be designed, not merely achieved by shrinking
columns.

---

## 8. Visual design system

The visual direction is **editorial, calm, precise and academically
credible**.

It should feel like a considered university workspace: warm, composed,
functional and trustworthy.

### 8.1 Keep from the current design direction

Retain: - warm off-white canvas; - white primary surfaces; - restrained
neutral borders; - near-black primary text; - secondary muted text; -
serif display typography; - clean sans-serif UI typography; - monospace
metadata for codes and technical identifiers; - compact, purposeful
labels; - subtle status accents; - low or no shadow usage.

### 8.2 Improve the current direction

Do not interpret "information density" as "make everything tiny".

Avoid: - excessive uppercase labels; - metadata that is smaller than
comfortable reading size; - every element being boxed; - too many
vertical dividers; - multiple competing accent colours; - tiny
low-contrast timestamps; - excessive badges; - permanent right-side
inspectors on pages that do not need them; - every item looking like a
ticket.

### 8.3 Light mode tokens

Use these as the initial palette:

Token Value Usage

---

Canvas `#FBFBF9` Main application background
Surface 1 `#FFFFFF` Main panels and cards
Surface 2 `#F4F4F0` Inputs, subtle hover and secondary areas
Surface 3 `#EBEBE5` Muted chips and selected neutral surfaces
Border subtle `#E5E5DC` Hairline dividers
Border strong `#D4D4C8` Focused or emphasized borders
Text primary `#18181B` Main text
Text secondary `#52525B` Supporting text
Text muted `#71717A` Timestamps and quiet metadata
Review `#D97706` Needs review / pending
Success `#059669` Confirmed / completed
Urgent `#DC2626` Overdue / critical
Submission `#4338CA` Submission-related accent

### 8.4 Dark mode tokens

Token Value Usage

---

Canvas `#090A0B` Main background
Surface 1 `#121316` Main panels
Surface 2 `#1A1B1E` Secondary surfaces
Surface 3 `#242529` Chips and selected areas
Border subtle `#27272A` Dividers
Border strong `#3F3F46` Emphasized borders
Text primary `#F4F4F5` Main text
Text secondary `#A1A1AA` Supporting text
Text muted `#71717A` Quiet metadata

If dark mode is not implemented yet, do not let it delay the quality of
light mode. Ensure tokens are structured so dark mode can be added
consistently.

### 8.5 Typography

Use the fonts already configured in the project where available. Do not
repeatedly add font packages or change the font stack without a reason.

Recommended roles: - **Display serif:** Newsreader or the already
configured serif variable. Use for major page titles and selected
editorial moments. - **UI sans:** Inter or Geist. Use for navigation,
body text, buttons, controls and most headings. - **Monospace:**
JetBrains Mono. Use for course codes, IDs, timestamps when useful,
technical identifiers and code.

Typography rules: - Major page titles should have clear hierarchy, not
oversized marketing typography. - Body copy must be comfortable to
read. - Labels should be concise. - Monospace is an accent for technical
metadata, not the default font for the whole interface. - Do not use
serif for every heading; preserve contrast between editorial and
functional typography.

### 8.6 Borders, shadows and surfaces

- Prefer 1px borders and surface contrast.
- Avoid large blurred shadows.
- Use shadows only when needed to communicate a floating layer, such
  as a popover or modal.
- Cards should be used when grouping content meaningfully, not as a
  default wrapper for every element.
- Avoid nesting cards inside cards.

### 8.7 Status and badges

Use status colours consistently, but never rely on colour alone.

Examples: - pending: amber + "Awaiting confirmation"; - confirmed:
green + "Confirmed"; - overdue: red + "Overdue"; - submitted: indigo or
neutral + "Submitted".

Use badges sparingly. Long labels should not be squeezed into tiny
pills.

---

## 9. Interaction and component standards

### 9.1 Buttons

Define a clear hierarchy: - primary action; - secondary action; -
tertiary/text action; - destructive action.

A page should not have several visually competing primary buttons.

Button text should describe the action: - "Upload assignment" - "View
feedback" - "Confirm update" - "Create announcement"

Avoid vague labels such as "Continue" when a more specific action is
possible.

### 9.2 Search and filters

- Search should have a clear purpose and useful placeholder.
- Filters should be visible when they help users narrow a large
  collection.
- Show active filter state.
- Provide a clear way to reset filters.
- Avoid filter bars that consume more space than the content they
  filter.

### 9.3 Tabs

Use tabs only for sibling views within the same context, such as
sections of a course. Do not use tabs as a substitute for application
navigation.

### 9.4 Dialogs and drawers

Use dialogs for short focused decisions. Use drawers for contextual
details or forms that benefit from preserving the underlying page.

Do not put long, multi-step workflows into tiny modals.

### 9.5 Feedback states

Every interactive component must have appropriate: - default state; -
hover state; - focus state; - active/selected state; - disabled state; -
loading state where relevant; - success or error feedback where
relevant.

### 9.6 Empty states

Empty states should explain what the page is for and what the user can
do next.

Bad: "No data".

Better: "No upcoming assessments. New CATs and exams for your enrolled
courses will appear here."

Do not make empty states look like errors.

### 9.7 Loading and error states

Provide intentional skeletons or loading indicators for
asynchronous-looking frontend interactions. Provide readable error
messages and retry actions where appropriate.

### 9.8 Accessibility

- Use semantic HTML.
- All controls must be keyboard accessible.
- Show visible focus indicators.
- Use labels for form controls.
- Use accessible names for icon buttons.
- Maintain sufficient contrast.
- Do not encode meaning using colour alone.
- Respect reduced-motion preferences.
- Use appropriate heading order.
- Ensure menus, dialogs and drawers can be operated with a keyboard.

---

## 10. Frontend architecture and project conventions

The current project structure is the starting point. Preserve it unless
there is a concrete reason to change it.

```text
app/
  (auth)/
    layout.tsx
    login/page.tsx
    register/page.tsx
  (dashboard)/
    layout.tsx
    page.tsx
    units/
      page.tsx
      [unitId]/
        layout.tsx
        page.tsx
        [itemId]/page.tsx
    reviews/
      page.tsx
      [submissionId]/page.tsx
    consultations/page.tsx
  globals.css
  layout.tsx

components/
  ui/
  layout/
    icon-rail.tsx
    sidebar-nav.tsx
    context-inspector.tsx
  workspace/
    item-queue.tsx
    item-card.tsx
    discussion-stream.tsx
    response-editor.tsx
    rubric-evaluator.tsx
  auth/
    role-selector.tsx
    auth-card.tsx

data/
  mock-units.ts
  mock-queue-items.ts
  mock-users.ts

services/
  workspace-service.ts
  auth-service.ts

hooks/
  use-workspace-params.ts
  use-auth-role.ts

types/
  workspace.ts
  user.ts

lib/
  utils.ts
```

### 10.1 Architecture rules

- Keep route files focused on composing page-level components.
- Put reusable visual primitives in `components/ui/`.
- Put shared application shell elements in `components/layout/`.
- Put domain-specific UI in clearly named feature folders.
- Keep mock data in `data/`.
- Keep frontend data access behind `services/`.
- Keep shared TypeScript models in `types/`.
- Keep shared hooks in `hooks/`.
- Avoid putting the entire application in one page component.
- Avoid creating a component for every trivial wrapper.
- Do not create abstractions that make simple UI harder to understand.

### 10.2 Naming

Use descriptive names: - `StudentOverview` - `UpcomingAssessments` -
`AcademicInbox` - `AnnouncementDetail` - `CourseWorkspace` -
`AssignmentStatus` - `LecturerDashboard`

Avoid generic names such as `Box1`, `NewCard`, `MainThing`,
`ContentSection2`.

### 10.3 TypeScript

- Prefer explicit domain types.
- Avoid `any`.
- Avoid duplicating near-identical types.
- Use discriminated unions for states when appropriate.
- Keep component props explicit and small.
- Do not silence TypeScript errors with broad casts.

### 10.4 State

Use local component state for local UI interactions. Use existing hooks
or services where shared state is already established.

Do not introduce a state-management library without a demonstrated need.

### 10.5 Styling

- Use Tailwind utilities and existing project conventions.
- Use design tokens/CSS variables for recurring colours and theme
  values.
- Avoid large inline style objects.
- Avoid repeated arbitrary hex values throughout components.
- Do not introduce a second styling system.
- Keep global CSS focused on resets, fonts, tokens and genuinely
  global behaviour.

### 10.6 Existing dependencies

Inspect `package.json` before adding a dependency. Prefer existing
installed packages and components. Do not install a new library for a
minor visual effect.

---

## 11. Route-to-experience mapping

The current routes may be adapted to the following experience model
without introducing backend work.

Route Intended experience

---

`/` or dashboard root Role-aware overview
`/units` Course/unit directory
`/units/[unitId]` Course workspace
`/units/[unitId]/[itemId]` Course item or announcement detail
`/reviews` Lecturer submission/review queue
`/reviews/[submissionId]` Focused submission review
`/consultations` Consultation requests and schedule

The existing route names may remain for compatibility. Do not rename
routes casually. If a route is renamed, update every link and navigation
reference.

The screenshot at `/units/sma-2104/sub-101` currently appears to show a
submission-review detail view. This route should be treated as a focused
review experience, not as the template for the whole product.

---

## 12. Content and sample data quality

Use realistic, internally consistent sample data.

Examples of useful content: - a CAT with a course, date, time and
topics; - an assignment with a deadline, instructions and submission
status; - a lecture venue update; - course notes uploaded by a
lecturer; - a class update awaiting confirmation; - feedback returned on
a submitted assignment.

Rules: - Use consistent course codes and names across the app. - Use one
consistent timezone in displayed dates. - Avoid impossible date
combinations. - Avoid repeating the same sample person or sentence in
every card. - Avoid fake percentages unless the underlying mock data
supports them. - Make long and short content examples so layouts are
tested realistically. - Label sample or illustrative data appropriately
in the development experience.

---

## 13. Visual quality bar

The application should feel: - calm; - purposeful; - modern; -
academically credible; - precise; - easy to scan; - consistent; -
responsive.

It should not feel: - like a generic admin template; - like a CRM; -
like a customer support ticketing platform; - like a chat app with a
sidebar; - like a dashboard made entirely of cards; - like a visual
clone of the screenshot on every page.

### 13.1 Quality checklist for each page

Before considering a page complete, check:

- Is the purpose obvious within five seconds?
- Is the page title meaningful?
- Is the most important information visually first?
- Is there one clear primary action, if an action is needed?
- Are related items grouped logically?
- Is metadata secondary to the content?
- Are statuses understandable without relying on colour?
- Does the page use the correct layout for its task?
- Does the page work at mobile, tablet and desktop widths?
- Are loading, empty and error states considered?
- Are all controls interactive or clearly non-interactive?
- Does the page look like part of the same product?

---

## 14. Implementation priorities

Build in coherent vertical slices. Do not attempt to perfect every route
simultaneously.

### Priority 1 --- product shell and student overview

- application shell;
- role-aware navigation foundation;
- student dashboard;
- course context;
- responsive behaviour.

### Priority 2 --- academic information discovery

- academic inbox;
- announcement detail;
- search and filters;
- source and confirmation states.

### Priority 3 --- course and time-based experiences

- course directory;
- course workspace;
- calendar/agenda;
- tasks and assignment detail.

### Priority 4 --- lecturer workflow

- lecturer overview;
- courses/classes;
- assignment management;
- submissions queue;
- focused review workspace.

### Priority 5 --- supporting roles and polish

- class representative experience;
- administrator experience;
- responsive refinement;
- accessibility;
- loading, empty and error states;
- consistency audit.

For a hackathon or short build window, prioritise a complete, convincing
student journey and one complete lecturer journey over many unfinished
pages.

---

## 15. Definition of done

A frontend task is complete only when:

1.  The page supports its stated user goal.
2.  It follows the product and design principles in this document.
3.  It uses the existing project conventions.
4.  It works with the current mock data or service interface.
5.  It is responsive at the required widths.
6.  Interactive controls have meaningful behaviour.
7.  It has sensible empty/loading/error states where applicable.
8.  It has no obvious overflow, broken alignment or unreadable content.
9.  It has no avoidable TypeScript or console errors.
10. Navigation to and from the page works.
11. The implementation has been checked in the browser, not judged only
    from code.
12. The agent reports what changed and what remains incomplete.

---

## 16. Final product direction

The product is an **academic coordination workspace**.

The student experience should make academic life feel organised. The
lecturer experience should make academic coordination and review
manageable. The representative experience should make class
communication accountable. The administrator experience should make
institutional structure understandable.

The interface must reflect those distinct jobs.

**Do not let the existence of a three-pane review component redefine the
entire product.**
