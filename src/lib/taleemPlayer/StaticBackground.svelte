<script>
  export let backgroundColor = '#000';
  export let backgroundImage = null;         // URL or null
  export let backgroundImageOpacity = 1.0;   // 0..1
</script>

<div class="static-bg">
  <div class="bg-color" />
  {#if backgroundImage}
    <div class="bg-image" style={`opacity:${backgroundImageOpacity}; background-image:url(${backgroundImage});`} />
  {/if}
</div>

<style>
  .static-bg {
    position: fixed;   /* live behind everything */
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .bg-color {
    position: absolute;
    inset: 0;
    background: var(--bg, #000);
  }

  .bg-image {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  :global(.static-bg) { /* allow external z-index overrides if needed */ }

  /* CSS var for color so prop updates are cheap */
  :global(:root) {}
</style>

<!-- keep color reactive via inline style to avoid specificity fights -->
<svelte:head>
  <style>
    .static-bg .bg-color { --bg: {backgroundColor}; }
  </style>
</svelte:head>
