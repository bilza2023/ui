<script lang="ts">
    import { onMount } from 'svelte';
    import { draw as Player } from './slimPlayer/Player';
    import Assets from './slimPlayer/assets/Assets';
    import Nav from './Nav.svelte';
  
    let canvasEl: HTMLCanvasElement;
    let currentIndex = 0;
  
    const slides = [
  {
    uuid: "s1",
    name: "Intro Slide",
    background: {
      backgroundImage: "black_mat",
      backgroundColor: "#fdf6e3"
    },
    items: [
      { type: "text", text: "Welcome to Taleem.help", x: 80, y: 100, fontSize: 44, color: "#ffffff" },
      { type: "text", text: "Quality Education for Every Pakistani", x: 80, y: 160, fontSize: 24, color: "#dddddd" },
      { type: "rectangle", x: 70, y: 90, width: 860, height: 120, fillColor: "rgba(255, 255, 255, 0.1)", borderColor: "#ffffff", borderWidth: 1 }
    ]
  },
  {
    uuid: "s2",
    name: "Concept Slide",
    background: {
      backgroundImage: "graph_paper",
      backgroundColor: "#e0f7fa"
    },
    items: [
      { type: "text", text: "Learning is a Journey", x: 100, y: 80, fontSize: 40, color: "#004d40" },
      { type: "circle", x: 200, y: 240, radius: 60, color: "#00796b", filled: true },
      { type: "text", text: "Step 1", x: 175, y: 250, fontSize: 18, color: "#fff" },
      { type: "circle", x: 400, y: 240, radius: 60, color: "#00796b", filled: true },
      { type: "text", text: "Step 2", x: 375, y: 250, fontSize: 18, color: "#fff" },
      { type: "circle", x: 600, y: 240, radius: 60, color: "#004d40", filled: true },
      { type: "text", text: "Step 3", x: 575, y: 250, fontSize: 18, color: "#fff" },
      { type: "line", x: 260, y: 240, width: 140, height: 0, color: "#222", lineWidth: 2 },
      { type: "line", x: 460, y: 240, width: 140, height: 0, color: "#222", lineWidth: 2 }
    ]
  },
  {
    uuid: "s3",
    name: "Quote Slide",
    background: {
      backgroundImage: "blue_grid",
      backgroundColor: "#1e1e1e"
    },
    items: [
      { type: "text", text: `"Education is the most powerful weapon"`, x: 80, y: 180, fontSize: 32, color: "#ffffff" },
      { type: "text", text: "— Nelson Mandela", x: 500, y: 260, fontSize: 20, color: "#cccccc" },
      { type: "rectangle", x: 60, y: 160, width: 880, height: 120, fillColor: "rgba(0,0,0,0.4)", borderColor: "#888", borderWidth: 1 }
    ]
  }
];

  
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
  