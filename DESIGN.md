# DESIGN.md

An editorial, high-density, 3-layer design system crafted for a university academic portal (Mathematics & Computer Science learners and lecturers).

Inspired by the refined typography and subtle borders of _Pomegranate Health_, the structural clarity of _dontboardme.com_, and the tactile monospace data density of _mcs-all.vercel.app_.

---

## 1. Design Principles

1. **Information Density Without Clutter:** High-throughput triage queues and inspection panes. We use strict 1px hairline borders (`border-border-subtle`) instead of fuzzy drop shadows to separate functional domains.
2. **Editorial Warmth Meets Mathematical Rigor:** Rich serif headings (`Newsreader`) paired with an ultra-clean neutral sans (`Inter`/`Geist`) for UI labels, and a precise monospace (`JetBrains Mono`) for course codes, formulas, and ticket IDs.
3. **Layered Spatial Anatomy (3-Pane Architecture):**
   - **Layer 0 (Rail - 64px):** Global semester switches, alerts, account switcher.
   - **Layer 1 (Navigation Sidebar - 240px):** Units/modules, lecture streams, consultation requests.
   - **Layer 2 (Master Queue - 320px–360px):** Filterable, searchable queue of submissions, questions, and drafts.
   - **Layer 3 (Focus Workspace - Flexible):** The active canvas (code diff, threaded discussion, assignment rubric evaluator).
   - **Layer 3 Extension (Context Inspector - 300px):** Collapsible metadata panel (rubric sliders, student profile, submission status).

---

## 2. Color System & Design Tokens

### Light Mode (Warm Institutional Sand)

- **Canvas / Base:** `#FBFBF9` (Soft, non-glare editorial background)
- **Surface 1 (Primary Panes):** `#FFFFFF` (Sidebar, cards, active canvas)
- **Surface 2 (Secondary Elements):** `#F4F4F0` (Hover states, input fields, code blocks)
- **Surface 3 (Muted / Chips):** `#EBEBE5` (Badges, disabled containers)
- **Borders:** `#E5E5DC` (Hairline dividers), `#D4D4C8` (Active/focused borders)
- **Text Main:** `#18181B` (Near-black zinc)
- **Text Secondary:** `#52525B` (Support labels, captions)
- **Text Muted:** `#71717A` (Timestamps, metadata, inactive links)

### Dark Mode (Deep Carbon / Slate)

- **Canvas / Base:** `#090A0B` (Low-emission carbon)
- **Surface 1:** `#121316` (Elevated panels)
- **Surface 2:** `#1A1B1E` (Active states, elevated cards)
- **Surface 3:** `#242529` (Chips, secondary pills)
- **Borders:** `#27272A` (Hairline dark borders), `#3F3F46` (Active borders)
- **Text Main:** `#F4F4F5`
- **Text Secondary:** `#A1A1AA`
- **Text Muted:** `#71717A`

### Academic Status Accents

- **Academic Gold / Review:** `#D97706` (Lecturer triage, pending review)
- **Success / Verified:** `#059669` (Graded, approved, online)
- **Urgent / Returned:** `#DC2626` (Flags, revision requested)
- **Indigo / Submissions:** `#4338CA` (Student submission batches)

---

## 3. Typography Matrix

| Role                 | Font Family                 | Weight        | Size / Leading     | Target Usage                                                  |
| :------------------- | :-------------------------- | :------------ | :----------------- | :------------------------------------------------------------ |
| **Display Header**   | `var(--font-serif-display)` | 500, 600      | `1.75rem` / `1.2`  | Workspace title, assignment overview, auth headings           |
| **UI Body / Labels** | `var(--font-sans-ui)`       | 400, 500, 600 | `0.875rem` / `1.4` | Navigation items, queue snippets, chat messages               |
| **Code / Metadata**  | `var(--font-mono-code)`     | 400, 500      | `0.75rem` / `1.2`  | Unit codes (`SMA 2104`), IDs (`#0007742`), LaTeX formula text |

---

## 4. Component Layout Specifications

- **Grid & Elevation:** No elevated box shadows (`box-shadow: none !important`). Elevation is represented strictly by contrast differences between `surface-1`, `surface-2`, and hairline `1px` borders.
- **Scrollbars:** Ultra-thin custom scrollbars (`4px` width) styled to match theme surfaces to prevent layout shifts.
- **Card Density:** Queue cards have an internal vertical padding of `0.75rem` (`12px`) and horizontal padding of `1rem` (`16px`).
