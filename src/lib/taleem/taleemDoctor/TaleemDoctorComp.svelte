<script>
  import { validate } from './taleemDoctor.js';

  export let question = null;
  export let strict = true;
  export let maxDiagnostics = 500;

  $: report   = question ? validate(question, { strict, maxDiagnostics }) : null;
  $: stats    = report?.stats ?? null;
  $: errors   = report?.errors ?? [];
  $: warnings = report?.warnings ?? [];
  $: ok       = report?.ok ?? false;

  function s(n, w, p = w + 's') { return `${n} ${n === 1 ? w : p}`; }
  function fmtNum(n, d = 1) { return (typeof n === 'number' && Number.isFinite(n)) ? n.toFixed(d) : '—'; }

  function copyJSON() {
    try {
      if (typeof navigator !== 'undefined' && report) {
        navigator.clipboard?.writeText(JSON.stringify(report, null, 2));
        copied = true;
        setTimeout(() => (copied = false), 1200);
      }
    } catch {}
  }
  let copied = false;
</script>

<div class="doctor">
  <div class="header">
    <h2 class="title">Deck Doctor</h2>
    {#if report}
      <span class:ok-badge={ok} class:bad-badge={!ok}>
        {ok ? 'OK' : 'Needs Fixes'}
      </span>
    {/if}
  </div>

  {#if !question}
    <div class="muted">No deck loaded.</div>
  {:else if !report}
    <div class="muted">Running checks…</div>
  {:else}
    <!-- Stats -->
    <div class="cards">
      <div class="card">
        <div class="card-label">Slides</div>
        <div class="card-value">{stats?.slideCount ?? '—'}</div>
      </div>
      <div class="card">
        <div class="card-label">Items</div>
        <div class="card-value">{stats?.items ?? '—'}</div>
      </div>
      <div class="card">
        <div class="card-label">Duration</div>
        <div class="card-value">{fmtNum(stats?.duration, 1)}s</div>
      </div>
      <div class="card wide">
        <div class="card-label">Types Used</div>
        <div class="card-value small">{(stats?.typesUsed ?? []).join(', ') || '—'}</div>
      </div>
    </div>

    <!-- Diagnostics -->
    <div class="diag-wrap">
      <div class="diag-row">
        <h3>Errors <span class="count">({errors.length})</span></h3>
        {#if errors.length === 0}
          <div class="muted">No errors.</div>
        {:else}
          <ul class="list">
            {#each errors as e, i}
              <li class="item error">
                <div class="line">
                  <code class="code">{e.code}</code>
                  <span class="msg">{e.message}</span>
                </div>
                {#if e.path}<div class="path">{e.path}</div>{/if}
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <div class="diag-row">
        <h3>Warnings <span class="count">({warnings.length})</span></h3>
        {#if warnings.length === 0}
          <div class="muted">No warnings.</div>
        {:else}
          <ul class="list">
            {#each warnings as w, i}
              <li class="item warn">
                <div class="line">
                  <code class="code">{w.code}</code>
                  <span class="msg">{w.message}</span>
                </div>
                {#if w.path}<div class="path">{w.path}</div>{/if}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>

    <div class="actions">
      <button on:click|preventDefault={copyJSON}>Copy full report</button>
      {#if copied}<span class="copied">Copied ✓</span>{/if}
      <span class="meta">schema: {report?.meta?.schemaVersion || '—'}</span>
    </div>
  {/if}
</div>

<style>
  .doctor { margin-top: 1rem; color: var(--primaryText); }

  /* Header */
  .header { display: flex; align-items: center; gap: .75rem; margin-bottom: .5rem; }
  .title { font-size: 1.1rem; margin: 0; color: var(--primaryText); }

  .ok-badge, .bad-badge {
    font-size: .75rem;
    padding: .15rem .5rem;
    border-radius: .5rem;
    border: 1px solid var(--borderColor);
  }
  .ok-badge {
    background: color-mix(in oklab, var(--secondaryColor) 14%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--secondaryColor) 45%, var(--borderColor));
    color: var(--primaryText);
  }
  .bad-badge {
    background: color-mix(in oklab, var(--accentColor) 14%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--accentColor) 45%, var(--borderColor));
    color: var(--primaryText);
  }

  .muted { color: var(--secondaryText); padding: .5rem 0; }

  /* Stat cards */
  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: .5rem;
    margin: .5rem 0 1rem;
  }
  .card {
    border: 1px solid var(--borderColor);
    border-radius: .5rem;
    background: var(--surfaceColor);
    padding: .6rem .7rem;
  }
  .card.wide { grid-column: 1 / -1; }
  .card-label { font-size: .75rem; color: var(--secondaryText); }
  .card-value { font-size: 1.1rem; margin-top: .15rem; color: var(--primaryText); }
  .card-value.small { font-size: .9rem; word-break: break-word; }

  /* Diagnostics lists */
  .diag-wrap { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  .diag-row h3 { font-size: 1rem; margin: .25rem 0 .25rem; color: var(--primaryText); }
  .count { color: var(--secondaryText); font-weight: normal; }
  .list { list-style: none; padding: 0; margin: .25rem 0 0; display: flex; flex-direction: column; gap: .4rem; }

  .item {
    border: 1px solid var(--borderColor);
    border-radius: .5rem;
    background: var(--surfaceColor);
    padding: .5rem .6rem;
  }
  .item.error {
    border-color: color-mix(in oklab, var(--accentColor) 55%, var(--borderColor));
    box-shadow: 0 0 0 0px color-mix(in oklab, var(--accentColor) 10%, transparent);
  }
  .item.warn  {
    border-color: color-mix(in oklab, var(--primaryColor) 45%, var(--borderColor));
    box-shadow: 0 0 0 0px color-mix(in oklab, var(--primaryColor) 8%, transparent);
  }

  .line { display: flex; align-items: center; gap: .5rem; }
  .code {
    font-size: .75rem;
    border: 1px solid var(--borderColor);
    border-radius: .35rem;
    padding: .05rem .35rem;
    background: color-mix(in oklab, var(--primaryText) 6%, var(--surfaceColor));
    color: var(--primaryText);
  }
  .msg { flex: 1; color: var(--primaryText); }
  .path {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: .75rem;
    color: var(--secondaryText);
    margin-top: .25rem;
    word-break: break-word;
  }

  /* Actions */
  .actions { display: flex; align-items: center; gap: .6rem; margin-top: .75rem; }
  .actions button {
    padding: .45rem .8rem;
    border: 1px solid var(--borderColor);
    border-radius: .5rem;
    background: var(--surfaceColor);
    color: var(--primaryText);
    cursor: pointer;
    transition: background .15s ease, border-color .15s ease, transform .12s ease;
  }
  .actions button:hover {
    background: color-mix(in oklab, var(--primaryText) 6%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
    transform: translateY(-1px);
  }
  .copied { font-size: .85rem; color: color-mix(in oklab, var(--secondaryColor) 75%, var(--primaryText)); }
  .meta { margin-left: auto; color: var(--secondaryText); font-size: .8rem; }
</style>
