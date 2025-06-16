<script>
  export let background = {
    backgroundColor: "#ffffff",
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: null
  };
</script>

<div
  class="background-layer"
  style="
    background-color: {background.backgroundColor};
    background-image: {background.backgroundImage ? `url('images/${background.backgroundImage}')` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 1;
  "
></div>

<style>
  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
</style>
