<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import * as PIXI from 'pixi.js';
  import { Howl } from 'howler';

  import SlideNav from './SlideNav.svelte';
  import DrawEngine from './drawEngine/DrawEngine';
  import { slidesData } from '../../lib/staticPresentations/titleSlide.js';
  import { fitCanvasToViewport } from './layoutConfig.js';
  import { validateAll } from './validator.js';

  const NAV_H = 56;
  const FOOT_H = 60;

  let canvasEl;
  let app;
  let engine;
  let sound;

  let ticking = false;
  let audioReady = false;

  let currentTime = 0;
  let maxEndTime = null;

  function handleSeek(event) {
    // debugger;
    const time = parseFloat(event.target.value);
  if (!isNaN(time)) {
    sound.seek(time);
    engine.draw(time);
    currentTime = time;
  }
}

function handleVolume(event) {
  const volume = parseFloat(event.target.value);
  if (!isNaN(volume)) {
    sound.volume(volume);
  }
  // console.log("handleVolume",volume);
}
function start(){
  if (!audioReady) {
          console.warn("Audio not ready yet");
          return;
        }
        sound.play(); // onplay will auto-start tick
}
function pause(){
  sound.pause();
  ticking = false;
}
function reset(){
  sound.stop();
        ticking = false;
        currentTime = 0;
        setTimeout(() => {
          const t = sound.seek();
          engine.draw(t);
        }, 50);
}
  function tick() {
    const t = sound.seek();

    if (t >= maxEndTime) {
      sound.stop();
      ticking = false;
      engine.draw(maxEndTime);
      return;
    }

    currentTime = t;
    engine.draw(t);

    if (sound.playing()) {
      requestAnimationFrame(tick);
    } else {
      ticking = false;
    }
  }

  function resizeCanvas() {
    const availH = window.innerHeight - NAV_H - FOOT_H;
    const { width, height } = fitCanvasToViewport(window.innerWidth, availH);
    app.renderer.resize(width, height);
  }

 onMount(() => {
  if (!browser) return;

    sound = new Howl({
      src: ['/sounds/music.opus'],
      html5: true,
      onload: () => {
        console.log('Howler: loaded');
        audioReady = true;
      },
      onplay: () => {
        console.log('Howler: playing');
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(tick);
        }
      },
      onend: () => {
        console.log('Howler: playback finished');
        ticking = false;
      }
    });

    app = new PIXI.Application({
      width: 100,
      height: 100,
      background: 0x000000,
      view: canvasEl
    });
    // debugger;
    maxEndTime = slidesData.slides.at(-1).endTime;


    const allItems = slidesData.slides.flatMap(s => s.items);
    const { valid, report } = validateAll(allItems);

    if (!valid) {
      console.error("Validation failed for some items:", report);
    } else {
      console.warn("valid data", valid);
    }

    engine = new DrawEngine(slidesData, app);

   
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    engine.draw(0); // initial draw
  });

  onDestroy(() => {
    if (!browser) return;
    if (sound) sound.stop();
    if (app) app.destroy(true, { children: true });
    window.removeEventListener('resize', resizeCanvas);
  });
</script>

<!-- ───────────── Layout ───────────── -->
<!-- <main class="h-[calc(100vh-60px)]"> -->

<div class="mb-8">
  {#if !audioReady}
  <div class="text-sm text-yellow-400 px-4 py-1 font-mono">Loading audio...</div>
  {:else}
  <!-- <SlideNav {start} {pause} {reset} time={currentTime} {handleVolume} {handleSeek}  /> -->
  <SlideNav
  {start}
  {pause}
  {reset}
  time={currentTime}
  duration={maxEndTime}
  {handleVolume}
  {handleSeek}
/>

  {/if}
</div>

<!-- <canvas bind:this={canvasEl} style="display:block;margin:0 auto;"></canvas> -->

<canvas
  bind:this={canvasEl}
  style="display:block;margin:0 auto;max-width:100%;height:auto;"
></canvas>

<!-- </main> -->
<div style="height:{FOOT_H}px"></div>

<style>
  :global(body) {
    background: #2e2e30;
  }

  canvas {
  max-width: 100%;
  height: auto;
  display: block;
}

</style>
