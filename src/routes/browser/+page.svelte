<svelte:head>
  <meta name="robots" content="index,follow" />
</svelte:head>

<script lang="ts">
  import { onMount }  from 'svelte';
  import { page }     from '$app/stores';
  import { writable } from 'svelte/store';

  import StaticBackground from '../../lib/Player/background/StaticBackground.svelte';
  import SlideMap         from '../../lib/Player/SlideMap';
  import Navbar           from './Navbar.svelte';

  /* ───────── stores ───────── */
  const deck         = writable(null);   // full deck object
  const currentIndex = writable(0);      // slide pointer
  const loadError    = writable('');     // fetch / validation error

  /* ───────── navigation ───── */
  const goFirst = () => currentIndex.set(0);
  const goPrev  = () => currentIndex.update(i => Math.max(i - 1, 0));
  const goNext  = () => currentIndex.update(i => Math.min(i + 1, $deck.deck.length - 1));
  const goLast  = () => currentIndex.set($deck.deck.length - 1);
/* ───────── fetch deck ───── */
/* ───────── fetch deck ───── */
onMount(async () => {
  const params   = new URLSearchParams($page.url.search);
  const filename = params.get('filename');

  if (!filename) {
    loadError.set('No ?filename query provided.');
    return;
  }

  const candidates = [
    `/decks_browser/${filename}.json`,
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

      deck.set(json);
      return;
    } catch (err) {
      continue;
    }
  }

  loadError.set(`Deck "${filename}" not found in /decks_browser or /decks.`);
});



  /* ───────── derived ─────── */
  $: totalSlides = $deck?.deck?.length ?? 0;
  // $: background  = $deck?.background ?? {};
</script>

<!-- ───────── main render ───────── -->
{#if $loadError}
  <div class="center"><p>{$loadError}</p></div>

{:else if !$deck}
  <div class="center"><p>Loading …</p></div>

{:else}
  <!-- deck loaded successfully -->
  <StaticBackground
  backgroundImage="/images/taleem.webp"
   />

  <div class="slide-frame">
    <!-- <svelte:component
      this={SlideMap[$deck.deck[$currentIndex].type]}
      {...$deck.deck[$currentIndex]}
    /> -->
 <svelte:component
   this={SlideMap[$deck.deck[$currentIndex].type]}
   {...$deck.deck[$currentIndex]}
   currentTime={$deck.deck[$currentIndex].end}   
 />
  </div>
{/if}

<!-- ───────── bottom nav bar ───────── -->
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
    height: 100vh;
  }

  .slide-frame {
    position: relative;
    width: 100%;
    height: calc(100vh - 56px); /* 56 px = navbar */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>
