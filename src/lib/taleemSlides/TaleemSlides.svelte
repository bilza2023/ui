<script>
  import SlideMap from './SlideMap.js';

  export let deck = [];
  export let currentTime = 0;

  let currentSlideIndex = 0;

  // You can pass this in; here’s a default:
  export let background = {
    backgroundColor: '#f2f2b5',
    backgroundImage: '/images/taleem.webp',  // e.g. '/images/bg.webp'
    backgroundImageOpacity: 0.1               // 0..1 (1 = fully visible)
  };

  
  function resolveSlideComponent(type) {
    return SlideMap?.[type] ?? null;
  }

  $: slide = deck?.[currentSlideIndex] ?? null;
  $: SlideComp = slide ? resolveSlideComponent(slide.type) : null;

  // --- helpers ---
  function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    let h = hex.trim();
    if (h.startsWith('#')) h = h.slice(1);
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length !== 6) return { r: 0, g: 0, b: 0 };
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const clamp01 = (x) => Math.min(1, Math.max(0, x));

  // Build background style with image opacity simulated via an overlay gradient
  $: bgColor = background?.backgroundColor || 'transparent';
  $: imgUrl = background?.backgroundImage || '';
  $: imgOpacity = clamp01(background?.backgroundImageOpacity ?? 1);
  $: overlayAlpha = clamp01(1 - imgOpacity); // how much of bg color to lay on top
  $: rgb = hexToRgb(bgColor); // <-- FIX: intermediate object (no leading "{")

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
      slide={slide}
      {currentTime}
    />
  {:else}
    <div class="fallback">No slide to render.</div>
  {/if}
</div>

<style>
  :global(html, body) { height: 100%; margin: 0; }

  .stage {
    position: relative;     /* background belongs to the same container as slides */
    height: 100dvh;
    display: grid;
    place-items: stretch;
    overflow: hidden;
    color: inherit;
  }

  .fallback { color: #aaa; font-size: 14px; }
</style>
