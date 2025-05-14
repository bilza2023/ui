<script>
  import { onMount, onDestroy } from 'svelte';
  import * as PIXI from 'pixi.js';
  import { browser } from '$app/environment'; 

  // import Nav from '$lib/appComps/Nav.svelte';
  import SlideNav from '../../lib/appComps/SlideNav.svelte';
  import TickerPlayer   from './TickerPlayer.js';          // your local path
  import { slidesData } from './testSlides.js';
  import { fitCanvasToViewport } from './layoutConfig.js';

  const NAV_H  = 56;   // adjust to actual Nav height
  const FOOT_H = 60;   // bottom reserved band

  let canvasEl;
  let app;
  let player;

  function resizeCanvas() {
    const availH = window.innerHeight - NAV_H - FOOT_H;
    const { width, height } = fitCanvasToViewport(
      window.innerWidth,
      availH
    );
    app.renderer.resize(width, height);
  }

  onMount(() => {
    app = new PIXI.Application({
      width: 100,
      height: 100,
      background: 0x000000,
      view: canvasEl
    });

    player = new TickerPlayer({ app, slidesData });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // player.start();
  });

  onDestroy(() => {
    if (browser && player) player.pause();      // ⬅️ 2. guard
    if (browser && app)    app.destroy(true, { children: true });
    if (browser)           window.removeEventListener('resize', resizeCanvas);
  });
</script>

<SlideNav {player} /> 
<canvas bind:this={canvasEl} style="display:block;margin:0 auto;"></canvas>

<!-- reserved bottom band; style as real footer later -->
<div style="height:{FOOT_H}px"></div>
