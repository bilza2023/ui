<script>
  export let background = {
    backgroundColor: "#000000",
    backgroundImage: null,
    backgroundImageOpacity: 1
  };

  const baseUrl = "/tcodes/";
  $: bgImageUrl = background.backgroundImage
    ? `${baseUrl}${background.backgroundImage}`
    : null;
</script>

<div class="bg-base" style="background-color: {background.backgroundColor};"></div>

{#if bgImageUrl}
  <div
    class="bg-image"
    style="background-image: url('{bgImageUrl}'); opacity: {background.backgroundImageOpacity};"
  />
{/if}

<style>
  .bg-base,
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  .bg-base {
    z-index: 0;
  }

  .bg-image {
    z-index: 1;
    pointer-events: none;
  }
</style>
