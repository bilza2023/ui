<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import { goto } from '$app/navigation';
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

  function badge(row) {
    if (row.type === 'deck') return { label: 'Deck', bg: '#0c0535', fg: '#dcd6ff' };
    if (row.type === 'note') return { label: 'Note', bg: '#6c430b', fg: '#ffe3c4' };
    return { label: row.type ?? 'Item', bg: '#2E1C02', fg: '#e6ccb0' };
  }
</script>

<svelte:head>
  <title>Admin — Question Index</title>
</svelte:head>

<Nav />


<div class="page">
  <header class="top">
    <div class="left">
      <h1>Question Index</h1>
      <div class="totals">
        <span class="pill">All: {totals.all}</span>
        <span class="pill decks">Decks: {totals.decks}</span>
        <span class="pill notes">Notes: {totals.notes}</span>
      </div>
    </div>
    <div class="right">
      <a class="btn" href="/admin/upload">+ Upload Deck</a>
      <a class="btn" href="/admin/uploadNotes">+ Upload Note</a>
    </div>
  </header>

  <section class="filters">
    <input class="search" type="search" placeholder="Search filename / name / desc / exercise…" bind:value={q} on:keydown={(e)=>e.key==='Enter'&&apply()} />

    <div class="group">
      <label>Type</label>
      <div class="seg">
        <button class:active={!type} on:click={() => { type = null; apply(); }}>All</button>
        <button class:active={type==='deck'} on:click={() => { type = 'deck'; apply(); }}>Decks</button>
        <button class:active={type==='note'} on:click={() => { type = 'note'; apply(); }}>Notes</button>
      </div>
    </div>

    <div class="group">
      <label>Tcode</label>
      <select bind:value={tcode} on:change={apply}>
        <option value=''>All</option>
        {#each tcodeOptions as t}
          <option value={t}>{t} ({tcodeStats[t]?.total ?? 0})</option>
        {/each}
      </select>
    </div>

    <div class="group">
      <label>Sort</label>
      <select bind:value={sort} on:change={apply}>
        <option value="edited_desc">Last Edited (newest)</option>
        <option value="created_desc">Created (newest)</option>
        <option value="name_asc">Name (A–Z)</option>
      </select>
    </div>

    <button class="clear" on:click={clearAll}>Reset</button>
  </section>

  <section class="taleemTableWrap">
    {#if items.length === 0}
      <div class="empty">No items found.</div>
    {:else}
      <table class="taleemTable">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name / Filename</th>
            <th>Path</th>
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
                <span class="badge" style={`--bg:${b.bg};--fg:${b.fg}`}>{b.label}</span>
              </td>
              <td class="name">
                <div class="n1">{row.name ?? row.filename}</div>
                <div class="n2">{row.filename}</div>
              </td>
              <td class="path">
                <div class="p1">{row.tcode}</div>
                <div class="p2">Ch {row.chapter} · {row.exercise}</div>
              </td>
              <td>{row.editedAt ? new Date(row.editedAt).toLocaleString() : '—'}</td>
              <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}</td>
              <td class="actions">
                <a class="btn small" href={hrefFor(row)} target="_blank" rel="noopener">Open</a>
                <a class="btn small" href="/admin/editor?filename={row.filename}" target="_blank" rel="noopener">Editor</a>
                <a class="btn small" href="/admin/delete?filename={row.filename}" target="_blank" rel="noopener">Delete</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </section>
</div>

<style>
  /* Warm dark (app-aligned) — page theming only */
  :root{
    --bg:#1b1205;
    --panel:#241706;
    --panel-2:#2e1c02;
    --text:#f7ecda;
    --muted:#c9b598;
    --line:rgba(255,255,255,0.10);
    --line-2:rgba(255,255,255,0.16);
    --hover:rgba(255,255,255,0.04);
    --accent:#e9b669;
  }
  :global(body){ background:var(--bg)!important; color:var(--text); }

  .page{ padding:12px; display:flex; flex-direction:column; gap:12px; }

  /* Header */
  .top{
    display:flex; justify-content:space-between; align-items:center;
    background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:10px 12px;
  }
  .left h1{ margin:0; font-size:1.1rem; color:var(--text); }
  .totals{ display:flex; gap:8px; margin-top:6px; }
  .pill{ background:var(--panel-2); color:var(--text); border:1px solid var(--line); border-radius:999px; padding:2px 8px; font-size:12px; }
  .pill.decks{ background:#20173d; color:#e4e6ff; }
  .pill.notes{ background:#3a230e; color:#ffe8cc; }

  /* Filters */
  .filters{
    display:flex; gap:10px; align-items:center; flex-wrap:wrap;
    background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:10px;
  }
  .search{
    min-width:280px; padding:6px 10px; border:1px solid var(--line); border-radius:8px;
    background:var(--panel-2); color:var(--text);
  }
  .group{ display:flex; align-items:center; gap:8px; color:var(--muted); }
  .seg{ display:flex; gap:6px; }
  .seg button{
    padding:4px 10px; border:1px solid var(--line); border-radius:8px; background:var(--panel-2); color:var(--text); cursor:pointer;
  }
  .seg button.active{ background:#3a220d; border-color:var(--line-2); }
  select{
    padding:6px 10px; border:1px solid var(--line); border-radius:8px; background:var(--panel-2); color:var(--text);
  }
  .clear{
    margin-left:auto; padding:6px 10px; border:1px solid var(--line); border-radius:8px; background:var(--panel-2); color:var(--text); cursor:pointer;
  }

  /* Local override to make this table full-width */
  .taleemTableWrap{ max-width:none; }

  /* Elements not covered by shared table CSS */
  .badge{
    background: var(--panel-2);
    color: var(--text);
    border:1px solid var(--line);
    border-radius:999px;
    font-size:12px;
    padding:2px 8px;
  }

  .btn{
    padding:6px 10px;
    border:1px solid var(--line);
    border-radius:8px;
    background:var(--panel-2);
    color:var(--text);
    text-decoration:none;
  }
  .btn.small{ font-size:12px; padding:4px 8px; }
  .btn:hover{ background:#3a220d; border-color:var(--line-2); color:var(--accent); }

  .empty{ opacity:.7; padding:24px; text-align:center; }
</style>
