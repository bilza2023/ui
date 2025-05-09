<script>
    import { onMount, afterUpdate } from 'svelte';
    import { draw as Player } from '../slimPlayer/Player.js';
    import Assets from '../../assets/Assets.js';
  
    export let slide;
  
    let canvas;
    let assets;
    let ctx;
    let drawCtx;
  
    function resizeCanvas() {
      const container = canvas.parentElement;
      const maxWidth = container.clientWidth;
      const width = maxWidth;
      const height = width * 9 / 16;
  
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
  
      drawCtx = {
        ctx: () => ctx,
        getCanvasWidth: () => canvas.width,
        getCanvasHeight: () => canvas.height
      };
  
      if (slide) {
        Player(slide, drawCtx, assets);
      }
    }
  
    onMount(() => {
      ctx = canvas.getContext("2d");
      assets = new Assets();
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    });
  
    afterUpdate(() => {
      if (slide && drawCtx && assets) {
        Player(slide, drawCtx, assets);
      }
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>
  
  <style>
    canvas {
      background: white;
      border: 2px solid #666;
      image-rendering: pixelated;
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  </style>
  