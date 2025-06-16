<script>
  export let background = {
    backgroundColor: "#ffffff",
    backgroundImage: "/pivot/defaultBg.png", // must be valid
    backgroundImageOpacity: 1
  };

  // Construct style string with guaranteed safe syntax
  $: inlineStyle = [
    `background-color: ${background.backgroundColor}`,
    `background-size: cover`,
    `background-position: center`,
    `opacity: ${background.backgroundImageOpacity}`,
    background.backgroundImage ? `background-image: url('${background.backgroundImage}')` : ""
  ].join("; ");
</script>

{@html `<div class="background-layer" style="${inlineStyle}"></div>`}

<style>
  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
</style>
