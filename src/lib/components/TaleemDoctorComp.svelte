<script>
    import { validate } from '$lib/taleemDoctor/taleemDoctor.js';
  
    // Props
    export let question = null;     // full question object; slides at question.deck
    export let strict = true;       // keep as strict validation by default
    export let maxDiagnostics = 500;
  
    // Derived doctor report
    $: report = question
      ? validate(question, { strict, maxDiagnostics })
      : null;
  
    // Shorthands
    $: stats    = report?.stats ?? null;
    $: errors   = report?.errors ?? [];
    $: warnings = report?.warnings ?? [];
    $: ok       = report?.ok ?? false;
  
    // UI helpers
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
    .doctor { margin-top: 1rem; }
    .header { display:flex; align-items:center; gap:.75rem; margin-bottom:.5rem; }
    .title { font-size:1.1rem; margin:0; }
    .ok-badge, .bad-badge {
      font-size:.75rem; padding:.15rem .5rem; border-radius:.5rem; border:1px solid transparent;
    }
    .ok-badge  { color:#58d68d; border-color:#2e7d32; }
    .bad-badge { color:#f39c12; border-color:#7d4f00; }
  
    .muted { opacity:.7; padding:.5rem 0; }
  
    .cards { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:.5rem; margin:.5rem 0 1rem; }
    .card { border:1px solid #333; border-radius:.5rem; padding:.6rem .7rem; background:transparent; }
    .card.wide { grid-column: 1 / -1; }
    .card-label { font-size:.75rem; opacity:.7; }
    .card-value { font-size:1.1rem; margin-top:.15rem; }
    .card-value.small { font-size:.9rem; word-break: break-word; }
  
    .diag-wrap { display:grid; grid-template-columns: 1fr; gap:1rem; }
    .diag-row h3 { font-size:1rem; margin:.25rem 0 .25rem; }
    .count { opacity:.7; font-weight:normal; }
    .list { list-style:none; padding:0; margin:.25rem 0 0; display:flex; flex-direction:column; gap:.4rem; }
    .item { border:1px solid #333; border-radius:.5rem; padding:.5rem .6rem; }
    .item.error { border-color:#7d1a1a; }
    .item.warn  { border-color:#6b5600; }
    .line { display:flex; align-items:center; gap:.5rem; }
    .code { font-size:.75rem; border:1px solid #444; border-radius:.35rem; padding:.05rem .35rem; opacity:.9; }
    .msg { flex:1; }
    .path { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
            font-size:.75rem; opacity:.8; margin-top:.25rem; }
  
    .actions { display:flex; align-items:center; gap:.6rem; margin-top:.75rem; }
    button { padding:.45rem .8rem; border:1px solid #444; border-radius:.5rem; background:transparent; }
    .copied { font-size:.85rem; color:#7ddc7a; }
    .meta { margin-left:auto; opacity:.7; font-size:.8rem; }
  </style>
  