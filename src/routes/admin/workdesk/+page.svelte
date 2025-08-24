
<script>

  import { onDestroy } from 'svelte';
  import { NavBar, TaleemSlides,clampTime, findSlideIndex, getDeckEnd , } from '$lib/taleem';

  
  import TaleemDoctorComp from '../../../lib/taleem/components/TaleemDoctorComp.svelte';

  // ── state ─────────────────────────────────────────────
  let question = null;           // full object; slides live at question.deck
  let errorMsg = null;
  let mounted = false;

  let currentTime = 0;
  let currentSlideIndex = 0;
  let deckEnd = 0;

  let timer = null;
  const TICK_MS = 200;

  // derived slides
  $: slides = question?.deck ?? [];

  // keep derived timings in sync when slides/time change
  $: deckEnd = Array.isArray(slides) && slides.length ? getDeckEnd(slides) : 0;
  $: currentSlideIndex = Array.isArray(slides) && slides.length
      ? findSlideIndex(slides, currentTime)
      : 0;

  // ── helpers ───────────────────────────────────────────
  function normalizeToQuestion(obj) {
    // Accept old formats and normalize to { version?, deck: [] }
    if (Array.isArray(obj)) {
      return { version: 'deck-v1', deck: obj };
    }
    if (obj && Array.isArray(obj.deck)) {
      return obj; // already a question
    }
    if (obj && Array.isArray(obj.slides)) {
      const { slides, ...rest } = obj;
      return { ...rest, deck: slides };
    }
    return null;
  }

  // ── file load ─────────────────────────────────────────
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target.result);
        const q = normalizeToQuestion(raw);
        if (!q || !Array.isArray(q.deck) || q.deck.length === 0) {
          throw new Error('Empty or invalid deck');
        }

        question = q;
        currentTime = 0;
        mounted = true;
        stop(); // ensure clean state
        errorMsg = null;
      } catch {
        errorMsg = 'Invalid deck JSON';
        question = null;
        mounted = false;
      }
    };
    reader.readAsText(file);
  }

  // ── timer controls (no audio) ─────────────────────────
  function startTimer() {
    if (timer || !slides.length) return;
    timer = setInterval(() => {
      currentTime = clampTime(slides, currentTime + TICK_MS / 1000);
      if (currentTime >= deckEnd) {
        currentTime = deckEnd;
        pause();
      }
    }, TICK_MS);
  }
  function clearTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function play()  { startTimer(); }
  function pause() { clearTimer(); }
  function stop()  { clearTimer(); currentTime = 0; }

  function onSeek(t) { currentTime = clampTime(slides, t); }

  onDestroy(() => clearTimer());
</script>

{#if errorMsg}
  <div class="center error">{errorMsg}</div>
{/if}

{#if mounted && slides.length}
  <TaleemSlides deck={slides} {currentTime} />

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

  <!-- Doctor panel (read-only diagnostics) -->
  <div class="doctor-wrap">
    <TaleemDoctorComp {question} />
  </div>
{:else}
  <div class="flex items-center justify-center h-full">Load a deck (JSON) to start</div>
{/if}

<input type="file" accept=".json,application/json" on:change={handleFile} />

<style>
  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }
  .error { color:#b00020; }
  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}
  .doctor-wrap { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #333;padding:40px; }
</style>
