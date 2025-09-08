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

  // Declarative columns — accessors MUST match keys in items above
  const columns = [
    { id: 'thumbnail', label: '', accessor: 'thumbnail', kind: 'thumbnail', width: 'sm' },
    { id: 'name',      label: 'Title',   accessor: 'name',      primary: true, sortable: true },
    { id: 'type',      label: 'Type',    accessor: 'type',      kind: 'badge', width: 'sm', sortable: true },
    { id: 'tcode',     label: 'Subject', accessor: 'tcode',     width: 'sm' },
    { id: 'chEx',      label: 'Ch/Ex',   accessor: 'chEx',      width: 'md' },
    { id: 'status',    label: 'Status',  accessor: 'status',    kind: 'badge', width: 'sm' },
    { id: 'editedAt',  label: 'Edited',  accessor: 'editedAt',  kind: 'date', format: 'relative', width: 'sm' },
    { id: 'actions',   label: '',        kind: 'actions', action: ['edit','delete'], align: 'right', width: 'sm' }
  ];

  // Row click → viewer route by type
  function onRowClick(e) {
    const row = e.detail;
    if (!row) return;
    goto(row.type === 'note'
      ? `/note/${encodeURIComponent(row.slug)}`
      : `/player?slug=${encodeURIComponent(row.slug)}`
    );
  }

  // Generic actions → your routes
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
