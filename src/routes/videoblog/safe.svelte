<script>
  import { onMount } from "svelte";
  import { Player, createTicker } from "./24may/player";
  import { pixiApp } from "./pixiApp.js";
  import { presentationData } from "./24may/goldStandarTwoSlides"; // ✅ updated import
  // import { createTicker } from './ticker/createTicker.js';
  import SlideNav from "./SlideNav.svelte";

  let container;
  let player;
  let ticker;
  let currentTime = 0;

  onMount(() => {
    const app = pixiApp(
      presentationData.slidesData[0].background?.backgroundColor || "#000000",
      presentationData.designWidth,
      presentationData.designHeight
    );

    // let soundUrl = null;
    let soundUrl = "sounds/music.opus";
    ticker = createTicker(soundUrl);

    player = new Player({
      app,
      slides: presentationData.slidesData,
      timeSource: ticker,
    });

    container.appendChild(app.view);

    player.setTime(0);
    // player.play();

    // Sync currentTime with Player
    function syncTimeLoop() {
      const loop = () => {
        if (player) currentTime = player.getCurrentTime();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    syncTimeLoop();
  });
</script>

{#if player && ticker}
  <SlideNav
    {currentTime}
    maxEndTime={presentationData.totalDuration}
    on:play={() => player.play()}
    on:pause={() => player.timeSource.pause()}
    on:reset={() => player.reset()}
    on:seek={(e) => player.setTime(e.detail)}
  />
{/if}

<div class="stage" bind:this={container}></div>

<style>
  .stage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #111;
  }
</style>
