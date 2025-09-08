<script>
  import '$lib/styles/tokens.css';
  import ListTable from '$lib/listTable/ListTable.svelte';
  import { goto } from '$app/navigation';

  export let data;

  // Normalize entries from loader
  const raw = Array.isArray(data?.entries) ? data.entries : [];
  const items = raw.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.title ?? r.slug ?? 'Untitled',
    type: r.type,
    category: r.category,
    status: r.status ?? '—',
    editedAt: r.updatedAt ?? r.createdAt ?? null,
    thumbnail: r.thumbnail ?? null
  }));

  // Declarative columns
  const columns = [
    { id:'thumbnail', label:'', accessor:'thumbnail', kind:'thumbnail', width:'sm' },
    { id:'name',      label:'Title',   accessor:'name', primary:true, sortable:true },
    { id:'type',      label:'Type',    accessor:'type', kind:'badge', sortable:true },
    { id:'category',  label:'Category',accessor:'category', sortable:true },
    { id:'slug',      label:'Slug',    accessor:'slug', sortable:true },
    { id:'status',    label:'Status',  accessor:'status', kind:'badge' },
    { id:'editedAt',  label:'Edited',  accessor:'editedAt', kind:'date', format:'relative' },
    { id:'actions',   label:'', kind:'actions', action:['edit','delete'], align:'right', width:'sm' }
  ];

  // Primary click → open viewer route
  function onRowClick(e) {
    const row = e.detail;
    if (!row) return;

    if (row.type === 'note') {
      goto(`/note/${encodeURIComponent(row.slug)}`);
    } else if (row.type === 'deck') {
      goto(`/player?slug=${encodeURIComponent(row.slug)}`);
    } else if (row.type === 'course') {
      goto(`/syllabus?tcode=${encodeURIComponent(row.slug)}`);
    } else {
      // unknown type → no-op or fallback
    }
  }

  // Handle edit/delete
  function onAction(e) {
    const { actionId, row } = e.detail || {};
    if (!row) return;

    if (actionId === 'edit') {
      goto(`/admin/edit-index?id=${row.id}`);
      return;
    }

    if (actionId === 'delete') {
      if (confirm(`Delete: ${row.name}?`)) {
        const f = document.createElement('form');
        f.method = 'post';
        f.action = '?/delete';
        const i = document.createElement('input');
        i.type = 'hidden';
        i.name = 'id';
        i.value = row.id;
        f.appendChild(i);
        document.body.appendChild(f);
        f.submit();
      }
    }
  }
</script>

<div class="wrap">
  <h1 class="pageTitle">Home Index</h1>

  <ListTable
    items={items}
    columns={columns}
    rowKey="id"
    searchable={true}
    searchKeys={['name','slug','type','category']}
    thumbBaseUrl="/media/images"
    emptyMessage="No entries yet."
    on:rowClick={onRowClick}
    on:action={onAction}
  />
</div>

<style>
  .wrap { padding: 1rem; color: var(--primaryText); }
  .pageTitle { margin: 0 0 .75rem; font-size: 1.25rem; }
</style>
