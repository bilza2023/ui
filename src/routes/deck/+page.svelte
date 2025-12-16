<script>
  import { onDestroy } from "svelte";
  import Nav from "./Nav.svelte";

  /* ======================
     CONFIG (LOCKED)
     ====================== */
  const SURAH = "067";

  const STRIP_COUNT = 5;
  const SCENES_PER_STRIP = 6;

  const TILE_SIZE = 64;
  const SCENE_TILES_W = 40;

  const SCENE_WIDTH = TILE_SIZE * SCENE_TILES_W; // 2560px

  // 👀 PEEK CONTROL (SET TO 0 TO UNDO)
  const SCENE_PEEK = 200; // px total (100px each side)

  const EFFECTIVE_SCENE_WIDTH = SCENE_WIDTH - SCENE_PEEK;

  const TOTAL_SCENES = STRIP_COUNT * SCENES_PER_STRIP;

  /* ======================
     STATE
     ====================== */
  let container;
  let delay = 5000;
  let running = false;
  let timer = null;
  let currentScene = 0;

  /* ======================
     STRIP URLS
     ====================== */
  const strips = Array.from(
    { length: STRIP_COUNT },
    (_, i) => `/visual-quran/${SURAH}/${String(i + 1).padStart(2, "0")}.png`
  );

  /* ======================
     CORE SCROLL LOGIC
     ====================== */
  function scrollToScene(sceneIndex) {
    if (!container) return;

    const sceneStartX = sceneIndex * EFFECTIVE_SCENE_WIDTH;
    const sceneCenterX = sceneStartX + SCENE_WIDTH / 2;
    const viewportCenterX = container.clientWidth / 2;

    let scrollLeft = sceneCenterX - viewportCenterX;

    const maxScrollLeft =
      container.scrollWidth - container.clientWidth;

    scrollLeft = Math.max(0, Math.min(scrollLeft, maxScrollLeft));

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }

  /* ======================
     PLAYER CONTROLS
     ====================== */
  function start() {
    stop();
    currentScene = 0;
    running = true;
    scrollToScene(0);
    scheduleNext();
  }

  function stop() {
    running = false;
    if (timer) clearTimeout(timer);
    timer = null;
  }

  function scheduleNext() {
    if (!running) return;

    timer = setTimeout(() => {
      currentScene++;

      if (currentScene >= TOTAL_SCENES) {
        stop();
        return;
      }

      scrollToScene(currentScene);
      scheduleNext();
    }, delay);
  }

  onDestroy(stop);
</script>

<!-- ======================
     NAV
     ====================== -->
<Nav
  on:start={start}
  on:stop={stop}
  on:delayChange={(e) => (delay = e.detail)}
/>

<!-- ======================
     VIEWPORT
     ====================== -->
<div class="page" bind:this={container}>
  {#each strips as src}
    <img {src} alt="Quran strip" />
  {/each}
</div>

<style>
  .page {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;

    width: 100vw;
    height: 100vh;

    background: #111;
    scroll-behavior: smooth;
  }

  img {
    height: 100%;
    width: calc((2560px - 200px) * 6); /* 👀 peek enabled */
    flex: 0 0 auto;
    user-select: none;
    pointer-events: none;
  }
</style>
