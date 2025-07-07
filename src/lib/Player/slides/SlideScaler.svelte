<!-- SlideScaler.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
  
    let handleResize;
  
    onMount(() => {
      handleResize = () => {
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
  
  <div class="slide-scaler" style="transform: scale(var(--scale)); transform-origin: top center;">
    <slot />
  </div>
  
  <style>
  .slide-scaler {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  </style>
  