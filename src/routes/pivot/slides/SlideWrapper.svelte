<script>
  import BackgroundLayer from "./BackgroundLayer.svelte";
  export let background;
</script>

<div class="slide-wrapper">
  <BackgroundLayer {background} />
  <div class="slide-content">
    <div class="slide-canvas">
      <slot />
    </div>
  </div>
</div>

<style>
  .slide-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .slide-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide-canvas {
    width: 100%;
    max-width: 1024px;
    aspect-ratio: 16 / 9;
    height: auto;
  }
</style>
