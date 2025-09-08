
# ListTable Lite v1 — Fast, Reusable Data Tables

A tiny, generic Svelte table with **local search**, **local sort**, **row click**, and **action buttons** — no server mode, no pagination, no coupling to app routes. Use it to build any admin list in minutes.

---

## Why this exists

* You needed a **simple** table that “just works”.
* We standardized the **row shape**, **column schema**, and **events**, so every list page is copy-paste predictable.
* All filtering/sorting happens **locally** on the items you pass in — no refetch logic hidden in the component.

---

## What it owns (and what it doesn’t)

**Owns**

* Rendering a table from `items` using declarative `columns`.
* Local search (client-side) across selected `searchKeys`.
* Local sort (single column).
* Emitting `rowClick` and per-row `action` events.

**Doesn’t own**

* Routing (viewer/editor) — you wire that in the page via events.
* Deleting/POSTing — you wire that via the `action` event (e.g., form POST).
* Pagination or server filtering — intentionally out of scope.

---

## Component location

```
/src/lib/listTable/ListTable.svelte
```

> The component is generic and has no app-specific imports.

---

## Public API (frozen)

### Props

| Prop            | Type                    |                       Default | Notes                                                                             |
| --------------- | ----------------------- | ----------------------------: | --------------------------------------------------------------------------------- |
| `items`         | `any[]`                 |                          `[]` | The rows to display (current data only).                                          |
| `columns`       | `Column[]`              |                          `[]` | Declarative schema (see below).                                                   |
| `rowKey`        | `string`                |                        `"id"` | Unique key field present on each row (e.g. `"id"` or `"slug"`).                   |
| `searchable`    | `boolean`               |                        `true` | Show/hide the search bar.                                                         |
| `searchKeys`    | `string[] \| undefined` |                   `undefined` | Which fields to scan; if omitted, all **text** columns’ `accessor`s are searched. |
| `thumbBaseUrl`  | `string`                |                          `""` | Prefix for filename thumbnails (e.g. `"/media/images"`).                          |
| `fallbackThumb` | `string`                | `"/media/images/taleem.webp"` | Fallback image when no thumb is present.                                          |
| `emptyMessage`  | `string`                |          `"Nothing here yet"` | Shown when `items` (after search) is empty.                                       |

### Column schema

Each column is a plain object:

```ts
type Column = {
  id: string;                 // unique id for the column
  label: string;              // header text
  accessor: string;           // path to read from row (e.g. "name", "meta.title")
  kind?: 'text'|'badge'|'date'|'thumbnail'|'number'|'actions';
  primary?: boolean;          // true → cell is clickable and emits rowClick
  sortable?: boolean;         // true → header cycles asc/desc/none (local)
  align?: 'left'|'center'|'right';
  width?: string;             // CSS width (e.g., "sm" ignored; use "120px" if needed)
  format?: 'relative'|'date'|'datetime'; // only for kind:'date'
  action?: string[];          // only for kind:'actions' (e.g., ['open','edit','delete'])
};
```

> **Must:** `accessor` must match a real key on every row you pass.

### Events

* `rowClick`: emits the **row** when the primary cell is clicked.
* `action`: emits `{ actionId, row }` when an action button is clicked.

---

## The Row Shape (normalize in your page)

**Recommended row keys** (works for most admin lists):

```ts
{
  id: string,          // stable unique key (often the slug)
  slug: string,        // if you use slug-based routes
  name: string,        // title or display name (fallback: name || title || slug)
  type: string,        // e.g. 'note' | 'deck'
  tcode: string,       // subject/course key if applicable
  chEx: string,        // "Ch {chapter} · {exercise}" (or '—')
  status: string,      // e.g. 'active' | 'draft' | '—'
  editedAt: string|Date|null, // used by date column (fallback: editedAt || updatedAt || createdAt)
  thumbnail?: string   // absolute|/path|filename — filename is prefixed with thumbBaseUrl
}
```

> Lists should be **payload-light**: don’t include heavy bodies (`deck`, `note`, etc.). Use summaries only.

---

## Quick Start (15-minute recipe)

### 1) Loader (server)

Fetch a **lightweight list** from your service (no payload bodies). Example for questions:

```js
// /src/routes/admin/questions/+page.server.js
import { listQuestions, deleteQuestion } from '$lib/services/questionServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

export async function load() {
  const items = await listQuestions({ includePayload: false, limit: 500 });
  return { items };
}

export const actions = {
  delete: makeAction({
    spec: { slug: R.str('slug', { required: true }) },
    service: ({ slug }) => deleteQuestion(slug),
    success: () => ({ ok: true })
  })
};
```

(Loader pattern aligned to our service API.)&#x20;

### 2) Normalize rows + declare columns (page)

