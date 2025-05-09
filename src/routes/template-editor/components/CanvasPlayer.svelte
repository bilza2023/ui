<script>
  import { onMount } from 'svelte';
  export let slide = null;
  export let assets = null;
  export let Player = null;

  let canvas;
  let ctx;

  function getDrawCtx() {
    return {
      ctx: () => ctx,
      getCanvasWidth: () => canvas.width,
      getCanvasHeight: () => canvas.height
    };
  }

  function render() {
    if (slide && ctx && assets && Player) {
      Player(slide, getDrawCtx(), assets);
    }
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    render();
  });

  $: if (slide) render();
</script>

<canvas bind:this={canvas} width="1280" height="720" />

<style>
  canvas {
    background: white;
    border: 2px solid #555;
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    image-rendering: pixelated;
  }
</style>
