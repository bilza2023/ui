<script lang="ts">
    import { onMount } from 'svelte';
    import { draw as Player } from './slimPlayer/Player';
    import Assets from './slimPlayer/assets/Assets';
    import Nav from './Nav.svelte';
    // import slideModules from '$lib/slides/index.js';
    // import { page } from '$app/stores';
  
    let canvasEl: HTMLCanvasElement;
    let currentIndex = 0;

    const slides = [
  {
    uuid: "test-1",
    name: "Slide 1",
    background: { backgroundImage: "black_mat", backgroundColor: "#000000" },
    items: [
      { type: "text", text: "This is Slide 1", x: 100, y: 100, fontSize: 48, color: "yellow" },
      { type: "sprite", x: 600, y: 80, width: 120, height: 120, spriteName: "students", selectedItem: "girl_waving" }
    ]
  },
  {
    uuid: "test-2",
    name: "Slide 2",
    background: { backgroundImage: "black_mat", backgroundColor: "#000000" },
    items: [
      { type: "text", text: "This is Slide 2", x: 100, y: 100, fontSize: 48, color: "yellow" },
      { type: "sprite", x: 100, y: 200, width: 150, height: 150, spriteName: "students", selectedItem: "girl_waving" },
      { type: "text", text: "Sprite rendered from 'students'", x: 300, y: 240, fontSize: 28, color: "cyan" }
    ]
  }
];


  
    // const slides = slideModules.intro();
    const assets = new Assets();
  
    function renderSlide(index: number) {

        const ratio = window.devicePixelRatio || 1;
        canvasEl.width = canvasEl.clientWidth * ratio;
        canvasEl.height = canvasEl.clientHeight * ratio;

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
      renderSlide(currentIndex);
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
      height: calc(100vh - 60px); /* header height */
      background-color: #4c4545; /* match body background */
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
      border: 2px solid #555;
      image-rendering: pixelated;
    }
  </style>
  