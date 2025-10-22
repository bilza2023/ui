# Syllabus Page — System Review (v1)

## 0) Purpose

A precise, implementation‑aligned explanation of how **/syllabus** works: what the loader fetches, how it resolves `tcode`, how it shapes items for the Syllabus UI, and how it relates to the Home contracts for uniformity.

---

## 1) High‑Level Flow (SSR)

I. **Query params**: expects `?tcode=...` (slug or numeric id). Optional `chapter`, `exercise` for UI pre‑selection.
II. **Resolve tcodeId**: numeric short‑circuit; otherwise read by **slug**.
III. **Fetch synopsis** for `tcodeId`: chapters + exercises tree.
IV. **Fetch questions** scoped to the `tcodeId`.
V. **Normalize items** into a light row shape the page’s `<Syllabus />` component expects.
VI. **Return** `{ tcode, selected, synopsis, items }` and set a short cache header (`public, max-age=30`).

---

## 2) Data Sources (services)

### 2.1 `syllabusService`

* **`getTcodeBySlug(slug)`**: resolve `tcodeId` from a human URL.
* **`getSynopsis(tcodeId)`**: returns `{ id, slug, name, description, image, chapters:[ { id, slug, name, sortOrder, exercises:[ { id, slug, name, sortOrder } ] } ] }`.

### 2.2 `questionServices`

* **`questions.getByTcodeId(tcodeId)`**: returns all questions under this tcode (default select includes meta fields; no heavy bodies unless requested).

---

## 3) Loader Normalization (card row for Syllabus)

For each question `q`, the loader builds:

```text
{
  id:         q.id,
  name:       q.name,
  description:q.description,
  type:       q.type,           // 'note'|'deck'
  status:     q.status,
  thumbnail:  q.thumbnail || '',
  editedAt:   q.editedAt,
  tcode:      synopsis.slug,
  chapter:    chapterSlugById[q.chapterId] || '',
  exercise:   exerciseSlugById[q.exerciseId] || ''
}
```

**Maps maintained for slugs**:

* `chapterSlugById: Map<chapterId, chapterSlug>`
* `exerciseSlugById: Map<exerciseId, exerciseSlug>`

These keep cards light, and allow URL routing by slugs rather than numeric ids.

---

## 4) Returned Shape to UI

```text
{
  tcode:    synopsis.slug,
  selected: {
    chapter:  url.searchParams.chapter || '',
    exercise: url.searchParams.exercise || ''
  },
  synopsis,   // full tree for left nav / filters / breadcrumbs
  items       // normalized rows for the main grid/list
}
```

**UI expectation**:

* Use `synopsis` to render the syllabus tree (chapters → exercises) and to filter.
* Use `items` for the actual content cards (note/deck) tied back to chapter/exercise slugs.

---

## 5) Error & Caching Behavior

* Missing `tcode` → **400**.
* Unresolvable slug or missing tcode → **404**.
* Cache header → `public, max-age=30` (safe quick re‑use; content is meta‑only).

---

## 6) Uniformity with Home (contracts to share)

**Common card contract**: Prefer a single shared row shape across Home and Syllabus.

* Minimum shared keys: `id, slug? (or name), name, type, status, thumbnail, editedAt`.
* Syllabus‑specific keys: `chapter, exercise` (slugs) and `tcode` (slug).
* Home‑specific keys: `homeCategory, homeSort, homePinned`.

**Recommendation**: define a tiny **`rowMappers.js`** with `mapQuestionForHome(q)` and `mapQuestionForSyllabus(q, synMaps)` to avoid drift.

---

## 7) Improvements

I. **Deterministic sort** of `items`: define a stable order (e.g., by chapter slug asc → exercise slug asc → `name` asc). Helps UX scanning.
II. **Param validation** for `chapter/exercise`: if provided but not found in `synopsis`, snap to defaults or report a soft warning.
III. **Precomputed index**: build `{ byChapterSlug: { [slug]: [...] }, byExerciseSlug: { [slug]: [...] } }` once to simplify filtering.
IV. **Link helpers**: centralize routing helpers to build URLs from `(tcode, chapter, exercise, slug)`.

---

## 8) QA Checklist (Syllabus)

* [ ] `?tcode` resolves to a valid tcodeId (slug or numeric).
* [ ] `synopsis` is present, with chapters and exercises arrays.
* [ ] `items` are normalized exactly as in §3.
* [ ] `chapterSlugById` and `exerciseSlugById` are complete for all referenced ids.
* [ ] Sort order is deterministic and documented.
* [ ] Short cache header is set.
* [ ] Errors: 400 on missing tcode, 404 on unfound tcode.

— End of document —
