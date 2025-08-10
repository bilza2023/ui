
<script>
  // Pure display: background (behind), current slide (above), and NavBar.
  import StaticBackground from './StaticBackground.svelte';
  import NavBar from './NavBar.svelte';
  import SlideMap from '$lib/taleemSlides/SlideMap.js';

  // Inputs
  export let deck = [];                 // may be an array of slides OR a deck object elsewhere
  export let background = null;         // optional explicit background from app/deck builder
  export let currentTime = 0;
  export let currentSlideIndex = 0;
  export let deckEnd = 0;
  export let soundUrl = null;

  export let onPlay  = () => {};
  export let onPause = () => {};
  export let onStop  = () => {};
  export let onSeek  = (t) => {};


  const FALLBACK_BG = {
    backgroundColor: '#000000',
    backgroundImage: null,
    backgroundImageOpacity: 1.0
  };

  $: deckBg = (
    deck && typeof deck === 'object' && !Array.isArray(deck) && deck.background
  ) ? deck.background : null;

  $: resolvedBg = background ?? deckBg ?? FALLBACK_BG;

  // ── Slide component resolver ───────────────────────────────────────────────
  function resolveSlideComponent(type) {
    const Comp = SlideMap?.[type];
    return Comp ?? null;
  }

  // If `deck` is an array of slides, this continues to work unchanged:
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
  hasAudio={!!soundUrl}
  onPlay={onPlay}
  onPause={onPause}
  onStop={onStop}
  onSeek={onSeek}
/>


  <style>
  :global(html, body, #svelte){ height:100%; }
  :global(body){ margin:0; color:#050000; }
  :global(.static-bg){ position:fixed; inset:0; z-index:0; pointer-events:none; }


.stage{ color: inherit; }   
.stage{
  position:relative; z-index:1;
  height:100dvh;
  display:grid;
  place-items:stretch;   /* child fills the slide area */
  padding:0;
  overflow:hidden;
}

.fallback{ color:#aaa; font-size:14px; }

  </style>
  