<script>
  import { onMount } from 'svelte';
  import * as PIXI from 'pixi.js';
  import DrawEngine from './engine/DrawEngine.js';
  import Player from "./player/Player.js";
  import { pixiApp} from './pixiApp.js';
  
  
  import {presentationData} from "./firstSlide.js";
  const DESIGN_RESOLUTION = {width : 1020 , height : 576}

  ////////////////////////////////////////////
  // let mockSlide;
  ////////////////////////////////////////////
  let container;

onMount(() => {
  const DESIGN_WIDTH = 1020;
  const DESIGN_HEIGHT = 576;

  const app = pixiApp(
    presentationData.slidesData[0].backgroundColor,
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  );

  container.appendChild(app.view);

  const player = new Player({
    app,
    slides: presentationData.slidesData,
  });

  player.goToTime(0); // optional: to render first frame
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
