<script>
  import { onMount, onDestroy } from "svelte";
  import * as PIXI from "pixi.js";
  import DrawEngine from "./drawEngine/DrawEngine.js";
  import SlideNav from "./SlideNav.svelte";
  import { slidesData } from "../../lib/videoblog/titleSlide.js";
  import { browser } from "$app/environment";

  let app;
  const DESIGN_WIDTH = 1020;
  const DESIGN_HEIGHT = 576;
  let src = "/sounds/music.opus";
  // debugger;
  const maxEndTime = slidesData.slides[slidesData.slides.length -1 ].endTime;


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

  const imageList = [
  "brand/facebook_page_profile.webp",
  "images/mad_scientist.jpg",
  "images/drops.png"
];

onMount(() => {
  if (!browser) return;
  const canvasContainer = document.getElementById("pixi-container");

  app = new PIXI.Application({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
    backgroundColor: 0x00aa00,
    antialias: true
  });

  canvasContainer.appendChild(app.view);

  // ✅ Pixi v6 Loader
  const loader = new PIXI.Loader();
  imageList.forEach(src => loader.add(src));

  loader.load(() => {
    engine = new DrawEngine(slidesData, app);
    engine.draw(0); // ✅ safe to draw now
  });

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
    {#if src && maxEndTime}
    <SlideNav update={update} {src} {maxEndTime}/>
    {/if}
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
