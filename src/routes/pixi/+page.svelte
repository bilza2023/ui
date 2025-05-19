<script>
  import { onMount, onDestroy } from "svelte";
  import * as PIXI from "pixi.js";
  import { Howl } from "howler";

  // 🔁 From player
  import DrawEngine from "./drawEngine/DrawEngine.js";
  import SlideNav from "./SlideNav.svelte";
  import { slidesData } from "../../lib/staticPresentations/titleSlide.js";
  import { browser } from "$app/environment";
  // Optional: use $app/stores if needed
  import { page } from "$app/stores";

  let app;
  const DESIGN_WIDTH = 1020;
  const DESIGN_HEIGHT = 576;

 
  let ticker;
  let sound;
  let audioReady = false;

  //////////////////////////////////////////

  // let canvasEl;
  let engine;

  let ticking = false;

  let currentTime = 0;
  let maxEndTime = null;

  function handleSeek(event) {
    // debugger;
    const time = parseFloat(event.target.value);
    if (!isNaN(time)) {
      sound.seek(time);
      engine.draw(time);
      currentTime = time;
    }
  }

  function handleVolume(event) {
    const volume = parseFloat(event.target.value);
    if (!isNaN(volume)) {
      sound.volume(volume);
    }
    // console.log("handleVolume",volume);
  }
  function start() {
    if (!audioReady) {
      console.warn("Audio not ready yet");
      return;
    }
    sound.play(); // onplay will auto-start tick
    tick();
  
  }
  function pause() {
    sound.pause();
    ticking = false;
  }
  function reset() {
    sound.stop();
    ticking = false;
    currentTime = 0;
    // setTimeout(() => {
    //   const t = sound.seek();
    //   engine.draw(t);
    // }, 50);
  }
  function tick() {
    
    const t = sound.seek();

    if (t >= maxEndTime) {
      sound.stop();
      ticking = false;
      engine.draw(maxEndTime);
      return;
    }

    currentTime = t;
    engine.draw(t);

    if (sound.playing()) {
      requestAnimationFrame(tick);
    } else {
      ticking = false;
    }
  }
  //////////////////////////////////////////
  onMount(() => {
    const canvasContainer = document.getElementById("pixi-container");

    // Pixi App (fixed design size)
    app = new PIXI.Application({
      width: DESIGN_WIDTH,
      height: DESIGN_HEIGHT,
      backgroundColor: 0x00aa00,
      antialias: true,
    });

    canvasContainer.appendChild(app.view);

    engine = new DrawEngine(slidesData, app);

    if (!browser) return;

    sound = new Howl({
      src: ["/sounds/music.opus"],
      html5: true,
      onload: () => {
        console.log("Howler: loaded");
        sound.volume(1);
        audioReady = true;
      }
    });

    // Render First Slide
    engine.draw(currentTime);

    // Responsive Resize
    function resize() {
      const w = canvasContainer.clientWidth;
      const h = canvasContainer.clientHeight;
      const scale = Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT);

      app.view.style.width = `${DESIGN_WIDTH * scale}px`;
      app.view.style.height = `${DESIGN_HEIGHT * scale}px`;
    }

    resize();
    window.addEventListener("resize", resize);

  });
///////////////////////////////////  
  onDestroy(() => {
    if (!browser) return;
    if (sound) sound.stop();
    if (app) app.destroy(true, { children: true });
    window.removeEventListener('resize', resize);
  });
</script>

<div class="bg-blue-400 min-h-screen flex flex-col">
  <!-- <div id="navbar">Fake Navbar</div> -->

  <div class="">
    {#if !audioReady}
      <div class="text-sm text-yellow-400 px-4 py-1 font-mono">
        Loading audio...
      </div>
    {:else}
      <!-- <SlideNav {start} {pause} {reset} time={currentTime} {handleVolume} {handleSeek}  /> -->
      <SlideNav
        {start}
        {pause}
        {reset}
        time={currentTime}
        duration={maxEndTime}
        {handleVolume}
        {handleSeek}
      />
    {/if}
  </div>

  <div id="pixi-container" class="flex-1"></div>
  <div class="bg-gray-900 text-white h-10 flex items-center justify-center">
    Footer
  </div>
</div>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f0f0f0;
  }

  #navbar {
    height: 60px;
    background-color: #e74c3c;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-weight: bold;
  }

  #pixi-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: green;
    overflow: hidden;
  }

  canvas {
    display: block;
  }
</style>
