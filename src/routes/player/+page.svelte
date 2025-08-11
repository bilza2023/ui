<svelte:head>
  <!-- Precompiled Web Component -->
  <script type="module" src="/components/taleem-slides/taleem-slides.js"></script>
</svelte:head>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  import { getDeck } from '$lib/services/deckService.js';
  import { createSoundPlayer, detectSoundUrl } from '$lib/services/soundServices.js';

  // Keep utilities you still use
  import { clampTime, getDeckEnd } from '$lib/taleemPlayer/player-utility.js';

  // Optional: reuse the same NavBar as Workdesk (seek only)
  import NavBar from '$lib/taleemSlides/NavBar.svelte';

  // ---- state (single source of truth) ----
  let deck = null;           // slides[]
  let background = null;     // retained for future, CE doesn't need it
  let soundUrl = null;
  let player = null;

  let currentTime = 0;
  let deckEnd = 0;

  let loading = true;
  let errorMsg = null;

  // reference to the CE
  let slidesEl;

  async function init() {
    loading = true;
    errorMsg = null;

    const params = new URLSearchParams($page.url.search);
    const filename = params.get('filename');
    if (!filename) {
      errorMsg = 'Filename parameter is required.';
      loading = false;
      return;
    }

    try {
      // 1) Load deck
      const fullDeck = await getDeck(filename); // { version, deck, background? }
      deck = fullDeck.deck;
      background = fullDeck.background ?? null;

      // 2) Time boundaries
      deckEnd = getDeckEnd(deck);

      // 3) Auto-detect audio once (client-side), no logging on 404
      soundUrl = await detectSoundUrl(filename, fetch); // '/sounds/<filename>.opus' or null

      // 4) Create timing source (Howler if url, Timer otherwise)
      player = createSoundPlayer(soundUrl);

      // 5) Ticks → update app state
      player.onTick((t) => {
        currentTime = clampTime(deck, t);
        if (currentTime >= deckEnd) {
          currentTime = deckEnd;
          player.pause();
        }
      });
    } catch (err) {
      errorMsg = err?.message || 'Failed to load deck.';
    } finally {
      loading = false;
    }
  }

  // Controls
  function play()  { player?.play?.(); }
  function pause() { player?.pause?.(); }
  function seek(t) {
    if (!player) return;
    player.seek(t);
    currentTime = clampTime(deck, t); // reflect immediately
  }
  function stop() {
    if (!player) return;
    player.pause();
    player.seek(0);
    currentTime = 0;
  }

  // push props into the CE whenever they change
  $: if (slidesEl && deck) slidesEl.deck = deck;
  $: if (slidesEl)          slidesEl.currentTime = currentTime;

  onMount(init);
  onDestroy(() => { player?.destroy?.(); });
</script>

{#if loading}
  <div class="center">Loading…</div>
{:else if errorMsg}
  <div class="center error">{errorMsg}</div>
{:else}
  <!-- VISUALS: use the precompiled Web Component -->
  <taleem-slides bind:this={slidesEl}></taleem-slides>

  <!-- Controls: reuse the simple NavBar (seek only) -->
  <NavBar {currentTime} duration={deckEnd} onSeek={seek} />

  <!-- If you want play/pause/stop buttons here, wire them to play/pause/stop() -->
{/if}

<style>
  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }
  .error { color:#b00020; }
  taleem-slides { display:block; width:100%; height:100vh; }
</style>
