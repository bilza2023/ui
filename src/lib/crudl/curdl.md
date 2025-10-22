
# crudl.js — Minimal DAL Factory (Data-Access Layer)

## What it is

`crudl(table, options)` returns a tiny, table-scoped data API with consistent methods: `create`, `read`, `update`, `delete`, `list`. It encapsulates Prisma so callers **never** import Prisma directly (see `questionServices.js` comment). 

```js
import crudl from '$lib/crudl/crudl.js';
const questions = crudl('question');               // table adapter
// used across services & pages
```

 

---

## Factory signature

```ts
crudl(
  table: string,
  options?: {
    unique?: string[]                    // fields usable for unique lookups
    select?: Record<string, boolean>     // default select
    defaultOrderBy?: Array<Record<string, 'asc'|'desc'>>
    whereFilter?: (filters: any) => any  // map high-level filters → Prisma where
    hooks?: {
      beforeCreate?(data: any): Promise<any> | any
      beforeUpdate?(updates: any): Promise<any> | any
    }
  }
)
```

Examples in production code:

* With rich options & hooks for `question`: unique, default select, default order, whereFilter, hooks. 
* Simple adapters for syllabus tables with only `defaultOrderBy`. 

---

## Returned API

### `create(data, opts?)`

Creates a row. Returns selected fields (override with `opts.select`).
Used in questions service with a full select. 

### `read(idOrWhere, opts?)`

Reads by numeric id **or** by a unique where object (e.g., `{ slug }`).

* By id: `tcodes.read(i)` in syllabus. 
* By unique object: `tcodes.read({ slug })`. 
* With select toggle for payload vs meta in questions. 

### `update(id, updates, opts?)`

Updates by id; hooks can normalize/validate; returns selected fields.
Used in questions and exercises edit flows.  

### `delete(id, opts?)`

Deletes by id; often returns `{ id }`.
Used from admin questions list action. 

### `list({ filters?, select?, limit?, orderBy? })`

Lists rows with optional filters, select, limit, and explicit order.

* With filters: chapters by `tcodeId`. 
* With default order (if none provided): syllabus adapters show `defaultOrderBy`. 
* Large fetch for admin questions. 

---

## Options that matter

* **`defaultOrderBy`**
  Applied when no explicit order is passed; e.g., questions sort by `sortOrder` then `createdAt`. 

* **`select`**
  Default projection; override per call. Questions use `SELECT_META` vs `SELECT_WITH_PAYLOAD` and switch via method opts.  

* **`whereFilter(filters)`**
  Central place to coerce/filter inputs (ids → numbers, enum checks, etc.). Questions map `{ tcodeId, chapterId, exerciseId, type, status, homeCategory }` into Prisma `where`. 

* **`hooks.beforeCreate(data)` & `hooks.beforeUpdate(updates)`**
  For validation/normalization and derived fields. In questions:

  * Coerce ids, enforce `type`, trim `name`, mutually-exclusive payload (`note` vs `deck`), compute `timed` from deck slides.  

---

## Usage patterns

### 1) Simple table adapters

```js
// syllabusService.js
const tcodes    = crudl('syllabusTcode',   { defaultOrderBy: [{ createdAt:'asc' }] });
const chapters  = crudl('syllabusChapter', { defaultOrderBy: [{ sortOrder:'asc' }, { createdAt:'asc' }] });
const exercises = crudl('syllabusExercise',{ defaultOrderBy: [{ sortOrder:'asc' }, { createdAt:'asc' }] });
```



### 2) Rich adapter with hooks & filters

```js
// questionServices.js
const base = crudl('question', {
  unique: ['id'],
  select: SELECT_WITH_PAYLOAD,
  defaultOrderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  whereFilter,
  hooks: { beforeCreate, beforeUpdate }
});
```



---

## Read semantics (id **or** unique object)

* `read(123)` → by id. 
* `read({ slug: 'algebra' })` → by unique where. 

---

## Why keep `crudl` at the core

* Services stay tiny and declarative; no Prisma in services/pages. (See comment in `questionServices.js`.) 
* Cross-table consistency: same verbs, same call shapes, predictable `select`/`order` behavior.
* Hooks ensure domain rules live **with** the table adapter (e.g., auto-compute `timed`). 

---

## Known behaviors / gotchas

* Hooks run before write and **must** return the final object (services rely on this).  
* `read(whereObject)` assumes keys are unique; prefer `list()` if shape isn’t unique. (Seen with `slug` usage.) 
* `list({ filters })` depends on `whereFilter()` to coerce types (IDs as numbers, etc.). 

---

## Quick recipe: build a service with `crudl`

```js
// /src/lib/services/thingService.js
import crudl from '$lib/crudl/crudl.js';

const SELECT = { id:true, name:true, createdAt:true };
const whereFilter = (f={}) => ({ ...(f.ownerId && { ownerId:Number(f.ownerId) }) });

const things = crudl('thing', {
  select: SELECT,
  defaultOrderBy: [{ createdAt:'desc' }],
  whereFilter,
  hooks: {
    beforeCreate: (d) => ({ ...d, name: String(d.name||'').trim() }),
    beforeUpdate: (u) => ({ ...u, name: u.name?.trim() })
  }
});

export const list   = (opts) => things.list(opts);
export const get    = (id)   => things.read(Number(id));
export const create = (d)    => things.create(d);
export const update = (id,u) => things.update(Number(id), u);
export const remove = (id)   => things.delete(Number(id));
```
