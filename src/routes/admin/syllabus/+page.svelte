

<script>
    import '$lib/styles/tokens.css';
    import ListTable from '$lib/listTable/ListTable.svelte';
    export let data;
  
    const rows = (data?.tcodes ?? []).map(t => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      chapterCount: t.chapterCount,
      chaptersHref: `/admin/syllabus/chapters?tcodeId=${t.id}`,
      editHref: `/admin/syllabus/tcodes/edit?id=${t.id}`
    }));
  
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'chapterCount', label: 'Chapters' },
      { key: 'chaptersHref', label: 'Chapters URL' },
      { key: 'editHref', label: 'Edit URL' }
    ];
  </script>
  
  <div class="wrap">
    <header class="bar">
      <h1 class="h1">Tcodes</h1>
      <a class="btn" href="/admin/syllabus/tcodes/create">Create</a>
    </header>
  
    <!-- Primary: ListTable -->
    <ListTable
      rows={rows}
      columns={columns}
      searchable={true}
      searchKeys={['name','slug']}
    />
  
    <!-- Minimal fallback list (kept for safety) -->
    <div class="fallback">
      <ul>
        {#each rows as r (r.id)}
          <li>
            <strong>{r.name}</strong> <code>{r.slug}</code>
            — <a href={r.chaptersHref}>Chapters</a>
            — <a href={r.editHref}>Edit</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  
  <style>
    .wrap { max-width: 1100px; margin: 0 auto; padding: 1rem; }
    .bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .btn { padding: 0.5rem 0.9rem; border: 1px solid var(--border-3, hsl(0 0% 30%));
           border-radius: 0.75rem; text-decoration: none; }
    .fallback { margin-top: 1.5rem; opacity: 0.8; }
  </style>
  