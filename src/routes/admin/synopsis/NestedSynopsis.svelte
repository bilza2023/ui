<script>
    export let nested = [];
    // Accept single object or array
    $: items = Array.isArray(nested) ? nested : (nested ? [nested] : []);
  </script>
  
  <div class="nested">
    {#each items as tc}
      <details class="tcode" open>
        <summary>
          <span class="badge">{tc.tcodeName}</span>
          {#if tc.name && tc.name !== tc.tcodeName}
            <span class="title">{tc.name}</span>
          {/if}
          {#if tc.description}
            <span class="muted small desc">{tc.description}</span>
          {/if}
        </summary>
  
        <div class="chapters">
          {#each tc.chapters ?? [] as ch}
            <details class="chapter" open>
              <summary>
                <span class="chip">
                  {ch.sortOrder ? `Ch-${String(ch.sortOrder).padStart(2, '0')}` : 'Ch-—'}
                </span>
                <strong class="cname">{ch.name}</strong>
                <span class="code">[{ch.filename}]</span>
              </summary>
  
              <div class="exercises">
                {#if ch.exercises?.length}
                  {#each ch.exercises as ex}
                    <span class="pill" title={ex.filename}>{ex.name}</span>
                  {/each}
                {:else}
                  <span class="empty muted small">No exercises</span>
                {/if}
              </div>
            </details>
          {/each}
        </div>
      </details>
    {/each}
  </div>
  
  <style>
    @import '$lib/styles/tokens.css';
  
    .nested { display: grid; gap: 12px; }
    .muted { color: var(--secondaryText); }
    .small { font-size: .85rem; }
  
    details { border: 1px solid var(--borderColor); border-radius: 12px; background: var(--surfaceColor); }
    summary { list-style: none; cursor: pointer; padding: 10px 12px; display: flex; gap: 10px; align-items: baseline; }
    summary::-webkit-details-marker { display: none; }
  
    .badge {
      display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 999px;
      border: 1px solid var(--borderColor);
      background: color-mix(in oklab, var(--surfaceColor) 60%, transparent);
      color: var(--secondaryText); font-size: .78rem;
    }
    .title { font-weight: 600; }
    .desc { margin-left: auto; }
  
    .chapters { padding: 8px 10px 12px; display: grid; gap: 10px; }
    .chapter { background: var(--backgroundColor); border: 1px solid var(--borderColor); }
    .chapter > summary { background: color-mix(in oklab, var(--surfaceColor) 70%, transparent); }
  
    .chip {
      font-size: .75rem; padding: 2px 8px; border-radius: 999px;
      border: 1px solid var(--borderColor); color: var(--primaryText);
    }
    .cname { margin-left: 6px; }
    .code { margin-left: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--secondaryText); }
  
    .exercises { padding: 10px 12px; display: flex; flex-wrap: wrap; gap: 6px; }
    .pill {
      font-size: .78rem; padding: 4px 8px; border-radius: 999px;
      border: 1px solid var(--borderColor); background: var(--backgroundColor);
    }
    .empty { padding: 4px 0; }
  </style>
  