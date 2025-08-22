<!-- src/lib/SecondaryNav.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];            // string[]
  export let pageDisplayState = 0;  // two-way bound from parent
  export let align = 'left';        // 'left' | 'center' | 'right'

  const dispatch = createEventDispatcher();

  function select(i) {
    pageDisplayState = i; // updates parent via bind:pageDisplayState
    dispatch('select', { index: i, ordinal: i + 1, label: items[i] });
  }

  $: jClass = align === 'center' ? 'jc-center' : align === 'right' ? 'jc-end' : 'jc-start';
</script>

<nav class="secnav" aria-label="Section navigation">
  <div class={"row " + jClass}>
    {#each items as label, i}
      <button
        type="button"
        class={"chip " + (pageDisplayState === i ? 'is-active' : '')}
        aria-current={pageDisplayState === i ? 'page' : undefined}
        on:click={() => select(i)}
      >
        <span class="dot" aria-hidden="true"></span>
        <span class="label">{label}</span>
      </button>
    {/each}
  </div>
</nav>

<style>
  /* Container */
  .secnav {
    padding: 8px 12px;            /* numbers only; Tailwind handles the rest elsewhere */
    background: transparent;
  }
  .row { display: flex; gap: 8px; flex-wrap: wrap; }
  .jc-start  { justify-content: flex-start; }
  .jc-center { justify-content: center; }
  .jc-end    { justify-content: flex-end; }

  /* Chip button */
  .chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 10px;
    border: 1px solid var(--borderColor);
    border-radius: 999px;
    /* tint surface with a touch of accent */
    background: color-mix(in oklab, var(--accentColor) 8%, var(--surfaceColor));
    color: var(--primaryText);
    cursor: pointer;
    line-height: 1;
    transition: border-color .15s ease, background .15s ease, transform .12s ease;
  }
  .chip:hover {
    border-color: color-mix(in oklab, var(--primaryColor) 35%, var(--borderColor));
    background: color-mix(in oklab, var(--accentColor) 12%, var(--surfaceColor));
    transform: translateY(-1px);
  }
  .chip:active { transform: translateY(0); }
  .chip:focus-visible { outline: 2px solid var(--primaryColor); outline-offset: 2px; }

  /* Active state */
  .chip.is-active {
    background: var(--primaryColor);
    border-color: var(--primaryColor);
    color: var(--backgroundColor);
    box-shadow: 0 8px 22px rgba(0,0,0,.12);
  }

  /* Little status dot */
  .dot {
    width: 6px; height: 6px; border-radius: 999px;
    background: currentColor; opacity: .6;
  }
  .chip.is-active .dot { background: var(--backgroundColor); opacity: 1; }

  .label { font-weight: 600; letter-spacing: .2px; }
</style>
