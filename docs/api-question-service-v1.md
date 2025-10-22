
# File: `api-question-service-v1.md`

# Question Service — v1 (code-aligned)

**Source:** `/src/lib/services/questionServices.js`
**Style:** ID-first CRUD + hooks on top of `crudl()` (no direct Prisma in this module). 

## Exports

```js
export const questions = {
  create, getById, update, delete: remove, list,
  getByTcodeId, getByChapter, getByExercise
};
```

Exports match the code above. 

### Field selections (used internally)

* **SELECT_META:** returns meta only (no payload).
* **SELECT_WITH_PAYLOAD:** meta + `note` / `deck`. 

---

## Methods (with copy-paste usage)

### `questions.create(data)`

Create a question. Requires `tcodeId`, `chapterId`, `exerciseId`, and valid `type` (`'note'|'deck'`). Hooks enforce mutually-exclusive payloads (`note` vs `deck`) and compute `timed` for decks.

```js
import { questions } from '$lib/services/questionServices.js';

await questions.create({
  tcodeId: 1,
  chapterId: 10,
  exerciseId: 200,
  type: 'note',                 // 'note' | 'deck'
  name: 'Linear Intro',
  status: 'draft',
  note: '<h1>Intro…</h1>'       // required when type='note'
});
```

---

### `questions.getById(id, { includePayload=true } = {})`

Read one by id. Pass `includePayload:false` to get only meta. 

```js
const q = await questions.getById(123, { includePayload: false });
```

---

### `questions.update(id, updates)`

Update by id. Hooks coerce ids/trim strings, enforce type, maintain exclusivity, and recompute `timed`.

```js
await questions.update(123, {
  name: 'Updated title',
  type: 'deck',
  deck: { slides: [{ end: 12.3 }, { end: 0 }] } // will set timed=true
});
```

---

### `questions.delete(id)`

Delete by id. Returns `{ id }`. (Export name is `delete`, implemented via `remove`.)

```js
await questions.delete(321);
```

---

### `questions.list(opts = {})`

List with filters and projection control. If `includePayload:false` (default), only meta fields are selected. Supported filters: `{ tcodeId, chapterId, exerciseId, type, status, homeCategory }`. Default order: `sortOrder` asc, then `createdAt` asc.

```js
const rows = await questions.list({
  filters: { exerciseId: 200, status: 'published', type: 'deck' },
  limit: 100,
  includePayload: false
});
```

---

### Convenience filters

All forward to `list()` with merged filters. 

```js
await questions.getByTcodeId(1, { includePayload: false });

await questions.getByChapter(1, 10, { limit: 50 });

await questions.getByExercise(1, 10, 200, {
  filters: { status: 'published', type: 'deck' }
});
```

---

## Notes / Behavior

* `type` must be `'note'` or `'deck'`; payloads are mutually exclusive; `timed` auto-computed for decks.
* Default `select` is payload-**on** for single reads/writes and payload-**off** for lists (unless overridden). 
* Filters are coerced to numbers where needed. 

---

# File: `api-syllabus-service-v1.md`

# Syllabus Service — v1 (code-aligned)

**Source:** `/src/lib/services/syllabusService.js`
**Style:** ID-first CRUD adapters via `crudl()`, with FK-style delete guards and a few domain read helpers. 

> Note: There is **no** `getAllTcodes()` in this file; use `listTcodes()` for the full list. (Some older modules still import `getAllTcodes`; update callers to `listTcodes`.) 

---

## Tcodes

### `listTcodes()`

All tcodes sorted by name. 

```js
import { listTcodes } from '$lib/services/syllabusService.js';
const tcodes = await listTcodes();
```

### `getTcode(id)` / `getTcodeBySlug(slug)`

Get one by id or by slug; returns `null` when not found. 

```js
const tA = await getTcode(1);
const tB = await getTcodeBySlug('math-101');
```

### `createTcode(data)` / `updateTcode(id, data)` / `deleteTcode(id)`

Create/update (trims fields). Delete throws `e.code = 'FK_RESTRICT'` if chapters/questions exist. 

```js
const t = await createTcode({ slug:'math-101', name:'Mathematics 101' });
await updateTcode(t.id, { description: 'Basics' });

try {
  await deleteTcode(t.id);
} catch (e) {
  if (e.code === 'FK_RESTRICT') {
    // handle: cannot delete while children exist
  }
}
```

---

## Chapters

### `listChapters(tcodeId)` / `getChapter(id)` / `getChapterBySlug(tcodeId, slug)`

List ordered chapters for a tcode; read by id; read first match by slug (or `null`). 

```js
const chs = await listChapters(1);
const ch  = await getChapter(10);
// Optionally by slug:
const chS = await getChapterBySlug(1, 'algebra-basics');
```

### `createChapter(data)` / `updateChapter(id, data)` / `deleteChapter(id)`

Create/update (trims fields). Delete throws `FK_RESTRICT` if exercises/questions exist. 

```js
const ch = await createChapter({ tcodeId: 1, slug:'algebra-basics', name:'Algebra' });
await updateChapter(ch.id, { sortOrder: 2 });

try {
  await deleteChapter(ch.id);
} catch (e) {
  if (e.code === 'FK_RESTRICT') {
    // cannot delete while exercises/questions exist
  }
}
```

---

## Exercises

### `listExercises(chapterId)` / `getExercise(id)` / `getExerciseBySlug(chapterId, slug)`

List ordered exercises; read by id; read by slug (first match). 

```js
const exs = await listExercises(10);
const ex  = await getExercise(200);
const exS = await getExerciseBySlug(10, 'linear-equations');
```

### `createExercise(data)` / `updateExercise(id, data)` / `deleteExercise(id)`

Create/update (trims fields). Delete throws `FK_RESTRICT` if questions exist. 

```js
const ex = await createExercise({ chapterId: 10, slug:'linear-equations', name:'Linear Equations' });
await updateExercise(ex.id, { sortOrder: 3 });

try {
  await deleteExercise(ex.id);
} catch (e) {
  if (e.code === 'FK_RESTRICT') {
    // cannot delete while questions exist
  }
}
```

---

## Domain Reads

### `getSyllabusForTcode(tcodeId)`

Returns `{ tcode, chapters, exercisesByChapter }`. 

```js
const s = await getSyllabusForTcode(1);
// s.tcode, s.chapters[], s.exercisesByChapter[chapterId]
```

### `getSynopsis(tcodeId)`

Returns a nested synopsis with tcodes → chapters → exercises. 

```js
const syn = await getSynopsis(1);
```

### `getFormOptions(tcodeId)`

Returns `{ chapters: [{value,label}], exercisesByChapter: { [chapterId]: [{value,label}] } }`. 

```js
const opts = await getFormOptions(1);
// opts.chapters, opts.exercisesByChapter[chapterId]
```

---
