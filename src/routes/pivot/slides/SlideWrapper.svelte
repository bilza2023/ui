<script>
  import BackgroundLayer from "./BackgroundLayer.svelte";
  export let background;
</script>

<div class="slide-wrapper">
  <BackgroundLayer {background} />
  <div class="slide-content">
    <slot />
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
  }
</style>
