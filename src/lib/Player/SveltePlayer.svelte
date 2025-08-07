<!-- PivotPlayerUI.svelte -->
<script>
  import { onMount, onDestroy } from "svelte";
  import Player from "./Player";
  import SlideMap from "./SlideMap.js";
  import NavBar from "./NavBar.svelte";
  import StaticBackground from "./background/StaticBackground.svelte";

  export let deck = [];
  export let soundUrl = "" | null;
  export let background = {
  backgroundColor: "#ffffff",
  backgroundImage: "",
  backgroundImageOpacity: 1,
 };


  let player;
  let currentTime = 0;
  let currentSlideIndex = 0;

  let ready = false;
  function handleTick(time) {
    const deckEnd = deck.at(-1)?.end ?? 10;

    if (time >= deckEnd) {
      player.pause();
      currentTime = deckEnd;
      return;
    }

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
    player = new Player(soundUrl);
    player.onTick(handleTick);
    ready = true;
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

  function stop() {
    player.pause();
    player.sound.seek(0);
    currentTime = 0;
  }

  function seek(t) {
    player.sound.seek(t);
    handleTick(t);
  }

  function back() {
    history.back();
  }

  const getCurrentSlide = () => deck[currentSlideIndex];
</script>


{#if ready}

<div class="stage-wrapper">

  <StaticBackground
  backgroundColor={background.backgroundColor}
  backgroundImage={background.backgroundImage}
  backgroundImageOpacity={background.backgroundImageOpacity}
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

  <NavBar
    {currentTime}
    {soundUrl}
    duration={deck.at(-1).end}
    onPlay={play}
    onPause={pause}
    onStop={stop}
    onSeek={seek}
    onBack={back}
  />

</div>
{/if}
<style>
  .stage-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .stage {
    position: absolute;
    top: 0;
    color:black;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
