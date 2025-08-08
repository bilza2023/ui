<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  import { getDeck } from '$lib/services/deckService.js';
  import { createSoundPlayer, decideSoundUrl } from '$lib/services/soundServices.js';

  import TaleemPlayer from '$lib/taleemPlayer/Player.svelte';
  import { clampTime, findSlideIndex, getDeckEnd } from '$lib/taleemPlayer/player-utility.js';

  // ---- state (single source of truth) ----
  let deck = null;
  let background = null;

  let soundUrl = null;
  let player = null;

  let currentTime = 0;
  let currentSlideIndex = 0;
  let deckEnd = 0;

  let loading = true;
  let errorMsg = null;

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
      const fullDeck = await getDeck(filename); // { version, deck, background?, meta? }
      deck = fullDeck.deck;
      background = fullDeck.background ?? null;

      // 2) Time boundaries
      deckEnd = getDeckEnd(deck);
      currentSlideIndex = findSlideIndex(deck, 0); // ensure first slide renders immediately

      // 3) Decide audio URL (no HEAD probes)
      soundUrl = decideSoundUrl({
        searchParams: params,
        deckMeta: fullDeck.meta ?? fullDeck,
        filename
      });

      // 4) Create timing source
      player = createSoundPlayer(soundUrl);

      // 5) Ticks → update app state
      player.onTick((t) => {
        currentTime = clampTime(deck, t);
        currentSlideIndex = findSlideIndex(deck, currentTime);

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
  // immediately reflect in UI (works when paused)
  currentTime = clampTime(deck, t);
  currentSlideIndex = findSlideIndex(deck, currentTime);
}

function stop() {
  if (!player) return;
  player.pause();
  player.seek(0);
  // reflect immediately
  currentTime = 0;
  currentSlideIndex = findSlideIndex(deck, 0);
}

  onMount(init);
  onDestroy(() => { player?.destroy?.(); });
</script>

{#if loading}
  <div class="center">Loading…</div>
{:else if errorMsg}
  <div class="center error">{errorMsg}</div>
{:else}
  <TaleemPlayer
    {deck}
    {background}
    {currentTime}
    {currentSlideIndex}
    {deckEnd}
    {soundUrl}
    onPlay={play}
    onPause={pause}
    onStop={stop}
    onSeek={seek}
  />
{/if}

<style>
  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }
  .error { color:#b00020; }
</style>
