
<svelte:head>
  <script type="module" src="/components/taleem-slides/taleem-slides.js"></script>
</svelte:head>

<script>
  
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { getDeck } from '$lib/services/deckService.js';
  import { createSoundPlayer, detectSoundUrl } from '$lib/services/soundServices.js';
  import { clampTime, getDeckEnd } from '$lib/taleemPlayer/player-utility.js';
  import Comment from "$lib/Comment.svelte";
  import NavBar from '$lib/taleemSlides/NavBar.svelte';
  import Like from "$lib/Like.svelte";

  const anchorId = "playerPage";
  let userId = null;
  // ---- state (single source of truth) ----
  let deck = null;           // slides[]
  let background = null;     // kept for future; CE doesn't need it
  let soundUrl = null;
  let player = null;
  let currentTime = 0;
  let deckEnd = 0;
  let loading = true;
  let errorMsg = null;
  let slidesEl;
  let filename=null;
let authToken = null;

  async function init() {
    loading = true;
    errorMsg = null;

    authToken = localStorage.getItem('token');
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
      currentTime = 0;

      // Immediately feed CE if it's already mounted (defensive)
      if (slidesEl && deck) slidesEl.deck = deck;

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

  // Reactive prop push into CE
  $: if (slidesEl && deck) slidesEl.deck = deck;
  $: if (slidesEl)          slidesEl.currentTime = currentTime;

  onMount(() => {
    const token = localStorage.getItem("token");
    if(token){userId = token;}
    
    init();
  });
  onDestroy(() => { player?.destroy?.(); });
</script>

{#if loading}
  <div class="center">Loading…</div>
{:else if errorMsg}
  <div class="center error">{errorMsg}</div>
{:else}
  {#if deck && deck.length}
    <!-- VISUALS: use the precompiled Web Component -->
    <taleem-slides bind:this={slidesEl}></taleem-slides>

    <!-- Controls: simple seek bar (play/pause/stop can be added as buttons if you like) -->
    <NavBar {currentTime} duration={deckEnd} onSeek={seek} />
  {:else}
    <div class="center">Preparing deck…</div>
  {/if}
{/if}



<div style="background-color:#594112">
{#if authToken}

  <Like contentId={filename} authToken={authToken} />

{/if}


<!-- Player +page.svelte -->
<div class="mt-5  px-40">
  <Comment
    contentId={filename}  
    userId={userId}      
  />
</div>

</div>

<style>
  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }
  .error { color:#b00020; }
  /* Prevent initial white text flash by avoiding CE default paint before props */
  taleem-slides { display:block; width:100%; height:100vh; color:#222; }
</style>
