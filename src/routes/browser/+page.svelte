<svelte:head>
  <meta name="robots" content="index,follow" />
</svelte:head>

<script lang="ts">
  import { onMount }     from 'svelte';
  import { page }        from '$app/stores';
  import { writable }    from 'svelte/store';

  import SlideMap        from '../../lib/Player/SlideMap';
  import Navbar          from './Navbar.svelte';

  /* ---------- reactive stores ---------- */
  const deck         = writable(null);          // full deck object
  const currentIndex = writable(0);             // slide pointer
  const loadError    = writable('');            // fetch / validation error

  /* ---------- navigation helpers ---------- */
  const goFirst = () => currentIndex.set(0);
  const goPrev  = () => currentIndex.update(i => Math.max(i - 1, 0));
  const goNext  = () => currentIndex.update(i => Math.min(i + 1, ($deck.deck.length - 1)));
  const goLast  = () => currentIndex.set($deck.deck.length - 1);

  /* ---------- fetch deck once on mount ---------- */
  onMount(async () => {
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');

    if (!filename) {
      loadError.set('No ?filename query provided.');
      return;
    }

    // try /decks_test/ first, then fallback to /decks/
    const candidates = [
      `/decks_test/${filename}.json`,
      `/decks/${filename}.json`
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const json = await res.json();

        if (json.version !== 'deck-v1' || !Array.isArray(json.deck)) {
          throw new Error('Invalid deck-v1 JSON');
        }
        deck.set(json);   // 🎉 success
        return;
      } catch (_) { /* try next */ }
    }

    loadError.set(`Deck "${filename}" not found in /decks_test or /decks.`);
  });

  /* ---------- derived values ---------- */
  $: totalSlides = $deck?.deck?.length ?? 0;
</script>

<!-- ---------- Slide Display Area ---------- -->
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
{/if}

<!-- ---------- Bottom Navigation Bar ---------- -->
<Navbar
  current={$currentIndex}
  total={totalSlides}
  {goFirst}
  {goPrev}
  {goNext}
  {goLast}
/>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
