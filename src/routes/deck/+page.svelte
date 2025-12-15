<script>
  import { onMount, onDestroy } from "svelte";
  import Nav from "./Nav.svelte";

  // -------- CONFIG --------
  const SURAH = "067";
  const STRIP_COUNT = 5;

  // delay (ms) – controlled by Nav
  let delay = 5000;

  // runtime
  let container;
  let running = false;
  let timer = null;
  let currentIndex = 0;

  // build strip URLs
  const strips = Array.from({ length: STRIP_COUNT }, (_, i) =>
    `/visual-quran/${SURAH}/${String(i + 1).padStart(2, "0")}.png`
  );

  function start() {
    if (running) return;
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
      currentIndex++;

      if (currentIndex >= STRIP_COUNT) {
        stop();
        return;
      }

      scrollToIndex(currentIndex);
      scheduleNext();
    }, delay);
  }

  function scrollToIndex(index) {
    const el = container.children[index];
    if (!el) return;

    container.scrollTo({
      left: el.offsetLeft,
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
    scroll-behavior: smooth;
    background: #111;
  }

  img {
    height: 100%;
    width: auto;
    flex-shrink: 0;
  }
</style>
