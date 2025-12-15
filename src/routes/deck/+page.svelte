<script>
  import { onDestroy } from "svelte";
  import Nav from "./Nav.svelte";

  // -------- CONFIG --------
  const SURAH = "067";
  const STRIP_COUNT = 5;
  const SCENES_PER_STRIP = 6;
  const SCENE_WIDTH = 2560; // px (40 tiles × 64)

  const TOTAL_SCENES = STRIP_COUNT * SCENES_PER_STRIP;

  // delay (ms)
  let delay = 5000;

  // runtime
  let container;
  let running = false;
  let timer = null;
  let currentScene = 0;

  // build strip URLs
  const strips = Array.from({ length: STRIP_COUNT }, (_, i) =>
    `/visual-quran/${SURAH}/${String(i + 1).padStart(2, "0")}.png`
  );

  // ------------------------
  function start() {
    stop();                // reset any running loop
    currentScene = 0;
    scrollToScene(0);
    running = true;
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

  function scrollToScene(sceneIndex) {
    const left = sceneIndex * SCENE_WIDTH;

    container.scrollTo({
      left,
      behavior: "smooth"
    });
  }

  onDestroy(() => stop());
</script>

<!-- NAV -->
<Nav
  on:start={start}
  on:stop={stop}
  on:delayChange={(e) => (delay = e.detail)}
/>

<!-- PAGE VIEW -->
<div class="page" bind:this={container}>
  {#each strips as src}
    <img src={src} alt="Quran strip" />
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
    width: auto;
    flex-shrink: 0;
  }
</style>
