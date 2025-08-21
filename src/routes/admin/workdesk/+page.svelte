<script>
  import { onDestroy } from 'svelte';
  import { NavBar, TaleemSlides } from '$lib/taleemPlayer';
  import { clampTime, findSlideIndex, getDeckEnd } from '$lib/taleemPlayer/player-utility.js';

  // deck + playback state
  let deck = [];
  let mounted = false;
  let errorMsg = null;

  let currentTime = 0;
  let currentSlideIndex = 0;
  let deckEnd = 0;

  // local timer (no audio in workbench)
  let timer = null;
  const TICK_MS = 200;

  // --- file load ---
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const obj = JSON.parse(ev.target.result);
        deck = Array.isArray(obj) ? obj : (obj?.deck ?? obj?.slides ?? []);
        if (!Array.isArray(deck) || deck.length === 0) throw new Error('Empty deck');

        deckEnd = getDeckEnd(deck);
        currentTime = 0;
        currentSlideIndex = findSlideIndex(deck, 0);
        mounted = true;
        stop(); // ensure clean state
      } catch {
        errorMsg = 'Invalid deck JSON';
        mounted = false;
      }
    };
    reader.readAsText(file);
  }

  // --- timer controls (mirror player page API) ---
  function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
      currentTime = clampTime(deck, currentTime + TICK_MS / 1000);
      currentSlideIndex = findSlideIndex(deck, currentTime);
      if (currentTime >= deckEnd) {
        currentTime = deckEnd;
        pause();
      }
    }, TICK_MS);
  }
  function clearTimer() { if (timer) { clearInterval(timer); timer = null; } }

  function play()  { startTimer(); }
  function pause() { clearTimer(); }
  function stop()  {
    clearTimer();
    currentTime = 0;
    currentSlideIndex = findSlideIndex(deck, 0);
  }
  function onSeek(t) {
    currentTime = clampTime(deck, t);
    currentSlideIndex = findSlideIndex(deck, currentTime);
  }

  onDestroy(() => clearTimer());
</script>

{#if errorMsg}
  <div class="center error">{errorMsg}</div>
{/if}

{#if mounted && deck.length}
  <TaleemSlides {deck} {currentTime} />

  <NavBar
    {currentTime}
    {currentSlideIndex}
    deckEnd={deckEnd}
    soundUrl={null}
    onPlay={play}
    onPause={pause}
    onStop={stop}
    onSeek={onSeek}
  />
{:else}
  <div class="flex items-center justify-center h-full">Load a deck file to start</div>
{/if}

<input type="file" accept=".json" on:change={handleFile} />

<style>
  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }
  .error { color:#b00020; }
  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}
</style>
