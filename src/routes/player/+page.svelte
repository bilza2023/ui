

<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import * as PIXI from 'pixi.js';
  import { validateAll,validateSlidesData } from './validator.js';

  import SlideNav from '../../lib/appComps/SlideNav.svelte';
  import Ticker from './Ticker.js';
  import DrawEngine from './DrawEngine.js';
  import { getActiveSlide } from './SlideUtils.js';

  import { slidesData} from '../../lib/staticPresentations/titleSlide.js';

  import { fitCanvasToViewport } from './layoutConfig.js';

  const NAV_H  = 56;
  const FOOT_H = 60;

  let canvasEl;
  let app;
  let ticker;
  let engine;
  let player;
  let current = 0;

  const currentSlide = writable('—');
  // const currentTime  = writable('0:00');
  let currentTime  = 0;


  function fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = (sec % 60).toFixed(1).padStart(4, '0');
    return `${String(m).padStart(2, '0')}:${s}`;
  }

  function resizeCanvas() {
    const availH = window.innerHeight - NAV_H - FOOT_H;
    const { width, height } = fitCanvasToViewport(window.innerWidth, availH);
    app.renderer.resize(width, height);
  }


  function handleTick(elapsed) {
  currentTime = elapsed; // ✅ update from Ticker
  engine.draw(currentTime);

  const active = getActiveSlide(slidesData.slides, currentTime);
  currentSlide.set(active?.id ?? '—');

  // Optional: display current time as mm:ss
  // currentTimeText.set(fmtTime(currentTime));
}

  onMount(() => {
    if (!browser) return;
// debugger;
    app = new PIXI.Application({
      width: 100,
      height: 100,
      background: 0x000000,
      view: canvasEl
    });

    //////////////--Data Validation using zod
console.log("slidesData" , slidesData);

// const slideValidation = validateSlidesData(slidesData);
// if (!slideValidation.valid) {
//   console.error("Slide-level validation failed:", slideValidation.errors);
//   return;
// }


const allItems = slidesData.slides.flatMap(s => s.items);
const { valid, report } = validateAll(allItems);

if (!valid) {
  console.error("Validation failed for some items:", report);
}else{
  console.warn("valid data",valid);
}
    //////////////////////////////////////////
    engine = new DrawEngine(slidesData, app);
    ticker = new Ticker({ onTick: handleTick });
    
    player = {
      start: () => ticker.start(),
      pause: () => ticker.pause(),
      reset: () => ticker.reset()
    };

   

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // player.start(); // manually controlled
    engine.draw(0);
  });

  onDestroy(() => {
    if (!browser) return;
    if (ticker) ticker.pause();
    if (app) app.destroy(true, { children: true });
    window.removeEventListener('resize', resizeCanvas);
  });
</script>


<!-- ───────────── Layout ───────────── -->
<div class="mb-2">
  <SlideNav {player} slide={$currentSlide} time={currentTime} />
</div>


<canvas bind:this={canvasEl} style="display:block;margin:0 auto;"></canvas>

<!-- reserved bottom band / footer placeholder -->
<div style="height:{FOOT_H}px"></div>

<style>
  /* Dark charcoal background for this route */
  :global(body) {
    background: #1e1e1e;
  }
</style>
