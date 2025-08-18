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
  .secnav { padding: var(--space-3) var(--space-4); background: transparent; }
  .row { display: flex; gap: var(--space-2); flex-wrap: wrap; }
  .jc-start  { justify-content: flex-start; }
  .jc-center { justify-content: center; }
  .jc-end    { justify-content: flex-end; }

  /* Chip button */
  .chip {
    display: inline-flex; align-items: center; gap: var(--space-2);
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(196,167,127,0.08); /* sand tint */
    color: var(--text);
    cursor: pointer;
    line-height: 1;
    transition: border-color .15s ease, background .15s ease, transform .12s ease;
  }
  .chip:hover { border-color: var(--accent); transform: translateY(-1px); }
  .chip:active { transform: translateY(0); }
  .chip:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }

  /* Active state */
  .chip.is-active {
    background: var(--brand);
    border-color: var(--brand);
    color: #fff;
    box-shadow: var(--shadow-1);
  }

  /* Little status dot */
  .dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; opacity: .6; }
  .chip.is-active .dot { background: #fff; opacity: 1; }

  .label { font-weight: 600; letter-spacing: .2px; }
</style>
