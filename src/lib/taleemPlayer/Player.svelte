<script>
    // Pure display: background (behind), current slide (above), and NavBar.
    import StaticBackground from './StaticBackground.svelte';
    import { GlobalBackgrounds } from './globalBackgrounds.js';
    import { getDefaultBackground } from './getDefaultBackground.js';
  
    import NavBar from './NavBar.svelte';
    import SlideMap from '$lib/taleemSlides/SlideMap.js';
  
    export let deck = [];
    export let background = null;
    export let currentTime = 0;
    export let currentSlideIndex = 0;
    export let deckEnd = 0;
    export let soundUrl = null;
  
    export let onPlay  = () => {};
    export let onPause = () => {};
    export let onStop  = () => {};
    export let onSeek  = (t) => {};
  
    // Resolve background
    const theme = { backgroundColor: '#0d1117' }; // fallback
    const baseBg = background ?? getDefaultBackground(theme);
    const resolvedBg = baseBg?.pattern ? baseBg : GlobalBackgrounds.defaultBg(baseBg.backgroundColor || theme.backgroundColor);
  
    function resolveSlideComponent(type) {
      const Comp = SlideMap?.[type];
      return Comp ?? null;
    }
  
    $: slide = deck?.[currentSlideIndex] ?? null;
    $: SlideComp = slide ? resolveSlideComponent(slide.type) : null;
  </script>
  
  <!-- Background (behind everything) -->
  <StaticBackground
    class="static-bg"
    backgroundColor={resolvedBg.backgroundColor}
    backgroundImage={resolvedBg.backgroundImage}
    backgroundImageOpacity={resolvedBg.backgroundImageOpacity}
  />
  
  <!-- Slides layer -->
  <div class="stage">
    {#if SlideComp && slide}
      <svelte:component
        this={SlideComp}
        data={slide.data}
        items={slide.data}  
        slide={slide}        
        {currentTime}
      />
    {:else}
      <div class="fallback">No slide to render.</div>
    {/if}
  </div>
  
  <!-- Nav -->
  <NavBar
    {currentTime}
    duration={deckEnd}
    {soundUrl}
    onPlay={onPlay}
    onPause={onPause}
    onStop={onStop}
    onSeek={onSeek}
  />
  
  <style>
    :global(html, body, #svelte) { height: 100%; }
    :global(body) { margin: 0; }
  
    /* Background sits behind */
    :global(.static-bg) {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
  
    /* Slides sit above */
    .stage {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 16px;
    }
  
    .fallback {
      color: #aaa;
      font-size: 14px;
    }
  </style>
  