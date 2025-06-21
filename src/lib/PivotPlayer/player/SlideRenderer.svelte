<!-- pivot-player/src/SlideRenderer.svelte -->
<script>
    export let slide;
    export let currentTime;
    import { slideMap } from '../PivotSlides/src/slideMap';
    const Component = slideMap[slide.type] || null;
  </script>
  
  {#if Component}
    <svelte:component this={Component} data={slide.data} currentTime={currentTime} />
  {/if}
  