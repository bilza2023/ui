<script>
  import { onMount, onDestroy } from 'svelte';
  import '$lib/styles/tables.css';

  import {validate} from "../../lib/taleem/core/validate";
  // UI bits
  import Like from '../../lib/components/Like.svelte';
  import Comment from '../../lib/components/Comment.svelte';

  // Taleem module
  import {
    TaleemSlides,
    NavBar,
    
    clampTime,
    findSlideIndex,
    getDeckEnd
  } from '$lib/taleem';

  // audio utils
  import { createSoundPlayer, detectSoundUrl } from '$lib/services/soundServices.js';

  // data from +page.server.js
  export let data;
  const { meta, deckRaw } = data;

  // ---- build + validate deck (no client fetch) ----
  let errorMsg = null;
  let loading = false;                 // no deck fetch → not loading
  let filename = meta?.filename ?? '';

  let deckObj = null;                  // canonical { version, background?, deck: [] }
  let deck = [];

  $: console.log("deck Player" , deck);
  let background = null;

  try {
    // Wrap legacy array shape if needed, then normalise + validate
    const built = Array.isArray(deckRaw) ? { version: 'deck-v1', deck: deckRaw } : deckRaw;

    const res = validate(built);

    if (!res.ok) {
      errorMsg = (res.errors?.[0]?.message) || 'Invalid deck';
    } else {
      deckObj    = res.value;
      // console.log("deckObj",deckObj);
      deck       = deckObj.deck || [];
      background = deckObj.background ?? null;
    }
  } catch (e) {
    errorMsg = e?.message || 'Failed to prepare deck';
  }

  // ---- playback state ----
  let soundUrl = null;
  let player = null;

  let currentTime = 0;
  let currentSlideIndex = findSlideIndex(deck, 0);
  let deckEnd = getDeckEnd(deck);

  // ---- controls ----
  function play()  { player?.play?.(); }
  function pause() { player?.pause?.(); }
  function seek(t) {
    if (!player) return;
    player.seek(t);
    currentTime = clampTime(deck, t);
    currentSlideIndex = findSlideIndex(deck, currentTime);
  }
  function stop() {
    if (!player) return;
    player.pause();
    player.seek(0);
    currentTime = 0;
    currentSlideIndex = findSlideIndex(deck, 0);
  }

  // ---- audio init (client-only) ----
  onMount(async () => {
    try {
      // console.log("Player Deck===>" ,deck);
      soundUrl = await detectSoundUrl(filename, fetch);  // may return null (silent mode)
      player = createSoundPlayer(soundUrl);
      player.onTick((t) => {
        currentTime = clampTime(deck, t);
        currentSlideIndex = findSlideIndex(deck, currentTime);
        if (currentTime >= deckEnd) {
          currentTime = deckEnd;
          player.pause();
        }
      });
    } catch {
      // no audio is fine; slides still render
    }
  });

  onDestroy(() => { player?.destroy?.(); });
</script>


{#if loading}
  <div class="center">Loading…</div>
{:else if errorMsg}
  <div class="center error">{errorMsg}</div>
{:else}

    <TaleemSlides
    {deck}
    {currentTime}
  />
  <NavBar 
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