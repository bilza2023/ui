<script>
  import { onMount } from 'svelte';
  import {createPlayer} from "./24may/player";
  import { pixiApp } from './pixiApp.js';
  import { presentationData } from "./24may/goldStandar.js"; // ✅ updated import

  let container;

  onMount(() => {
    const app = pixiApp(
      presentationData.slidesData[0].background?.backgroundColor || "#000000",
      presentationData.designWidth,
      presentationData.designHeight
    );

    container.appendChild(app.view);
debugger;
    const player = createPlayer({app,slides: presentationData.slidesData});

    player.setTime(0); // optional: render first frame
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
