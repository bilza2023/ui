<script>
    export let title = 'Deck';
    export let subtitle = '';
    export let current = 0;
    export let total = 0;
  
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    function onShowAll() { dispatch('showall'); }
    function onOpenSource() { dispatch('opensource'); }
  </script>
  
  <header class="deck-navbar">
    <div class="deck-meta">
      <div class="deck-title">{title}</div>
      {#if subtitle}
        <div class="deck-sub">{subtitle}</div>
      {/if}
    </div>
  
    <div class="deck-controls">
      <div class="deck-count">{current} / {total}</div>
      <button type="button" on:click={onShowAll} aria-label="Show all cards">Show all</button>
      <button type="button" on:click={onOpenSource} aria-label="Open source">Source</button>
    </div>
  </header>
  
  <style>
  /* Intentionally minimal — rely on global app styles */
  .deck-navbar { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:8px 12px; }
  .deck-meta { display:flex; flex-direction:column; }
  .deck-title { font-weight:700; }
  .deck-sub { font-size:0.9rem; opacity:0.8; }
  .deck-controls { display:flex; gap:8px; align-items:center; }
  .deck-count { font-size:0.95rem; min-width:4.5ch; text-align:right; }
  button { cursor:pointer; padding:6px 8px; border-radius:6px; }
  </style>
  