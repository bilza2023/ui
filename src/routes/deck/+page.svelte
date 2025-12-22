<script>
  import Nav from "./Nav.svelte";

  // CHANGE ONLY THIS
  const surahId = "067";
  const STRIP_COUNT = 5;

  const stripUrls = Array.from(
    { length: STRIP_COUNT },
    (_, i) => `/visual-quran/${surahId}/${String(i + 1).padStart(2, "0")}.png`
  );

  let activeStripIndex = 0;
  let container;

  function onSelect(e) {
    activeStripIndex = e.detail;
    container.scrollTop = 0;
  }
</script>

<Nav
  stripCount={stripUrls.length}
  active={activeStripIndex}
  on:select={onSelect}
/>

<div class="viewer" bind:this={container}>
  <img
    src={stripUrls[activeStripIndex]}
    alt="Quran strip"
  />
</div>

<style>
.viewer {
  height: calc(100vh - 52px);
  overflow: auto;
  background: #000;
}
img {
  display: block;
  height: 100vh;
  width: auto;
}


</style>
