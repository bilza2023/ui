<script>
  import { onMount, onDestroy } from 'svelte';
  import StaticBackground from '../../lib/taleemPlayer/StaticBackground.svelte';

  // Public inputs (keep names as you already use them)
  export let deck = null;        // full deck object (v1 schema)
  export let soundUrl = null;    // optional audio url; player must work without it
  export let autoPlay = false;   // optional: start playing automatically

  // If you inject a runtime/player instance from outside, keep this prop.
  // Otherwise, you can remove it and manage time locally.
  export let runtime = null;     // optional external runtime/controller

  // Background state (finalized system: color, image, opacity)
  let backgroundColor = '#111';
  let backgroundImage = "/images/taleem.webp";
  let backgroundImageOpacity = 1;

  // Derive background from deck (no per-slide overrides)
  $: if (deck?.background) {
    backgroundColor        = deck.background.color   ?? backgroundColor;
    backgroundImage        = deck.background.image   ?? backgroundImage;
    backgroundImageOpacity = deck.background.opacity ?? backgroundImageOpacity;
  }

  // Minimal internal clock (works with or without audio).
  // If you already have a runtime handling this, you can ignore/remove this section.
  let rafId;
  let startedAt = 0;
  let pausedAt = 0;
  let isPlaying = false;
  let currentTime = 0; // seconds (global)

  function tick(ts) {
    // basic time driver for silent mode; if runtime exists, prefer runtime time
    if (runtime?.getTime) {
      currentTime = runtime.getTime();
    } else if (isPlaying) {
      const now = performance.now() / 1000;
      currentTime = now - startedAt;
    } else {
      currentTime = pausedAt || 0;
    }
    rafId = requestAnimationFrame(tick);
  }

  function play() {
    if (runtime?.play) {
      runtime.play();
    } else {
      const now = performance.now() / 1000;
      startedAt = now - (pausedAt || 0);
      isPlaying = true;
    }
  }

  function pause() {
    if (runtime?.pause) {
      runtime.pause();
    } else {
      isPlaying = false;
      pausedAt = currentTime;
    }
  }

  function seek(t) {
    if (runtime?.seek) {
      runtime.seek(t);
    } else {
      const now = performance.now() / 1000;
      startedAt = now - t;
      pausedAt = t;
      currentTime = t;
    }
  }

  // Auto-play if requested
  onMount(() => {
    rafId = requestAnimationFrame(tick);
    if (autoPlay) play();
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });

  // Expose controls outward if needed (kept for API parity)
  export { play, pause, seek };
</script>

<!-- Root container -->
<div class="player-root">
  <!-- Background (z0) -->
  <StaticBackground
    {backgroundColor}
    {backgroundImage}
    {backgroundImageOpacity}
  />

  <!-- Foreground (z1): your existing player UI + slide renderer lives here -->
  <div class="stage">
    <!-- Transport (optional simple controls; keep/remove as per your current UI) -->
    <div class="transport">
      <button on:click={play}>Play</button>
      <button on:click={pause}>Pause</button>
      <!-- Example scrubber; wire to your existing UI if you already have one -->
      <input
        type="range"
        min="0"
        max="{deck?.duration ?? 0}"
        step="0.01"
        value="{currentTime}"
        on:input={(e) => seek(+e.currentTarget.value)}
      />
      <span>{currentTime.toFixed(2)}s</span>
    </div>

    <!-- Slide host: render whatever slide system you already have -->
    <!-- If your project uses a separate SlideRenderer, keep that here -->
    <!-- Example placeholder; replace with your real renderer component -->
    {#if deck}
      <!-- Replace this block with your actual slide renderer -->
      <div class="slides-host">
        <!-- Your slide rendering goes here, driven by `currentTime` -->
        <slot name="slides" {deck} {currentTime} />
      </div>
    {:else}
      <div class="empty">No deck loaded.</div>
    {/if}
  </div>
</div>

<style>
  .stage-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .stage {
    position: absolute;
    top: 0;
    color:black;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
