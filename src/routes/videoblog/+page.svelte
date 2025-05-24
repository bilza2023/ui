<script>
  import { onMount } from 'svelte';
  import {Player} from "./24may/player";
  import { pixiApp } from './pixiApp.js';
  import { presentationData } from "./24may/goldStandarTwoSlides"; // ✅ updated import
  import { createTicker } from './ticker/createTicker.js';

  let container;

  onMount(() => {
    const app = pixiApp(
      presentationData.slidesData[0].background?.backgroundColor || "#000000",
      presentationData.designWidth,
      presentationData.designHeight
    );

    // let sound = "/sounds/music.opus";
    let sound = null;

    container.appendChild(app.view);
// debugger;
    // const player = createPlayer({app,slides: presentationData.slidesData});
    // player.play(); // optional: render first frame


    const ticker = createTicker({ sound });
    const player = new Player({
  app,
  slides: presentationData.slidesData,
  timeSource: ticker
});

player.play();


  });
</script>

<style>
  .stage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #111;
  }
</style>

<div class="stage" bind:this={container}></div>
