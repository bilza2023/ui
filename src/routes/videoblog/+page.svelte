<script>
  import { onMount, onDestroy } from "svelte";
  import * as PIXI from "pixi.js";
  import DrawEngine from "./drawEngine/DrawEngine.js";
  import SlideNav from "./SlideNav.svelte";
  import { slidesData } from "../../lib/staticPresentations/titleSlide.js";
  import { browser } from "$app/environment";

  let app;
  const DESIGN_WIDTH = 1020;
  const DESIGN_HEIGHT = 576;

  let engine;
  let currentTime = 0;
  let resizeHandler;

  function update(t) {
    currentTime = t;
    engine.draw(t);
  }

  function resizeCanvas(app, container, designW = 1020, designH = 576) {
    const w = container.clientWidth;
    const h = container.clientHeight;
    const scale = Math.min(w / designW, h / designH);

    app.view.style.width = `${designW * scale}px`;
    app.view.style.height = `${designH * scale}px`;
  }

  onMount(() => {
    const canvasContainer = document.getElementById("pixi-container");

    app = new PIXI.Application({
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
      backgroundColor: 0x00aa00,
      antialias: true
    });

    canvasContainer.appendChild(app.view);
    engine = new DrawEngine(slidesData, app);

    if (!browser) return;
    engine.draw(0);

    resizeHandler = () => resizeCanvas(app, canvasContainer, DESIGN_WIDTH, DESIGN_HEIGHT);
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  });

  onDestroy(() => {
    if (!browser) return;
    if (app) app.destroy(true, { children: true });
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);
  });
</script>


<div class="bg-gray-400 min-h-screen flex flex-col">
  <div class="">
    <SlideNav update={update} />
  </div>
  <div id="pixi-container" class="flex-1"></div>
  <div class="bg-gray-900 text-white h-10 flex items-center justify-center">
    <a href="https://taleem.help">taleem.help</a>
  </div>
</div>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f0f0f0;
  }

  #pixi-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: rgb(45, 45, 48);
    overflow: hidden;
  }

  
</style>
