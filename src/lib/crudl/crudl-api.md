
# `crudl` API — Guide

`makeCrudl(modelName, options)` gives you a tiny, table-scoped data API: `{ create, read, update, delete, list }`. It wraps Prisma, handles unique lookups (`id`, `slug`, etc.), maps Prisma errors to friendly codes, supports default `select/include`, hooks, filters, and pagination. 

---

## 1) Create an adapter (one line)

```js
// /src/lib/services/questionServices.js
import makeCrudl from '$lib/crudl/crudl.js';

export const questions = makeCrudl('question', {
  unique: ['id', 'slug'],                 // resolve read/update/delete by id OR slug
  select: { id: true, name: true, type: true, status: true, createdAt: true, editedAt: true },
  defaultOrderBy: [{ createdAt: 'desc' }], // fallback order
  whereFilter: (f = {}) => ({              // list() high-level filters → Prisma where
    ...(f.tcodeId ? { tcodeId: Number(f.tcodeId) } : {}),
    ...(f.status  ? { status: String(f.status) }   : {})
  }),
  hooks: {
    beforeCreate: (d) => ({ ...d, name: String(d.name || '').trim() }),
    beforeUpdate: (u) => ({ ...u, name: u.name?.trim() })
  }
});
```

Why this works: `unique` resolves id/slug; `whereFilter` shapes filters; `hooks` normalize writes; `defaultOrderBy` sorts when you don’t pass one. 

---

## 2) `create(data, opts?)`

Create a row; hooks run first; returns selected fields (you can override with `opts.select`/`opts.include`). 

```js
// Create a draft note
await questions.create({
  tcodeId: 1, chapterId: 10, exerciseId: 200,
  name: 'What is Algebra?',
  type: 'note',
  status: 'draft',
  note: '<h1>Algebra intro…</h1>'
});

// With richer selection
await questions.create(
  { name: 'Deck 1', type: 'deck', status: 'ready', deck: { slides: [] } },
  { select: { id: true, name: true, type: true } }
);
```

Errors are normalized (e.g., duplicate → `err.code === 'DUPLICATE'`). 

---

## 3) `read(idOrUnique, opts?)`

Read by **id** (number or numeric string) or by a unique **where** object (e.g., `{ slug: 'monomials' }`). If not found, throws `code: 'NOT_FOUND'`. 

```js
// By numeric id
const q1 = await questions.read(123);

// By slug (because we set unique: ['id','slug'])
const q2 = await questions.read('what-is-algebra');

// Or explicit unique object (first match if not strictly unique)
const q3 = await questions.read({ slug: 'what-is-algebra' });

// Narrow the projection
const q4 = await questions.read(123, { select: { id: true, name: true } });
```

---

## 4) `update(idOrUnique, updates, opts?)`

Update by id or slug. `beforeUpdate` can sanitize/validate; returns selected fields. 

```js
// Update by id
await questions.update(123, { status: 'published' });

// Update by slug
await questions.update('what-is-algebra', {
  name: 'What is Algebra (Updated)',
  note: '<h1>Updated…</h1>',
  deck: null // mutually exclusive in your service logic
});

// With include/select override
await questions.update(123, { thumbnail: '/img/a.webp' }, {
  select: { id: true, name: true, thumbnail: true }
});
```

---

## 5) `delete(idOrUnique, opts?)`

Delete by id or slug. Returns the deleted row (respecting `select/include`). Errors map to `NOT_FOUND` or `FK_CONSTRAINT`. 

```js
// By id
await questions.delete(321);

// By slug
await questions.delete('temp-slide-deck');
```

---

## 6) `list(opts)`

List records with optional `filters`, direct `where`, `orderBy`, `limit`, `offset`, `select/include`, and `withCount`. If `withCount: true`, you get `{ items, total }`. Otherwise you get `items[]`. 

```js
// Basic list (uses defaultOrderBy)
const items = await questions.list({ limit: 50 });

// With high-level filters (run through whereFilter)
const drafts = await questions.list({ filters: { status: 'draft', tcodeId: 1 }, limit: 100 });

// Direct Prisma where (bypasses whereFilter)
const onlyNotes = await questions.list({ where: { type: 'note' }, orderBy: { editedAt: 'desc' } });

// Paginated with total
const page1 = await questions.list({ limit: 20, offset: 0, withCount: true });
// page1.items, page1.total
```

---

## 7) Real quick: another table (syllabus)

```js
import makeCrudl from '$lib/crudl/crudl.js';

export const chapters = makeCrudl('syllabusChapter', {
  unique: ['id', 'slug'],
  defaultOrderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  whereFilter: (f = {}) => ({
    ...(f.tcodeId ? { tcodeId: Number(f.tcodeId) } : {})
  })
});

// Examples
await chapters.create({ tcodeId: 1, slug: 'ch-1', name: 'Numbers', sortOrder: 1 });
const ch = await chapters.read({ slug: 'ch-1' });
await chapters.update(ch.id, { name: 'Numbers & Sets' });
await chapters.delete(ch.id);
const list = await chapters.list({ filters: { tcodeId: 1 } });
```

---

## 8) Error handling pattern (recommended)

```js
try {
  await questions.create({ slug: 'dup-slug', name: 'X' });
} catch (e) {
  if (e.code === 'DUPLICATE') {
    // unique constraint error (P2002 → mapped)
  } else if (e.code === 'FK_CONSTRAINT') {
    // foreign key constraint (P2003 → mapped)
  } else if (e.code === 'NOT_FOUND') {
    // read/update/delete on missing record (P2025 or manual)
  } else {
    // generic error
  }
}
```

This mapping is built into the factory so your UI/App layer can respond consistently. 

---

## 9) Tips that save time

* **Prefer `filters`** over direct `where` so your `whereFilter` centralizes coercion (e.g., `Number(f.tcodeId)`). 
* **Use `unique` smartly**: `['id','slug']` lets every method work with either identifier. 
* **Keep hooks thin**: trim strings, enforce mutual exclusivity, derive flags — heavy logic belongs in your App layer. 

