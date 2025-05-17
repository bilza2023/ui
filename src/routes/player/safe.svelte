<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { writable } from "svelte/store";
  import * as PIXI from "pixi.js";
  import { Howl } from "howler";

  import SlideNav from "../../lib/appComps/SlideNav.svelte";
  import DrawEngine from "./DrawEngine.js";
  import { getActiveSlide } from "./SlideUtils.js";
  import { slidesData } from "../../lib/staticPresentations/titleSlide.js";
  import { fitCanvasToViewport } from "./layoutConfig.js";
  import { validateAll } from "./validator.js";

  const maxEndTime = slidesData.slides.at(-1).endTime;

  const NAV_H = 56;
  const FOOT_H = 60;

  let canvasEl;
  let app;
  let engine;
  let sound;
  let player;
  let ticking = false;
  let audioReady = false;

  const currentSlide = writable("—");
  let currentTime = 0;

  function updateSlideMeta(t) {
    currentTime = t;
    const active = getActiveSlide(slidesData.slides, t);
    currentSlide.set(active?.id ?? "—");
  }

  function tick() {
    const t = sound.seek();

    if (t >= maxEndTime) {
      sound.stop(); // ✅ stop playback
      ticking = false;
      engine.draw(maxEndTime); // optional: final frame
      updateSlideMeta(maxEndTime);
      return; // ⛔ stop the loop
    }

    engine.draw(t);
    updateSlideMeta(t);

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
      src: ["/sounds/music.opus"], // replace with your actual path
      html5: true,
      onload: () => {
        audioReady = true;
      },
      onplay: () => console.log("Narration: playing"),
      onend: () => console.log("Narration: playback finished"),
    });

    app = new PIXI.Application({
      width: 100,
      height: 100,
      background: 0x000000,
      view: canvasEl,
    });

    const allItems = slidesData.slides.flatMap((s) => s.items);
    const { valid, report } = validateAll(allItems);

    if (!valid) {
      console.error("Validation failed for some items:", report);
    } else {
      console.warn("valid data", valid);
    }

    engine = new DrawEngine(slidesData, app);

    player = {
      start: () => {
        sound.play();
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(tick);
        }
      },
      pause: () => {
        sound.pause();
        ticking = false;
      },
      reset: () => {
        sound.stop(); // ✅ this fully stops + resets to 0
        ticking = false;

        requestAnimationFrame(() => {
          const t = sound.seek(); // force sync after stop
          engine.draw(t);
          updateSlideMeta(t);
        });
      },
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    engine.draw(0); // initial draw
  });

  onDestroy(() => {
    if (!browser) return;
    if (sound) sound.pause();
    if (app) app.destroy(true, { children: true });
    window.removeEventListener("resize", resizeCanvas);
  });
</script>

<!-- ───────────── Layout ───────────── -->
<div class="mb-2">
  <SlideNav {player} slide={$currentSlide} time={currentTime} />
  {#if !audioReady}
    <div class="text-sm text-yellow-400 px-4 py-1 font-mono">
      Loading audio...
    </div>
  {/if}
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
