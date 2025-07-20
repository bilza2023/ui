<!-- SlideScaler.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';
  let handleResize;

  onMount(() => {
    handleResize = () => {
      // scale down if viewport < 1000px, otherwise stay at 1
      const scale = Math.min(1, window.innerWidth / 1000);
      document.documentElement.style.setProperty('--scale', scale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
  });
</script>

<div class="slide-outer">
  <div
    class="slide-scaler"
    style="transform: scale(var(--scale)); transform-origin: top center;"
  >
    <slot />
  </div>
</div>

<style>
  /* Full-viewport flex container to center its child both vertically and horizontally */
  .slide-outer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  /* Keeps the slide at a max 1000px width and handles the scale transform */
  .slide-scaler {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
