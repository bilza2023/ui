
<!-- /src/routes/admin/syllabus/chapters/+page.svelte -->
<script>
    import '$lib/styles/tokens.css';
    import ListTable from '$lib/listTable/ListTable.svelte';
    export let data;
  
    const tcodeId   = data?.tcodeId || 0;
    const tcode     = data?.tcode || null;
    const tcodes    = data?.tcodes ?? [];
    const chapters  = data?.chapters ?? [];
    const scoped    = Boolean(tcodeId && tcode);
  
    // Scoped view: chapters of selected tcode
    const chapterRows = chapters.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sortOrder: c.sortOrder ?? 0,
      exercisesHref: `/admin/syllabus/exercises?chapterId=${c.id}`,
      editHref: `/admin/syllabus/chapters/edit?id=${c.id}`
    }));
    const chapterColumns = [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'sortOrder', label: 'Sort' },
      { key: 'exercisesHref', label: 'Exercises URL' },
      { key: 'editHref', label: 'Edit URL' }
    ];
  
    // Unscoped view: choose a tcode
    const tcodeRows = tcodes.map(t => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      chaptersHref: `/admin/syllabus/chapters?tcodeId=${t.id}`
    }));
    const tcodeColumns = [
      { key: 'name', label: 'Tcode' },
      { key: 'slug', label: 'Slug' },
      { key: 'chaptersHref', label: 'Open Chapters' }
    ];
  </script>
  
  <div class="wrap">
    {#if scoped}
      <header class="bar">
        <h1 class="h1">Chapters — {tcode.name} <small class="muted">({tcode.slug})</small></h1>
        <a class="btn" href={`/admin/syllabus/chapters/create?tcodeId=${tcode.id}`}>Create</a>
      </header>
  
      <ListTable
        rows={chapterRows}
        columns={chapterColumns}
        searchable={true}
        searchKeys={['name','slug']}
      />
  
      <div class="fallback">
        <ul>
          {#each chapterRows as r (r.id)}
            <li>
              <strong>{r.name}</strong> <code>{r.slug}</code> — sort {r.sortOrder}
              — <a href={r.exercisesHref}>Exercises</a>
              — <a href={r.editHref}>Edit</a>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <header class="bar">
        <h1 class="h1">Select a Tcode</h1>
      </header>
  
      <ListTable
        rows={tcodeRows}
        columns={tcodeColumns}
        searchable={true}
        searchKeys={['name','slug']}
      />
  
      <div class="fallback">
        <ul>
          {#each tcodeRows as r (r.id)}
            <li>
              <strong>{r.name}</strong> <code>{r.slug}</code>
              — <a href={r.chaptersHref}>Open chapters</a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  
  <style>
    .wrap { max-width: 1100px; margin: 0 auto; padding: 1rem; }
    .bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .btn {
      padding: 0.5rem 0.9rem;
      border: 1px solid var(--border-3, hsl(0 0% 30%));
      border-radius: 0.75rem;
      text-decoration: none;
    }
    .muted { opacity: 0.7; font-weight: normal; font-size: 0.9em; }
    .fallback { margin-top: 1.5rem; opacity: 0.8; }
  </style>
  