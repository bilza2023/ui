<script>
  import { onMount } from 'svelte';
  import * as PIXI from 'pixi.js';
  import DrawEngine from './engine/DrawEngine.js';
  import { attachDisplayObjects} from './attachDisplayObjects.js';
  import { pixiApp} from './pixiApp.js';

  
  import {presentationData} from "./firstSlide.js";
  const DESIGN_RESOLUTION = {width : 1020 , height : 576}
  let container;

  ////////////////////////////////////////////
  // let mockSlide;
  ////////////////////////////////////////////
  onMount(() => {

    const app = pixiApp(presentationData.slidesData[0].backgroundColor,DESIGN_RESOLUTION.width,DESIGN_RESOLUTION.height);
    // debugger;
    container.appendChild(app.view);
    // Attach appropriate renderer to each item
    // debugger;
    // attachDisplayObjects(presentationData.slidesData[0] , app)

    const engine = new DrawEngine(app, { debug: true });
    const currentTime = 2;
    engine.draw(presentationData.slidesData[0], currentTime);
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
