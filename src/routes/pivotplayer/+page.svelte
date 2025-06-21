<script>
  import { onMount, onDestroy } from "svelte";
  import { deck } from "./deck-json";
  console.log("deck", deck);
  import Player from "./player/Player.js";
  import SlideMap from "./slides/SlideMap.js";
  import NavBar from "./NavBar.svelte";
  let player;
  let currentTime = 0;
  let currentSlideIndex = 0;

  $: console.log("currentTime", currentTime);
  $: console.log("currentSlideIndex", currentSlideIndex);

  function handleTick(time) {
    currentTime = time;
    for (let i = 0; i < deck.length; i++) {
      const { start, end } = deck[i];
      if (time >= start && time < end) {
        currentSlideIndex = i;
        break;
      }
    }
  }

  onMount(() => {
    player = new Player("/sounds/music.opus");
    player.onTick(handleTick);
  });

  onDestroy(() => {
    player.destroy();
  });

  function stop() {
    player.pause();
  player.sound.seek(0);
  currentTime = 0; // ← force scrollbar update
  }
  function back() {
    history.back();
  }

  function play() {
    player.play();
  }
  function pause() {
    player.pause();
  }

  const getCurrentSlide = () => deck[currentSlideIndex];
</script>

<NavBar
  {currentTime}
  duration={deck.at(-1).end}
  onPlay={play}
  onPause={pause}
  onStop={stop}
  onBack={back}
  onSeek={(t) => {
    player?.sound?.seek(t);
    handleTick(t); // ← force immediate slide update
  }}
/>

<div class="stage">
  {#if SlideMap[getCurrentSlide().type]}
    <svelte:component
      this={SlideMap[getCurrentSlide().type]}
      data={getCurrentSlide().data}
      {currentTime}
    />
  {:else}
    <p>Unknown slide type: {getCurrentSlide().type}</p>
  {/if}
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
