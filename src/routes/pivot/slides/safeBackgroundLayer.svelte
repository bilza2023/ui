<script>
  export let background = {
    backgroundColor: "#ffffff",
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: null,
  };
</script>

<div
  class="background-layer"
  style={{
    backgroundColor: background.backgroundColor,
    backgroundImage: background.backgroundImage
      ? `url(${background.backgroundImage})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: background.backgroundImageOpacity,
  }}
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
