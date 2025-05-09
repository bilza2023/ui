<script lang="ts">
  import { onMount } from 'svelte';
  import { draw as Player } from '$lib/slimPlayer/Player.js';
  import Assets from '$lib/slimPlayer/assets/Assets.js';
  import Nav from './Nav.svelte';
  import slideModules from '$lib/slides/index.js';
  import { page } from '$app/stores';


  let canvasEl: HTMLCanvasElement;
  let currentIndex = 0;

  let slides = [];

  const assets = new Assets();

  function renderSlide(index: number) {
    if (!canvasEl) return;

    const ratio = window.devicePixelRatio || 1;
    const width = canvasEl.clientWidth;
    const height = canvasEl.clientHeight;

    if (width === 0 || height === 0) {
      console.warn("Canvas has zero size, skipping render.");
      return;
    }

    canvasEl.width = width * ratio;
    canvasEl.height = height * ratio;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const drawCtx = {
      ctx: () => ctx,
      getCanvasWidth: () => canvasEl.width,
      getCanvasHeight: () => canvasEl.height
    };

    const slide = slides[index];
    if (slide) Player(slide, drawCtx, assets);
  }

  function next() {
    if (currentIndex < slides.length - 1) currentIndex++;
    renderSlide(currentIndex);
  }

  function prev() {
    if (currentIndex > 0) currentIndex--;
    renderSlide(currentIndex);
  }

  onMount(() => {
  const name = $page.url.searchParams.get('presentation') || 'intro';
  const module = slideModules[name];
  slides = module ? module() : [];

  requestAnimationFrame(() => {
    if (canvasEl) renderSlide(currentIndex);
  });
});

</script>

<Nav onNext={next} onPrev={prev} />

<main>
  <canvas bind:this={canvasEl} width="1000" height="562"></canvas>
</main>

<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }

  main {
    height: calc(100vh - 60px);
    background-color: #2a2a2a;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  canvas {
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    max-width: 100%;
    max-height: 100%;
    background: white;
    border: none;
    image-rendering: pixelated;
  }
</style>
