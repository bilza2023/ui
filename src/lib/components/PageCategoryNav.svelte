<script>
    // Standalone pill-nav (RoundToggle look), no external imports
    // Props
    export let items = [];          // [{ id, label, icon? }]
    export let active = null;       // the selected id (controls highlight)
    export let size = 54;           // visual height in px
    export let gap = '10px';        // space between pills
    export let evt = (item) => { console.log('PageCategoryNav click:', item); };
  </script>
  
  <nav class="pcn" aria-label="Page categories">
    <div class="row" style="--gap:{gap}">
      {#each items as it (it.id)}
        <button
          type="button"
          class="pill {it.id === active ? 'active' : ''}"
          style="--btn-h:{size}px"
          aria-current={it.id === active ? 'page' : undefined}
          on:click={() => evt(it)}
        >
          {#if it.icon}
            <span class="ico" aria-hidden="true">{it.icon}</span>
          {/if}
          <span class="lbl">{it.label}</span>
        </button>
      {/each}
    </div>
  </nav>
  
  <style>
    /* container */
    .pcn { width: 100%; }
    .row { display: flex; flex-wrap: wrap; gap: var(--gap, 10px); align-items: center; }
  
    /* pill (RoundToggle-like) — tokens.css only */
    .pill {
      appearance: none;
      height: var(--btn-h, 54px);
      padding: 0 16px;
      border-radius: 999px;
      border: 2px solid var(--borderColor);
      background: var(--surfaceColor);
      color: var(--primaryText);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font: inherit;
      line-height: 1;
      cursor: pointer;
      transition:
        transform .06s ease,
        background-color .15s ease,
        border-color .15s ease,
        box-shadow .15s ease;
      /* subtle gloss + tiny lift */
      box-shadow:
        0 1px 0 rgba(0,0,0,.06),
        inset 0 1px 0 rgba(255,255,255,.10);
      outline: none;
    }
  
    .pill:hover {
      border-color: color-mix(in oklab, var(--borderColor), var(--primaryColor) 40%);
      background: color-mix(in oklab, var(--surfaceColor), var(--primaryColor) 9%);
      box-shadow:
        0 6px 16px rgba(0,0,0,.10),
        inset 0 1px 0 rgba(255,255,255,.10);
    }
  
    .pill:active { transform: translateY(1px) scale(0.99); }
  
    .pill:focus-visible {
      box-shadow:
        0 0 0 2px color-mix(in oklab, var(--surfaceColor), var(--primaryColor) 38%),
        0 0 0 5px color-mix(in oklab, var(--primaryColor), white 28%),
        0 1px 0 rgba(0,0,0,.06);
      border-color: var(--primaryColor);
    }
  
    /* active = filled tint, stronger border */
    .pill.active {
      background: color-mix(in oklab, var(--surfaceColor), var(--primaryColor) 20%);
      border-color: color-mix(in oklab, var(--borderColor), var(--primaryColor) 60%);
      box-shadow:
        0 2px 10px color-mix(in oklab, var(--primaryColor), black 18%),
        inset 0 1px 0 rgba(255,255,255,.10);
    }
  
    /* icon bubble */
    .ico {
      display: inline-grid;
      place-items: center;
      width: calc(var(--btn-h, 54px) * 0.5);
      height: calc(var(--btn-h, 54px) * 0.5);
      border-radius: 999px;
      background: color-mix(in oklab, var(--surfaceColor), var(--primaryColor) 18%);
      box-shadow:
        inset 0 1px 1px rgba(255,255,255,.22),
        inset 0 -1px 1px rgba(0,0,0,.10);
      font-size: 0.9em;
    }
  
    .lbl { white-space: nowrap; }
  </style>
  