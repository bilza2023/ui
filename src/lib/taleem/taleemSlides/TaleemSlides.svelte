
<svelte:options customElement="taleem-slides" />


<script>

import SlideMap from './SlideMap.js';
  import { pickSlideByTime } from './pickSlideByTime.js';

  // Props
  export let deck = [];              // array of slides (Zod-checked: has startAt, type)
  export let currentTime = 0;        // global time (seconds)
  
  export let background = {
    backgroundColor: '#f2f2b5',
    backgroundImage: '/media/images/taleem.webp',
    backgroundImageOpacity: 0.1
  };

  // Map slide.type -> Svelte component
  function resolveSlideComponent(type) {
    return SlideMap?.[type] ?? null;
  }

  // --- Reactive selection via pure function ---------------------------
  let currentSlideIndex = 0;
  let slide = null;
  let slideType = null;
  let SlideComp = null;

  $: ({ index: currentSlideIndex, slide, type: slideType } = pickSlideByTime(deck, currentTime));
  $: SlideComp = resolveSlideComponent(slideType);
  // $: console.log('TaleemSlides (pickSlideByTime) →', { t: currentTime, currentSlideIndex, slideType });

  // --- Background helpers ---------------------------------------------
  function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    let h = hex.trim();
    if (h.startsWith('#')) h = h.slice(1);
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length !== 6) return { r: 0, g: 0, b: 0 };
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: (n) & 255 };
  }
  const clamp01 = (x) => Math.min(1, Math.max(0, x));

  $: bgColor = background?.backgroundColor || 'transparent';
  $: imgUrl = background?.backgroundImage || '';
  $: imgOpacity = clamp01(background?.backgroundImageOpacity ?? 1);
  $: overlayAlpha = clamp01(1 - imgOpacity);
  $: rgb = hexToRgb(bgColor);

  $: bgImageValue = imgUrl
    ? `linear-gradient(rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayAlpha}), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayAlpha})), url('${imgUrl}')`
    : 'none';

  $: bgStyle = `
    background-color: ${bgColor};
    background-image: ${bgImageValue};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;
</script>

<div class="stage" style={bgStyle}>
  {#if SlideComp && slide}
    <svelte:component
      this={SlideComp}
      data={slide.data}
      items={slide.data}
      {slide}
      {currentTime}
    />
  {:else}
    <div class="fallback">No slide to render.</div>
  {/if}
</div>

<style>
  :global(html, body) { height: 100%; margin: 0; }

  .stage {
    position: relative;
    height: 100dvh;
    display: grid;
    place-items: stretch;
    overflow: hidden;
    /* color: inherit; */
    color: black;
  }

  .fallback { color: #aaa; font-size: 14px; }
</style>
