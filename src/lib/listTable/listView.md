# ListTable.md — Component Family Spec (v1)

> Goal: a production-ready, **config-driven** list UI that renders large datasets consistently across the app (questions, syllabus items, home index entries). This spec defines the **ListTable** (core grid), **ListView** (grid + search + filters + pagination), and **SearchBar** (controlled search input) — including data contracts, behaviors, a11y, styling hooks, and test checklists.
> Architecture mode: **creative-mode** — no code, only design so the code writes itself later.

---

## 1) Scope & Responsibilities

* **ListTable.svelte** (core renderer)

  * Renders rows from a normalized array of objects (“items”).
  * Applies a declarative column schema (“columns”).
  * Manages sorting UI state (visual + event out), selection (optional), and row actions.
  * Responsive collapse rules (hide/stack columns on small screens).

* **ListView\.svelte** (batteries-included container)

  * Composes: `SearchBar` + filter chips/tabs + `ListTable` + pagination.
  * Holds “query state” (search term, filters, sort, page) and emits up to the route.
  * Displays loading/empty/error states consistently.

* **SearchBar.svelte** (controlled input)

  * Debounced text input with clear & submit UX.
  * Emits `submit(term)` and `change(term)` without owning results.

---

## 2) Canonical Data Contracts

### 2.1 Row Shape (normalized “Question” rows)

Use the app’s question service fields as the **baseline** row shape. Each row SHOULD expose these keys when listing questions:

* `slug` (string; primary ID)
* `tcode` (string; subject)
* `chapter` (number or string; UI treats it as string for labels)
* `exercise` (string)
* `type` (enum: `deck|note`)
* `name` (string; human title; in feeds you may provide `title` as an alias)
* `description` (string?; optional)
* `status` (enum: `draft|ready|published|archived`)
* `thumbnail` (string?; absolute or filename)
* `sortOrder` (number)
* `timed` (boolean)
* `createdAt` (ISO string)
* `editedAt` (ISO string)

These keys directly mirror the service layer’s selection used by list/get endpoints, so all table views can be consistent across routes. &#x20;

**Feeds for index page:** the user-facing facade already exposes a “recent” feed with this minimal structure (`slug, tcode, chapter, exercise, title, type, status, editedAt`), stringifying `chapter/exercise` for the UI. Use that shape as-is on home views. &#x20;

**Fallback thumbnails:** when rendering subject tiles or missing thumbs, prefer `/media/images/taleem.webp`.&#x20;

> Note: “Deck” payloads are **not** included in list views (`includePayload: false`). Lists remain lightweight and fast by design.&#x20;

### 2.2 Row Shape (HomeIndexEntry) — FYI

For the home index table, the canonical fields include:
`category, type, title, slug, description?, thumbnail?, pinned, sortOrder, status, createdAt, updatedAt`.
(Recall: `url` was renamed to `slug` at DB level; align any admin lists with that reality.)

---

## 3) Column Schema (declarative)

ListTable renders columns from a **column schema**. Each column definition contains:

* **id**: unique key (e.g., `title`, `type`, `editedAt`).
* **label**: header text.
* **accessor**: dot-path or function name to read the value from a row (e.g., `name` or `title`).
* **kind**: rendering hint (`text`, `badge`, `date`, `thumbnail`, `number`, `icon`, `actions`).
* **format** (optional): date/time (“relative”, “date”, “datetime”), number (“integer”), or enum map (e.g., `{'deck':'Deck','note':'Note'}`).
* **width** (optional): semantic size token (`xs|sm|md|lg|xl`) or fixed px if necessary (avoid fixed unless needed).
* **align** (optional): `left|center|right` (default `left`).
* **sortable** (bool; default `false`).
* **filterable** (bool; default `false`).
* **hideOn** (optional): responsive hints (`mobile|tablet`).
* **primary** (bool; default `false`): designates the “title” cell, often clickable.
* **action** (optional; for `actions` kind): list of named actions to show per row (see §6.5).

The column schema keeps **render logic out of components** and ensures the table is reusable across content types.

---

## 4) Inputs / Outputs

### 4.1 ListTable — Inputs

* `items` (array of rows; required).
* `columns` (array of column definitions; required).
* `sort` (object: `{ id, dir }`; optional; single-column by default).
* `selection` (set/array of selected `slug`s; optional).
* `busy` (bool; optional): disables interactions and shows row skeletons.
* `emptyMessage` (string; default: “Nothing here yet”).
* `errorMessage` (string?; optional alert region).
* `responsive` (bool; default `true`).
* `thumbBaseUrl` (string; optional; prepend for filename thumbs; if absent, render absolute paths directly; when missing entirely, defer to row’s `thumbnail` or global fallback).&#x20;

### 4.2 ListTable — Outputs

* `sortChange` (payload: `{ id, dir }`).
* `rowClick` (payload: `row`).
* `action` (payload: `{ actionId, row }`).
* `selectionChange` (payload: `slugs[]`).

