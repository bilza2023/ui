
<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import * as PIXI from 'pixi.js';

  /* local / project imports — keep paths unchanged */
  import SlideNav        from '../../lib/appComps/SlideNav.svelte';
  // import PlayerToolbar from '$lib/appComps/PlayerToolbar.svelte';
  import TickerPlayer    from './TickerPlayer.js';
  import { slidesData }  from './testSlides.js';
  import { fitCanvasToViewport } from './layoutConfig.js';

  /* layout constants */
  const NAV_H  = 56;   // nav height
  const FOOT_H = 60;   // reserved bottom space

  /* DOM refs & instances */
  let canvasEl;
  let app;
  let player;

  /* reactive stores passed to SlideNav */
  const currentSlide = writable('—');   // slide name / id
  const currentTime  = writable('0:00'); // running time

  /* helper: seconds → "mm:ss.t" */
  function fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = (sec % 60).toFixed(1).padStart(4, '0'); // "02.3"
    return `${String(m).padStart(2, '0')}:${s}`;
  }

  /* resize canvas to fit 16 : 9 inside viewport minus nav & footer */
  function resizeCanvas() {
    const availH = window.innerHeight - NAV_H - FOOT_H;
    const { width, height } = fitCanvasToViewport(window.innerWidth, availH);
    app.renderer.resize(width, height);
  }

  /* mount Pixi + player */
  onMount(() => {
    if (!browser) return; // SSR guard

    app = new PIXI.Application({
      width: 100,
      height: 100,
      background: 0x000000,
      view: canvasEl
    });

    player = new TickerPlayer({ app, slidesData });

    /* piggy‑back on ticker to update stores */
    const origTick = player.tick.bind(player);
    player.tick = () => {
      origTick();
      currentSlide.set(player.currentSlideId ?? '—');
      currentTime.set(fmtTime(player.currentTime));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    player.start();
  });

  /* cleanup */
  onDestroy(() => {
    if (!browser) return;
    if (player) player.pause();
    if (app)    app.destroy(true, { children: true });
    window.removeEventListener('resize', resizeCanvas);
  });
</script>

<!-- ───────────── Layout ───────────── -->
<SlideNav {player} slide={$currentSlide} time={$currentTime} />

<canvas bind:this={canvasEl} style="display:block;margin:0 auto;"></canvas>

<!-- reserved bottom band / footer placeholder -->
<div style="height:{FOOT_H}px"></div>

<style>
  /* Dark charcoal background for this route */
  :global(body) {
    background: #1e1e1e;
  }
</style>