```svelte
<!-- /src/routes/admin/questions/+page.svelte -->
<script>
  import '$lib/styles/tokens.css';
  import ListTable from '$lib/listTable/ListTable.svelte';
  import { goto } from '$app/navigation';

  export let data;

  // Normalize rows to match column accessors
  const raw = Array.isArray(data?.items) ? data.items : [];
  const items = raw.map((r) => {
    const ch = r?.chapter != null && r?.chapter !== '' ? `Ch ${r.chapter}` : '';
    const ex = r?.exercise ? (ch ? ` · ${r.exercise}` : r?.exercise) : '';
    return {
      id: r.slug, // stable key
      slug: r.slug,
      name: r?.name ?? r?.title ?? r?.slug ?? 'Untitled',
      type: r?.type ?? '—',
      tcode: r?.tcode ?? '—',
      chEx: ch || ex ? `${ch}${ex}` : '—',
      status: r?.status ?? '—',
      editedAt: r?.editedAt ?? r?.updatedAt ?? r?.createdAt ?? null,
      thumbnail: r?.thumbnail ?? null
    };
  });

  // Declarative columns — accessors MUST match keys above
  const columns = [
    { id:'thumbnail', label:'', accessor:'thumbnail', kind:'thumbnail' },
    { id:'name',      label:'Title',   accessor:'name',      primary:true, sortable:true },
    { id:'type',      label:'Type',    accessor:'type',      kind:'badge', sortable:true },
    { id:'tcode',     label:'Subject', accessor:'tcode' },
    { id:'chEx',      label:'Ch/Ex',   accessor:'chEx' },
    { id:'status',    label:'Status',  accessor:'status',    kind:'badge' },
    { id:'editedAt',  label:'Edited',  accessor:'editedAt',  kind:'date', format:'relative' },
    { id:'actions',   label:'',        kind:'actions', action:['edit','delete'], align:'right' }
  ];

  // Primary click → viewer (type decides the route)
  function onRowClick(e) {
    const row = e.detail;
    if (!row) return;
    goto(row.type === 'note'
      ? `/note/${encodeURIComponent(row.slug)}`
      : `/player?slug=${encodeURIComponent(row.slug)}`
    );
  }

  // Actions → your routes / posts
  function onAction(e) {
    const { actionId, row } = e.detail || {};
    if (!row) return;

    if (actionId === 'edit') {
      goto(row.type === 'note'
        ? `/admin/edit-note?slug=${encodeURIComponent(row.slug)}`
        : `/admin/edit-deck?slug=${encodeURIComponent(row.slug)}`
      );
      return;
    }

    if (actionId === 'delete') {
      if (confirm(`Delete: ${row.name || row.slug}?`)) {
        const f = document.createElement('form');
        f.method = 'post';
        f.action = '?/delete';
        const i = document.createElement('input');
        i.type = 'hidden';
        i.name = 'slug';
        i.value = row.slug;
        f.appendChild(i);
        document.body.appendChild(f);
        f.submit();
      }
    }
  }
</script>

<div class="wrap">
  <h1 class="pageTitle">Questions</h1>

  <ListTable
    items={items}
    columns={columns}
    rowKey="id"
    searchable={true}
    searchKeys={['name','slug','tcode','chEx']}
    thumbBaseUrl="/media/images"
    emptyMessage="No questions yet."
    on:rowClick={onRowClick}
    on:action={onAction}
  />
</div>

<style>
  .wrap { padding: 1rem; color: var(--primaryText); }
  .pageTitle { margin: 0 0 .75rem; font-size: 1.25rem; }
</style>
```

That’s it. You now have a full-featured list page.

---

## Examples (copy & adapt)

### A) Minimal “Users” list (no thumbs, basic search)

```svelte
<ListTable
  items={users.map(u => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`.trim() || '—',
    email: u.email,
    role: u.role,
    createdAt: u.createdAt
  }))}
  columns={[
    { id:'name',     label:'Name',  accessor:'name',  primary:true, sortable:true },
    { id:'email',    label:'Email', accessor:'email', sortable:true },
    { id:'role',     label:'Role',  accessor:'role' },
    { id:'created',  label:'Joined',accessor:'createdAt', kind:'date', format:'date' },
    { id:'actions',  label:'', kind:'actions', action:['edit','disable'], align:'right' }
  ]}
  rowKey="id"
  searchable={true}
/>
```

### B) Single-line compact list (title + actions only)

```svelte
<ListTable
  items={posts.map(p => ({ id:p.slug, slug:p.slug, name:p.title ?? p.slug }))}
  columns={[
    { id:'name', label:'Title', accessor:'name', primary:true },
    { id:'actions', label:'', kind:'actions', action:['open','edit','delete'], align:'right' }
  ]}
  rowKey="id"
  searchable={true}
  searchKeys={['name','slug']}
/>
```

---

## Troubleshooting (90-second checklist)

* **Undefined cells** → Column `accessor` does **not** exist on your rows. Fix the row mapping or accessor name.
* **Empty table** → Missing or duplicate keys; ensure `rowKey` (e.g. `"id"`) exists and is unique.
* **Search “not working”** → Check `searchKeys`; ensure those fields contain strings (or values convertible to strings).
* **Click does nothing** → Bind `on:rowClick` and/or `on:action` in your page; the component never routes on its own.
* **Thumbnails missing** → If you pass a filename, set `thumbBaseUrl` (e.g. `"/media/images"`). For full URLs or `/absolute/paths`, no prefixing happens.

---

## Design rules (to keep it fast next time)

1. Normalize the **row shape** inside the page — never mutate the component for app specifics.
2. Keep `columns` **declarative**. If the table needs a new look, add a `kind` or tweak CSS — don’t add logic.
3. If you need server-side paging later, wrap this Lite table in a separate “Pro” wrapper — don’t bloat Lite.

---

## Done definition (DoD)

* Title shows, primary click navigates viewer by type.
* Buttons emit events; delete posts to the server action.
* Search filters immediately.
* Sort toggles on declared columns.
* No console errors; no “undefined” cells.

---

**This is your permanent playbook.**
New list page = loader → normalize rows → columns → mount table → wire two events.
Nothing else.