### 4.3 ListView — Inputs

* `items`, `totalCount`, `page`, `pageSize` (server or client paging).
* `columns`, `busy`, `errorMessage`.
* `filters` (object or array of `{ id, value }`).
* `searchTerm` (string).
* `tabs` (optional; e.g., “All”, “Decks”, “Notes”, “Drafts”, etc.).
* `paginator` (mode: `server|client`; default `server`).

### 4.4 ListView — Outputs

* `queryChange` (payload: `{ searchTerm, filters, sort, page, pageSize, tabs }`).
* `rowClick`, `action` passthrough.
* `selectionChange` passthrough.

### 4.5 SearchBar — Inputs & Outputs

* Inputs: `value`, `placeholder`, `debounceMs` (default 300), `autofocus` (bool).
* Outputs:

  * `change(value)` (fires on debounced changes),
  * `submit(value)` (on Enter or button),
  * `clear()` (value → empty; emits `change('')`).

---

## 5) Behaviors

### 5.1 Sorting

* Single-column sorting by clicking the header.
* Sort dir cycles: `none → asc → desc → none`.
* Emit `sortChange`. **Do not** mutate data inside ListTable in server-mode; parent decides.
* Multi-column sorting (optional v1.1).

### 5.2 Search

* SearchBar is **controlled** by ListView.
* Debounced `change` updates query state; `submit` immediately re-queries (server mode) or filters (client mode).
* For questions, server side search should call `searchQuestions(term, { tcode?, type?, status?, limit?, includePayload:false })`.  &#x20;

### 5.3 Filters / Tabs

* **Tabs**: quick top-level filter (e.g., by `type` or `status`).
* **Chips**: granular filters (`tcode`, `chapter`, `exercise`, `status`).
* Emitting `queryChange` is the only contract; ListView doesn’t fetch itself.

### 5.4 Pagination

* **Server mode** (default): ListView calculates `offset = (page-1)*pageSize`; parent calls `listQuestions({ limit: pageSize, offset, ...filters, includePayload:false })`. &#x20;
* **Client mode** (small arrays): ListView slices locally.

### 5.5 Row Selection & Bulk Actions

* Optional checkbox column.
* Emits `selectionChange`.
* Bulk actions recommended:

  * **Status update** (e.g., set selected to `ready/published/archived`) via `bulkUpdateQuestionStatus(slugs, status)`.&#x20;
  * **Delete** selected via `bulkDeleteQuestions(slugs)`.&#x20;
  * **Reorder** (exercise-scoped) via `reorderQuestions(tcode, chapter, exercise, [{ slug }...])` — ListTable does not reorder itself; it only emits “new order” when drag-drop is enabled.&#x20;

### 5.6 Row Actions (per-row)

* A compact actions cell can show 1–3 verbs; the parent routes them. Suggested IDs:

  * `open` — navigate:

    * For **notes**: `/note/{slug}`
    * For **decks**: `/player?slug={slug}` (or `/player/{slug}` if using pretty URLs)
      (This aligns with the earlier rule: if `type=="note"` go to notes; if `deck` go to player.)
  * `edit` — admin edit route.
  * `delete` — confirm → service.

### 5.7 Thumbnails & Images

* If `row.thumbnail` is **absolute** (`/` or `http`), render directly.
* If it’s a **filename**, prepend `thumbBaseUrl` (if provided) or fall back to `/media/images/{filename}` convention.
* If missing, use the **global fallback**: `/media/images/taleem.webp`.&#x20;

### 5.8 States

* **Loading**: show skeleton rows (shape matches columns).
* **Empty**: show `emptyMessage`.
* **Error**: show `errorMessage` in an alert region styled consistently with formKit’s error patterns (ARIA live region).&#x20;

---

## 6) Recommended Column Sets

### 6.1 Questions (general feed)

* Thumb (kind=`thumbnail`)
* Title (primary; accessor `name` or `title`)
* Type (badge; map `deck|note`)
* Subject (text; `tcode`)
* Chapter / Exercise (text; show as `Ch {chapter} · {exercise}`)
* Status (badge)
* Edited (date; format `relative`)

These align with `listQuestions` / `listRecentForIndex` fields. &#x20;

### 6.2 Admin — Questions (within exercise)

Add **SortOrder** and **Timed** columns; enable **drag-reorder** and bulk status changes. Reordering writes via `reorderQuestions(...)`.&#x20;

### 6.3 HomeIndexEntry (admin)

* Category, Type, Title, **Slug** (remember `url→slug`), Pinned, Sort, Status, Updated.

---

## 7) Navigation Rules (truth table)

| `type` | Open action target                      |
| ------ | --------------------------------------- |
| `deck` | `/player?slug={slug}` (or pretty route) |
| `note` | `/note/{slug}`                          |

> When row is **clickable** (primary cell), fire `rowClick(row)` and let the parent apply this table.

