<script>
  import { onMount, onDestroy } from 'svelte';
  import { deck } from './deck.js';
  import Player from "./player/Player.js";
  import SlideMap from './slides/SlideMap.js';

  let player;
  let currentTime = 0;
  let currentSlideIndex = 0;

  $: console.log( "currentTime" , currentTime );
  $: console.log( "currentSlideIndex" , currentSlideIndex );

  onMount(() => {
    player = new Player('/sounds/music.opus');
    player.onTick(time => {
      currentTime = time;
      for (let i = deck.length - 1; i >= 0; i--) {
        if ((deck[i].start || 0) <= time) {
          currentSlideIndex = i;
          break;
        }
      }
    });
  });

  onDestroy(() => {
    player.destroy();
  });

  function play() {
    player.play();
  }

  function pause() {
    player.pause();
  }

  const getCurrentSlide = () => deck[currentSlideIndex];
</script>


<div class="stage">
  {#if SlideMap[getCurrentSlide().type]}
    <svelte:component
      this={SlideMap[getCurrentSlide().type]}
      data={getCurrentSlide().data}
      currentTime={currentTime}
    />
  {:else}
    <p>Unknown slide type: {getCurrentSlide().type}</p>
  {/if}
</div>


<div class="controls">
  <button on:click={play}>Play</button>
  <button on:click={pause}>Pause</button>
</div>

<style>
  .controls {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
  }
  .controls button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  .stage {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
