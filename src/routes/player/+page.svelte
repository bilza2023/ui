<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import '$lib/styles/tables.css';

  import Like from '../../lib/Like.svelte';
  import Comment from '../../lib/Comment.svelte';
  import { getDeck } from '$lib/services/deckService.js';
  import { createSoundPlayer, detectSoundUrl } from '$lib/services/soundServices.js';

  import TaleemPlayer from '$lib/taleemPlayer/Player.svelte';
  import { clampTime, findSlideIndex, getDeckEnd } from '$lib/taleemPlayer/player-utility.js';

  // ---- state (single source of truth) ----
  let deck = null;
  let background = null;

  let soundUrl = null;
  let player = null;

  let currentTime = 0;
  let currentSlideIndex = 0;
  let filename = "";
  let deckEnd = 0;

  let loading = true;
  let errorMsg = null;

  async function init() {
    loading = true;
    errorMsg = null;

    const params = new URLSearchParams($page.url.search);
    filename = params.get('filename');
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
      currentSlideIndex = findSlideIndex(deck, 0); // ensure first slide renders immediately

      // 3) Auto-detect audio once (client-side), no logging on 404
      soundUrl = await detectSoundUrl(filename, fetch); // returns '/sounds/<filename>.opus' or null

      // 4) Create timing source (Howler if url, Timer otherwise)
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


<div class="bg-[#594112]">
<Like 
contentId ={filename}
/>

<hr/>

<Comment 
contentId ={filename}
/>
</div>

<style>
  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }
  .error { color:#b00020; }
</style>