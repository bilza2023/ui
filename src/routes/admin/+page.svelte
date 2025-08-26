<script>
  import { goto } from '$app/navigation';
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "../../lib/components/AdminNav.svelte";
  import '$lib/styles/tables.css';

  export let data;

  let items      = [];
  let totals     = { all: 0, decks: 0, notes: 0 };
  let tcodeStats = {};

  // base filter shape
  let filters = { q: '', type: null, tcode: null, limit: 200, offset: 0, sort: 'edited_desc' };

  // locals bound to inputs
  let q = '';
  let type = null;   // 'deck' | 'note' | null
  let tcode = null;  // string | null
  let sort = 'edited_desc';

  // ---------- hydrate from server data ----------
  $: if (data) {
    items      = data.items      ?? [];
    totals     = data.totals     ?? totals;
    tcodeStats = data.tcodeStats ?? tcodeStats;
    filters    = { ...filters, ...(data.filters ?? {}) };

    q     = filters.q     ?? '';
    type  = (filters.type === 'deck' || filters.type === 'note') ? filters.type : null;
    tcode = filters.tcode ?? null;
    sort  = filters.sort  ?? 'edited_desc';
  }

  $: tcodeOptions = Object.keys(tcodeStats).sort((a, b) => a.localeCompare(b));

  // ---------- actions ----------
  function apply() {
    const p = new URLSearchParams();
    if (q)     p.set('q', q);
    if (type)  p.set('type', type);
    if (tcode) p.set('tcode', tcode);
    if (sort)  p.set('sort', sort);
    p.set('limit', String(filters.limit ?? 200));
    p.set('offset', '0');
    goto(`/admin?${p.toString()}`, { replaceState: true });
  }

  function clearAll() {
    goto('/admin', { replaceState: true });
  }

  function hrefFor(row) {
    if (row.type === 'deck') return `/player?filename=${encodeURIComponent(row.filename)}`;
    if (row.type === 'note') return `/notes?filename=${encodeURIComponent(row.filename)}`;
    return '#';
  }

  // UTF-8 icon badges
  function badge(row) {
    if (row.type === 'deck') return { label: '📽️', title: 'Deck', bg: '#0c0535', fg: '#dcd6ff' };
    if (row.type === 'note') return { label: '📚',  title: 'Note', bg: '#6c430b', fg: '#ffe3c4' };
    return { label: '•', title: row.type ?? 'Item', bg: '#2E1C02', fg: '#e6ccb0' };
  }
</script>

<svelte:head>
  <title>Admin — Question Index</title>
</svelte:head>

<Nav />
<AdminNav />

