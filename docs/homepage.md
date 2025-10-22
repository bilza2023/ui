# Home Page — System Review (v1)

## 0) Purpose

A concise, implementation‑accurate explanation of how the **Home page** populates and renders content, what it pulls from services, how cards are shaped, and where improvements are likely. This is a read‑me for future maintainers.

---

## 1) High‑Level Flow

I. **Server loader** (`/src/routes/+page.server.js`) runs on request.
II. It fetches two datasets:

1. **Tcodes** via `listTcodes()` — used to show courses/links.
2. **Questions** via `questions.list({ includePayload:false })` — the raw pool of items.
   III. Loader **filters to home items** (`q.homeCategory` truthy) and **normalizes** into a lightweight **card row** shape.
   IV. The page renders these rows in categories using local UI components (bullets navigation, toggles, and card UI).
   V. Cache‑control is set for short public caching (30 seconds).

---

## 2) Data Sources (services)

### 2.1 `questions` (from `$lib/services/questionServices.js`)

**Used API:** `questions.list({ filters:{}, includePayload:false })`

**Fields relied upon by Home:**

* Identity & display: `id`, `slug`, `name`, `type`, `thumbnail`, `status`, `editedAt`
* Syllabus anchors: `tcodeId`, `chapterId`, `exerciseId`
* **Home controls:** `homeCategory` (string/enum), `homeSort` (int), `homePinned` (boolean)

**Notes:**

* `includePayload:false` means no heavy `deck`/`note` bodies are transferred, keeping Home lightweight.
* `homeCategory` acts as the inclusion gate — only items with a non‑empty category are shown on Home.
* `homeSort` orders within each category; `homePinned` enables visual emphasis.

### 2.2 `listTcodes` (from `$lib/services/syllabusService.js`)

**Used API:** `listTcodes()`

**Purpose on Home:**

* Provide a list of available **courses** (syllabi). Typically displayed as a separate group or navigation section.
* Return shape is a light list of tcodes (`id`, `slug`, `name`, optional `image/description`).

---

## 3) Loader Normalization Shape (card row)

The loader maps each eligible question into a **card row** with this exact structure (keys are important for UI):

```text
{
  id:          string|number,   // q.id or fallback
  slug:        string,          // stable link id
  name:        string,          // title
  type:        'note'|'deck',   // card type badge and routing
  tcode:       string,          // String(q.tcodeId) for light display/links
  chEx:        string,          // "Ch {chapterId} · Ex {exerciseId}" or '—'
  status:      string,          // 'draft'|'ready'|'published'|... used as a badge
  thumbnail:   string,          // optional image path
  editedAt:    ISO|string|null, // date display
  homeCategory:string,          // category bucket on home
  homeSort:    number,          // order inside category
  homePinned:  boolean          // pinning emphasis
}
```

**Why this shape?**

* It is **payload‑light** (no bodies), sortable, and works with list/table/card UIs.
* Card components can rely on a small, stable contract and not on service internals.

---

## 4) Client Rendering (UI Components)

> Exact internal code varies, but the roles are stable.

* **`BulletsNav.svelte`** — A compact category/section navigator (bullet buttons or dots). Expected to bind to the set of `homeCategory` buckets and let users jump/scroll between them.
* **`RoundToggle.svelte`** — A small on/off (or multi) toggle to switch front‑page modes (e.g., All vs Pinned, Cards vs List, Theme, etc.). Used to alter local view, not the dataset.
* **`UQCard.svelte` / `UCard.svelte`** — The visual card for a question row. Shows thumbnail, name, type/status badge, and routes on click using `slug` and `type`.

  * **Note:** Ensure import names match the file (`UQCard` vs `UCard`). See §7.1.

**Grouping & order:**

* Items are first **grouped by `homeCategory`**.
* Within each category, items are **sorted by `homeSort` ASC**, optionally then by `homePinned` (pinned first) and then by a tiebreaker (e.g., `editedAt` DESC or `name`).

---

## 5) Inclusion Rules (business conventions)

I. A question **appears on Home** iff `homeCategory` is non‑empty.
II. The question **position** within a category is controlled by `homeSort` (lower = earlier).
III. To give visual priority, set `homePinned = true` (UI may render a chip, star, or lift the card).
IV. Only questions with `tcode='blog'` should set home fields (as per system rule). If a question moves out of `blog`, the service should auto‑clear home fields.

> These rules live in the **service layer** (validation & sanitization) and in editorial tooling, not on the Home page.

---

## 6) Performance & Caching

* **`setHeaders({ 'cache-control': 'public, max-age=30' })`** is applied.
*
* Home page remains responsive by **excluding heavy payloads** (`includePayload:false`).
* Sorting and grouping are cheap (small in‑memory arrays), suitable for SSR scale.

---

## 7) Known Gaps / Improvements

### 7.1 Import name mismatch

* The project references `UCard` in some places, while the file provided is `UQCard.svelte`. Unify the name to avoid module‑not‑found issues.

### 7.2 Deterministic ordering

* Current sort is by `homeSort` only (implied). Add a **stable secondary** (e.g., `homePinned DESC`, then `editedAt DESC`, then `name ASC`) to prevent jitter when multiple items share the same sort weight.

### 7.3 Category layout contract

* Define a **fixed category order** (e.g., `['featured','math','science','news']`) to avoid alphabetical drift. Store in a small constant; unknown categories sink to the end.

### 7.4 Tcodes panel

* Clarify how `tcodes` render on Home (separate grid, compact list, or hidden). If shown, define a minimal row shape for tcodes (`id, slug, name, image?`) and a navigation handler.

### 7.5 Access control / editorial tooling

* Ensure only authorized users can set `homeCategory/homeSort/homePinned`. Consider a small admin form using **formKit** to manage these fields safely.

### 7.6 Thin client props

* Pass only **the normalized arrays** to the client. Avoid leaking service objects or raw DB entities.

---

## 8) QA Checklist (Home)

* [ ] Loader fetches `listTcodes()` and `questions.list({ includePayload:false })`.
* [ ] Filter: only items where `homeCategory` is truthy are included.
* [ ] Card mapping matches the **row shape** in §3.
* [ ] Group by `homeCategory`; inside each group order by `homeSort`, then deterministic ties.
* [ ] `UQCard/UCard` import matches actual filename and export.
* [ ] `BulletsNav` can see the computed **category list** and reacts to navigation clicks.
* [ ] `RoundToggle` alters view state only (no server assumptions).
* [ ] No heavy payload in page data (confirm `includePayload:false`).
* [ ] Cache header present (`max-age=30`) and safe for your content cadence.

---

## 9) Editor’s Notes

* Home is intentionally **presentation‑only**; all editorial decisions sit in the **services + admin tools**.
* Treat `homeCategory` as the inclusion switch; `homeSort` and `homePinned` are purely presentational.
* Keep the contract **small and stable** so cards/tables remain decoupled from service internals.

— End of document —
