<!-- /src/routes/admin/homeIndex/+page.svelte -->
<script>
  import { enhance } from '$app/forms';

  export let data;

  // incoming data
  let category   = data.category || '';
  let categories = Array.isArray(data.categories) ? data.categories : [];  // [{ category, count }]
  let items      = Array.isArray(data.items) ? data.items : [];

  // simple sticky-form state (for server failures)
  let formState = null;
  const v = (k, d='') => (formState?.values?.[k] ?? d);

  // category controls for CREATE form
  const catList = categories.map(c => c.category);
  let selectedCat = category || (catList[0] ?? '');
  let newCat = ''; // if user types new, we'll use that instead

  // actual value posted as "category"
  $: chosenCategory = (newCat && newCat.trim()) ? newCat.trim() : selectedCat;

  const onEnhance = () => ({
    result
  }) => {
    if (result.type === 'failure') {
      formState = result.data;
      return;
    }
    // success case redirects; no special handling needed here
    formState = null;
  };

  function fmt(ts) {
    try { return new Date(ts).toLocaleString(); } catch { return ''; }
  }
</script>

<svelte:head>
  <title>Home Index — Admin</title>
</svelte:head>

<div class="wrap">
  <h1>Home Index — Curation</h1>

  <!-- Category filter (YouTube-style pills) -->
  <div class="pillbar">
    <a class={!category ? 'active' : ''} href="/admin/homeIndex">All</a>
    {#each categories as c}
      <a
        class={category === c.category ? 'active' : ''}
        href={"/admin/homeIndex?category=" + encodeURIComponent(c.category)}
      >
        {c.category} <span class="muted">({c.count})</span>
      </a>
    {/each}
  </div>

  <!-- CREATE: simple, readable -->
  <div class="card" style="margin-bottom: 1rem;">
    <h2 style="margin:0 0 .75rem 0;">Add Item</h2>

    {#if formState?.message}
      <div class="danger">{formState.message}</div>
    {/if}

    <form method="post" action="?/create" use:enhance={onEnhance} class="grid2">
      <!-- Category (pick existing OR type new) -->
      <div class="row">
        <label>Category (pick existing)</label>
        <select bind:value={selectedCat}>
          {#if !selectedCat && !catList.length}
            <option value="">— none —</option>
          {/if}
          {#each catList as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
        <div class="hint">Tabs on home (e.g., <em>videos</em>, <em>blog</em>, <em>featured</em>).</div>
      </div>

      <div class="row">
        <label>…or type a new category</label>
        <input type="text" placeholder="e.g. tutorials" bind:value={newCat} />
        <div class="hint">If filled, this will be used instead of the dropdown.</div>
      </div>

      <!-- Question slug -->
      <div class="row">
        <label>Question Slug</label>
        <input name="questionSlug" type="text" placeholder="what-is-algebra" value={v('questionSlug','')} required />
        <div class="hint">Must exist in the Questions table.</div>
      </div>

      <!-- Pinned + Sort -->
      <div class="row">
        <label>Placement</label>
        <div class="row-inline">
          <input id="pinned" name="pinned" type="checkbox" checked={v('pinned', false)} />
          <label for="pinned">Pinned</label>
          <input name="sortOrder" type="number" placeholder="auto" value={v('sortOrder','')} style="max-width: 8rem;" />
        </div>
        <div class="hint">Sort: lower appears first. Leave blank to append.</div>
      </div>

      <!-- Hidden resolved category -->
      <input type="hidden" name="category" value={chosenCategory} />

      <div style="grid-column: 1 / -1;">
        <button type="submit">Add</button>
      </div>
    </form>
  </div>

  <!-- LIST: clean table -->
  <div class="card">
    <h2 style="margin:0 0 .75rem 0;">
      Items {category ? `(${category})` : ''}
    </h2>

    {#if items.length === 0}
      <p class="muted">No items found.</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Sort</th>
            <th>Pinned</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Tcode</th>
            <th>Ex</th>
            <th>Type</th>
            <th>Edited</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each items as it, i}
            <tr>
              <td>{i + 1}</td>
              <td>{it.sortOrder ?? 0}</td>
              <td>{it.pinned ? 'Yes' : ''}</td>
              <td class="mono">{it.questionSlug}</td>
              <td>{it.question?.name ?? ''}</td>
              <td>{it.question?.tcode ?? ''}</td>
              <td>{it.question?.exercise ?? ''}</td>
              <td>{it.question?.type ?? ''}</td>
              <td>{it.question?.editedAt ? fmt(it.question.editedAt) : ''}</td>
              <td class="actions">
                <form method="post" action="?/delete" style="display:inline;">
                  <input type="hidden" name="id" value={it.id} />
                  <input type="hidden" name="category" value={category} />
                  <button type="submit" onclick="return confirm('Delete this item?')">Delete</button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>



<style>
  .wrap { max-width: 960px; margin: 1.5rem auto; padding: 0 1rem; }
  h1 { margin: 0 0 .5rem 0; }
  .pillbar { display:flex; flex-wrap:wrap; gap:.5rem; margin: .5rem 0 1rem 0; }
  .pillbar a, .pillbar span {
    padding: .35rem .6rem; border-radius: 999px; border:1px solid #334155;
    text-decoration: none; font-size: .9rem;
  }
  .pillbar .active { background: #0b64d2; color: white; border-color: #0b64d2; }
  .card { border:1px solid #334155; border-radius: 10px; padding: 1rem; }
  .grid2 { display:grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
  .row { display:flex; flex-direction: column; gap:.35rem; }
  label { font-weight: 600; }
  input[type="text"], input[type="number"], select {
    padding: .5rem .6rem; border: 1px solid #475569; border-radius: 8px; background: transparent;
  }
  .hint { font-size: .85rem; opacity: .8; }
  .danger { border:1px solid #7f1d1d; background:#7f1d1d22; padding:.5rem .6rem; border-radius:8px; margin-bottom:.6rem; }
  button { padding: .5rem .8rem; border-radius: 8px; border:1px solid #0b64d2; background:#0b64d2; color:white; font-weight:600; }
  table { width:100%; border-collapse: collapse; }
  thead th { text-align:left; border-bottom:1px solid #334155; padding:.5rem; }
  tbody td { border-bottom:1px solid #1f2937; padding:.5rem; vertical-align: top; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .muted { opacity: .8; }
  .actions button { background:#b91c1c; border-color:#b91c1c; }
  .row-inline { display:flex; align-items:center; gap:.5rem; }
</style>
