<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  // client helpers (use only after mount)
  import {
    listTcodes,
    getChapters,
    chapterNo as chapterNoOf
  } from '../../lib/services/synopisisServices2';

  // from server load
  export let totals  = { all: 0, decks: 0, notes: 0 };
  export let filters = {
    tcode: null,      // string | null
    chapter: null,    // number | null
    type: null,       // 'deck' | 'note' | null
    q: ''             // optional
  };

  // local UI state
  let ready = false;
  let tcode = filters.tcode ?? '';
  let chapterNoStr = filters.chapter != null ? String(filters.chapter) : '';
  let type = filters.type ?? null; // 'deck' | 'note' | null (=All)

  // options
  let tcodes = [];   // [{ tcodeName, name? }]
  let chapters = []; // [{ num, name, slug }]

  let formEl;

  function buildChapters() {
    chapters = [];
    if (!tcode) return;
    const raw = getChapters(tcode) ?? [];
    chapters = raw.map(c => {
      let num = null;
      try { num = chapterNoOf(tcode, c.slug); } catch {}
      if (!Number.isFinite(num)) {
        const rough = Number(c.no ?? c.chapterNo ?? String(c.slug).replace(/\D+/g, ''));
        num = Number.isFinite(rough) ? rough : null;
      }
      return { num, name: c.name ?? c.slug, slug: c.slug };
    }).filter(c => c.num != null)
      .sort((a,b)=>a.num-b.num);
  }

  // submit helpers
  function submitNow() { if (formEl) formEl.submit(); }

  function onTcodeChange(e) {
    tcode = e.target.value;
    chapterNoStr = '';   // reset chapter when tcode changes
    buildChapters();
    submitNow();
  }
  function onChapterChange(e) {
    chapterNoStr = e.target.value; // select values are strings
    submitNow();
  }
  function onTypeChange(e) {
    type = e.target.value || null; // '' => All
    submitNow();
  }

  onMount(() => {
    if (!browser) return;
    tcodes = listTcodes() ?? [];
    buildChapters();
    ready = true;
  });
</script>

<div class="page-nav">
  <div class="left">
    <h1>Question Index</h1>
    <div class="totals">
      <span class="pill">All: {totals.all}</span>
      <span class="pill decks">Decks: {totals.decks}</span>
      <span class="pill notes">Notes: {totals.notes}</span>
    </div>
  </div>

  <div class="right">
    <!-- GET form: guarantees URL params reach +page.server.js -->
    <form method="GET" action={$page.url.pathname} bind:this={formEl} class="filters" aria-busy={!ready}>
      <!-- keep q if present -->
      {#if $page.url.searchParams.get('q')}
        <input type="hidden" name="q" value={$page.url.searchParams.get('q')} />
      {/if}

      <!-- Type toggle as radios ('' = All) -->
      <div class="type-toggle">
        <label>
          <input type="radio" name="type" value="" on:change={onTypeChange} checked={!type} />
          All
        </label>
        <label>
          <input type="radio" name="type" value="note" on:change={onTypeChange} checked={type==='note'} />
          Notes
        </label>
        <label>
          <input type="radio" name="type" value="deck" on:change={onTypeChange} checked={type==='deck'} />
          Slides
        </label>
      </div>

      <!-- Tcode -->
      <select name="tcode" bind:value={tcode} on:change={onTcodeChange} aria-label="Tcode" disabled={!ready}>
        <option value="">All tcodes</option>
        {#if ready}
          {#each tcodes as t}
            <option value={t.tcodeName}>{t.name ?? t.tcodeName}</option>
          {/each}
        {/if}
      </select>

      <!-- Chapter (number) -->
      <!-- <select name="chapter" bind:value={chapterNoStr} on:change={onChapterChange} aria-label="Chapter" disabled={!ready || !tcode}>
        <option value="">All chapters</option>
        {#if ready && tcode}
          {#each chapters as c}
            <option value={String(c.num)}>Ch {c.num} — {c.name}</option>
          {/each}
        {/if}
      </select> -->
    </form>
  </div>
</div>
<style>
  /* one-line, left-aligned navbar using your token set */
  .page-nav {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0 12px;
    border-bottom: 1px solid var(--borderColor);
    color: var(--primaryText);
    background: transparent;
    white-space: nowrap;     /* keep in one line */
    overflow-x: auto;        /* scroll if narrow */
    scrollbar-width: thin;
  }

  /* keep both clusters inline on the left */
  .left,
  .right,
  .filters,
  .type-toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    flex-wrap: nowrap;
  }
  .right { margin-left: 12px; } /* sits after .left, still left-aligned */

  /* compact title + totals */
  .left h1 {
    margin: 0;
    font-size: 1rem;
    line-height: 1;
    color: var(--primaryText);
  }
  .totals {
    display: inline-flex;
    gap: 8px;
    color: var(--secondaryText);
  }

  /* selects use surface/border tokens */
  select {
    padding: 6px 10px;
    border-radius: 10px;
    background: var(--surfaceColor);
    color: var(--primaryText);
    border: 1px solid var(--borderColor);
  }
  select:hover { border-color: var(--primaryColor); }
  select:focus-visible {
    outline: 2px solid var(--primaryColor);
    outline-offset: 0;
  }

  /* simple radio group */
  .type-toggle label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border: 1px solid var(--borderColor);
    border-radius: 999px;
    background: transparent;
    color: var(--primaryText);
    cursor: pointer;
  }
  .type-toggle input { accent-color: var(--primaryColor); }
  .type-toggle input:focus-visible { outline: 2px solid var(--primaryColor); }

  /* optional: subtle pills if your .pill isn't already styled */
  .pill {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid var(--borderColor);
    border-radius: 999px;
    background: var(--surfaceColor);
  }
</style>