<div class="page">
  <header class="top compact">
    <h1>Question Index</h1>

    <div class="controls">
      <input
        class="search"
        type="search"
        placeholder="Search filename / name / desc / exercise…"
        bind:value={q}
        on:keydown={(e)=>e.key==='Enter'&&apply()}
      />

      <!-- Type: All / Decks / Notes -->
      <select
        class="sel"
        on:change={(e)=>{ const v=e.currentTarget.value; type = v || null; apply(); }}
      >
        <option value="" selected={!type}>All</option>
        <option value="deck" selected={type==='deck'}>Decks</option>
        <option value="note" selected={type==='note'}>Notes</option>
      </select>

      <!-- Tcode: simplified (no counts) -->
      <select class="sel" bind:value={tcode} on:change={apply}>
        <option value=''>All tcodes</option>
        {#each tcodeOptions as t}
          <option value={t}>{t}</option>
        {/each}
      </select>

      <!-- Sort -->
      <select class="sel" bind:value={sort} on:change={apply}>
        <option value="edited_desc">Last Edited (newest)</option>
        <option value="created_desc">Created (newest)</option>
        <option value="name_asc">Name (A–Z)</option>
      </select>

      <button class="clear" on:click={clearAll}>Reset</button>
    </div>
  </header>

  <section class="taleemTableWrap">
    {#if items.length === 0}
      <div class="empty">No items found.</div>
    {:else}
      <table class="taleemTable">
        <thead>
          <tr>
            <th>Type</th>
            <th>Filename/Name</th>
            <th>Subj/Chapter/Ex</th>
            <th>Edited</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each items as row}
            {@const b = badge(row)}
            <tr>
              <td class="type">
                <span
                  class="badge"
                  style={`--bg:${b.bg};--fg:${b.fg}`}
                  title={b.title}
                  aria-label={b.title}
                >{b.label}</span>
              </td>
              <td class="name">
                <div class="n2">{row.filename}</div>
                <div class="n1">{row.name ?? row.filename}</div>
              </td>
              <td class="path">
                <div class="p1">{row.tcode}</div>
                <div class="p2">Ch {row.chapter} · {row.exercise}</div>
              </td>
              <td>{row.editedAt ? new Date(row.editedAt).toLocaleString() : '—'}</td>
              <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
              <td class="actions">
                <a class="btn small" href={hrefFor(row)} target="_blank" rel="noopener">Open</a>
                
                
                {#if row.type == "note"}
                  <a class="btn small" href="/admin/editor_note?filename={row.filename}" target="_blank" rel="noopener">Note</a>
                {/if}
                {#if row.type == "deck"}
                  <a class="btn small" href="/admin/editor_slide?filename={row.filename}" target="_blank" rel="noopener">Slide</a>
                {/if}

                <a class="btn small" href="/admin/question_editor?filename={row.filename}" target="_blank" rel="noopener">Editor</a>


                <a class="btn small" href="/admin/delete?filename={row.filename}" target="_blank" rel="noopener">Del</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </section>
</div>

<style>
  /* Page theme */
  :global(body){ background: var(--backgroundColor) !important; color: var(--primaryText); }

  .page{ padding:12px; display:flex; flex-direction:column; gap:12px; }

  /* Header (legacy .top block) */
  .top{
    display:flex; justify-content:space-between; align-items:center;
    background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
    border:1px solid var(--borderColor);
    border-radius:12px; padding:10px 12px;
    color: var(--primaryText);
  }
  .left h1{ margin:0; font-size:1.1rem; color: var(--primaryText); }
  .totals{ display:flex; gap:8px; margin-top:6px; }
  .pill{
    background: color-mix(in oklab, var(--accentColor) 12%, var(--surfaceColor));
    color: var(--primaryText);
    border:1px solid var(--borderColor);
    border-radius:999px; padding:2px 8px; font-size:12px;
  }
  .pill.decks{ background: color-mix(in oklab, var(--primaryColor) 16%, var(--surfaceColor)); color: var(--backgroundColor); }
  .pill.notes{ background: color-mix(in oklab, var(--secondaryColor) 16%, var(--surfaceColor)); color: var(--backgroundColor); }

  /* Filters (legacy block not used in compact header but kept for parity) */
  .filters{
    display:flex; gap:10px; align-items:center; flex-wrap:wrap;
    background: var(--surfaceColor);
    border:1px solid var(--borderColor);
    border-radius:12px; padding:10px;
    color: var(--secondaryText);
  }
  .search{
    min-width:280px; padding:6px 10px;
    border:1px solid var(--borderColor); border-radius:8px;
    background: color-mix(in oklab, var(--accentColor) 8%, var(--surfaceColor));
    color: var(--primaryText);
  }
  .group{ display:flex; align-items:center; gap:8px; color: var(--secondaryText); }
  .seg{ display:flex; gap:6px; }
  .seg button{
    padding:4px 10px; border:1px solid var(--borderColor); border-radius:8px;
    background: var(--surfaceColor); color: var(--primaryText); cursor:pointer;
    transition: background .15s ease, border-color .15s ease, color .15s ease;
  }
  .seg button:hover{
    border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
    background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
  }
  .seg button.active{
    background: var(--primaryColor); border-color: var(--primaryColor);
    color: var(--backgroundColor);
  }
  select{
    padding:6px 10px; border:1px solid var(--borderColor); border-radius:8px;
    background: var(--surfaceColor); color: var(--primaryText);
  }
  .clear{
    margin-left:auto; padding:6px 10px; border:1px solid var(--borderColor); border-radius:8px;
    background: var(--surfaceColor); color: var(--primaryText); cursor:pointer;
  }
  .clear:hover{
    border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
    background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
  }

  /* Local override to make this table full-width */
  .taleemTableWrap{ max-width:none; }

  /* Elements not covered by shared table CSS */
  .badge{
    /* Use passed colors when available, fallback to theme */
    background: var(--bg, color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor)));
    color: var(--fg, var(--primaryText));
    border:1px solid var(--borderColor);
    border-radius:999px;
    font-size: 16px;            /* nicer emoji size */
    line-height: 1;
    padding:2px 8px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-width: 28px;
  }

  .btn{
    padding:6px 10px;
    border:1px solid var(--borderColor);
    border-radius:8px;
    background: var(--surfaceColor);
    color: var(--primaryText);
    text-decoration:none;
    transition: background .15s ease, border-color .15s ease, color .15s ease, transform .12s ease;
  }
  .btn.small{ font-size:12px; padding:4px 8px; }
  .btn:hover{
    background: color-mix(in oklab, var(--accentColor) 12%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
    color: var(--primaryText);
    transform: translateY(-1px);
  }

  .empty{ opacity:.7; padding:24px; text-align:center; color: var(--secondaryText); }

  /* Single-line toolbar */
  .top.compact{
    display:flex; align-items:center; justify-content:space-between; gap:12px;
    background: var(--surfaceColor);
    border:1px solid var(--borderColor);
    border-radius:12px;
    padding:10px 12px;
    color: var(--primaryText);
  }
  .top.compact h1{
    margin:0; font-size:1.1rem; color: var(--primaryText); white-space:nowrap;
  }
  .top.compact .controls{
    display:flex; align-items:center; gap:8px; flex-wrap:nowrap;
  }
  .top.compact .search{
    width:min(420px, 42vw);
    padding:6px 10px;
    border:1px solid var(--borderColor);
    border-radius:8px;
    background: var(--surfaceColor);
    color: var(--primaryText);
  }
  .top.compact .sel{
    padding:6px 10px;
    border:1px solid var(--borderColor);
    border-radius:8px;
    background: var(--surfaceColor);
    color: var(--primaryText);
  }
  .top.compact .clear{
    padding:6px 10px;
    border:1px solid var(--borderColor);
    border-radius:8px;
    background: var(--surfaceColor);
    color: var(--primaryText);
    cursor:pointer;
  }

  /* Make it wrap gracefully on small screens */
  @media (max-width: 760px){
    .top.compact{ flex-wrap:wrap; gap:10px; }
    .top.compact .controls{ width:100%; flex-wrap:wrap; }
    .top.compact .search{ width:100%; }
  }
</style>