---

## 8) Accessibility & Keyboard

* Table uses **semantic table** roles; headers have `aria-sort`.
* **Focus order**: search → tabs/filters → table header (sort) → rows → paginator → bulk bar.
* Row selection checkbox labeled with the row’s title.
* Action buttons have accessible names (“Open note”, “Play deck”, “Edit”, “Delete”).
* Live region for errors (reuse the formKit alert style).&#x20;

---

## 9) Styling & Tokens

* Respect app tokens (`--backgroundColor`, `--primaryText`, etc.).
* Column widths rely on CSS grid fractions; avoid fixed px where possible.
* Badges map statuses (`draft|ready|published|archived`) and types (`deck|note`) to theme colors via utility classes (spec-level rule; implementation later).
* Thumbnail size targets a compact “YouTube-like” card cell height.

---

## 10) Performance

* **Target**: smooth up to \~200 rows without virtualization.
* For >200 rows, switch to server paging; optionally adopt row windowing in a future v1.1.
* ListTable is **pure presentational**; all data fetching happens in the route/service layer (`listQuestions`, `searchQuestions`, etc.). &#x20;

---

## 11) Error & Edge Cases

* Missing `chapter`/`exercise` → show as “—”.
* Missing `thumbnail` → use fallback.&#x20;
* Items with unknown `type` or `status` → show as raw text; do not crash.
* Mixed shapes: columns must tolerate absent fields (render empty cell).

---

## 12) Admin Actions Alignment (service layer)

* **Edit**: load `getQuestionBySlug(slug)` with `includePayload:true` when opening edit pages. &#x20;
* **Delete**: use `deleteQuestion(slug)` for single-row deletion.&#x20;
* **Bulk**: `bulkUpdateQuestionStatus`, `bulkDeleteQuestions`. &#x20;

---

## 13) Special Content Cells (future-proof)

* **Deck health chips** (optional): if parent passes `stats` per row (slides, duration), you may show small chips. Validation/diagnostics live in Taleem Doctor; list views **never** run validation. &#x20;
* **SVG Pointer compliance** markers can be derived offline (exactly one base image rule) and shown as tiny status dots. &#x20;

---

## 14) Testing Checklist (v1)

**ListTable**

* Sorting: header toggles emit correct `{ id, dir }`.
* Selection: toggling rows updates `selectionChange`.
* Actions: click fires `{ actionId, row }`.
* Responsiveness: columns hide per `hideOn`; primary cell remains visible.
* Loading: skeleton count matches `pageSize`.
* Empty/error: messages render with correct ARIA. (Reuse alert pattern.)&#x20;

**ListView**

* Query state: `queryChange` fires on search, filter, sort, page.
* Server paging math: offset & limit derive correctly.&#x20;
* Tabs toggle filter keys as specified.

**SearchBar**

* Debounce timing respected; clear button emits `change('')`.
* Enter triggers `submit(value)` even if value unchanged.

**Services Integration (route tests)**

* `listQuestions` called with `{ includePayload:false }` for lists.&#x20;
* `searchQuestions` respects optional `tcode`, `type`, `status` filters.&#x20;
* Bulk actions call relevant endpoints with selected `slugs`. &#x20;

---

## 15) Example Column Presets (reference only; no code)

**Preset: Questions Feed**

* Thumbnail · Title (primary) · Type · Subject · Ch/Ex · Status · Edited

**Preset: Admin Questions**

* Checkbox · Title (primary) · Type · Subject · Ch/Ex · Status · SortOrder · Timed · Edited · Actions

**Preset: HomeIndexEntry**

* Category · Type · Title · Slug · Pinned · Sort · Status · Updated

---

## 16) Versioning & Rollout

* v1.0: single-sort, server paging, debounced search, selection + basic bulk.
* v1.1: drag-reorder DnD column (admin), multi-sort, saved views.

---

## 17) Implementation Rules (enforceable)

1. **Pure renderers.** No data fetching in ListTable/ListView. Parent/route owns I/O.
2. **No payloads** in lists. Only metadata (`includePayload:false`).&#x20;
3. **Declarative columns** only. No ad-hoc markup per page.
4. **Row navigation** depends strictly on `type` (deck→player, note→note page).
5. **Fallback images** must resolve without broken UI.&#x20;

---

## 18) Ready-To-Implement Acceptance Criteria

* Given a dataset from `listQuestions(...)` or `listRecentForIndex(...)`, the **same** `ListView + ListTable` pair can render:

  * Home feed,
  * Exercise-scoped admin list,
  * “Recent” across a `tcode`,
  * Search results.  &#x20;

* Sort, search, filter, and page changes produce a single unified `queryChange` event with the full state object (stateless renderer).

* Bulk actions for status and delete correctly delegate to the documented service functions. &#x20;

---

**End of ListTable v1 Spec.**
This document is ready to hand off for implementation and testing.
