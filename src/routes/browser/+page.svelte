<svelte:head>
  <meta name="robots" content="index,follow" />
</svelte:head>

<script lang="ts">
  import { onMount }  from 'svelte';
  import { page }     from '$app/stores';
  import { writable } from 'svelte/store';

  import SlideMap     from '../../lib/Player/SlideMap';
  import NavBar       from '../../lib/Player/NavBar.svelte';

  /* ───────── reactive state ───────── */
  const deck          = writable(null);      // full deck JSON
  const currentIndex  = writable(0);         // slide pointer
  const loadError     = writable('');        // any load-time error

  /* ───────── navigation helpers ───── */
  const next = () => currentIndex.update(i => Math.min(i + 1, $deck.deck.length - 1));
  const prev = () => currentIndex.update(i => Math.max(i - 1, 0));

  /* ───────── fetch deck once mounted ─ */
  onMount(async () => {
    const params   = new URLSearchParams($page.url.search);
    debugger;
    const filename = params.get('filename');
    if (!filename) {
      loadError.set('No ?filename query provided.');
      return;
    }

    /* try custom folder first, then legacy /decks/ */
    const candidates = [
      `/decks_test/${filename}.json`,
      `/decks/${filename}.json`
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;                       // try next candidate
        const json = await res.json();

        /* minimal sanity check */
        if (json.version !== 'deck-v1' || !Array.isArray(json.deck)) {
          throw new Error('File exists but is not valid deck-v1 JSON');
        }
        deck.set(json);                              // success 🎉
        return;
      } catch (_) { /* continue */ }
    }

    loadError.set(`Deck "${filename}" not found in /decks_test or /decks.`);
  });
</script>

<!-- ────────────────────────── UI ─────────────────────────── -->
<NavBar mode="browser" />

{#if $loadError}
  <div class="center"><p>{$loadError}</p></div>
{:else if !$deck}
  <div class="center"><p>Loading …</p></div>
{:else}
  {#if $deck.deck[$currentIndex]}
       <svelte:component
         this={SlideMap[$deck.deck[$currentIndex].type]}
         {...$deck.deck[$currentIndex]}   
         background={$deck.background}
       />
  {/if}

  <div class="controls">
    <button on:click={prev}  disabled={$currentIndex === 0}>Prev</button>
    <button on:click={next}  disabled={$currentIndex === $deck.deck.length - 1}>Next</button>
    <span class="counter">{$currentIndex + 1}/{$deck.deck.length}</span>
  </div>
{/if}

<style>
  .center   { display:flex; justify-content:center; align-items:center; height:100%; }
  .controls { display:flex; gap:0.75rem; justify-content:center; margin-top:1rem; }
  button    { padding:0.5rem 1rem; border-radius:6px; font-weight:600; }
  .counter  { align-self:center; font-size:0.9rem; }
</style>
