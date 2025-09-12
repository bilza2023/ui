
<!-- /src/routes/admin/syllabus/exercises/+page.svelte -->
<script>
    import '$lib/styles/tokens.css';
    import ListTable from '$lib/listTable/ListTable.svelte';
    export let data;
  
    const { chapterId, chapter, tcode, exercises } = data;
    const scoped = Boolean(chapterId && chapter && tcode);
  
    const rows = (exercises ?? []).map(e => ({
      id: e.id,
      name: e.name,
      slug: e.slug,
      sortOrder: e.sortOrder ?? 0,
      questionCreateHref: `/admin/questions/create?exerciseId=${e.id}`,
      editHref: `/admin/syllabus/exercises/edit?id=${e.id}`
    }));
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'sortOrder', label: 'Sort' },
      { key: 'questionCreateHref', label: 'Add Question URL' },
      { key: 'editHref', label: 'Edit URL' }
    ];
  </script>
  
  <div class="wrap">
    {#if scoped}
      <header class="bar">
        <h1 class="h1">
          Exercises — {tcode.name} <small class="muted">({tcode.slug})</small> › {chapter.name}
        </h1>
        <div class="actions">
          <a class="btn" href={`/admin/syllabus/chapters?tcodeId=${tcode.id}`}>Back to Chapters</a>
          <a class="btn" href={`/admin/syllabus/exercises/create?chapterId=${chapter.id}`}>Create</a>
        </div>
      </header>
  
      <ListTable rows={rows} columns={columns} searchable={true} searchKeys={['name','slug']} />
  
      <div class="fallback">
        <ul>
          {#each rows as r (r.id)}
            <li>
              <strong>{r.name}</strong> <code>{r.slug}</code> — sort {r.sortOrder}
              — <a href={r.questionCreateHref}>Add Question</a>
              — <a href={r.editHref}>Edit</a>
            </li>
          {/each}
        </ul>
      </div>
    {:else}
      <header class="bar">
        <h1 class="h1">Select a chapter</h1>
      </header>
      <p>
        Open <a href="/admin/syllabus/chapters">Chapters</a>, choose a tcode, then click an “Exercises” link.
      </p>
    {/if}
  </div>
  
  <style>
    .wrap { max-width: 1100px; margin: 0 auto; padding: 1rem; }
    .bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 0.75rem; }
    .actions { display: flex; gap: 0.5rem; }
    .btn { padding: 0.5rem 0.9rem; border: 1px solid var(--border-3, hsl(0 0% 30%)); border-radius: 0.75rem; text-decoration: none; }
    .muted { opacity: 0.7; font-weight: normal; font-size: 0.9em; }
    .fallback { margin-top: 1.5rem; opacity: 0.8; }
  </style>
  