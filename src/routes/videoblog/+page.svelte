<script>
  import { onMount } from 'svelte';
  import * as PIXI from 'pixi.js';
  import DrawEngine from './engine/DrawEngine.js';
  import { Jumbotron} from './pixiTemplates/registry/Jumbotron.js';
  import drawText from './engine/renderers/drawText.js';
  import drawCircle from './engine/renderers/drawCircle.js';
  import drawRect from './engine/renderers/drawRect.js';
  import drawImage from './engine/renderers/drawImage.js';
  
  const DESIGN_RESOLUTION = {width : 1020 , height : 576}
  let container;

  ////////////////////////////////////////////
  let mockSlide;
  ////////////////////////////////////////////
  onMount(() => {
debugger;
    mockSlide = Jumbotron({},{},{},DESIGN_RESOLUTION);
    const app = new PIXI.Application({
      width: DESIGN_RESOLUTION.width,
      height: DESIGN_RESOLUTION.height,
      backgroundColor: mockSlide.backgroundColor,
    });

    container.appendChild(app.view);

    // Attach appropriate renderer to each item
    mockSlide.items.forEach((item) => {
      const type = item.data.type;
      if (type === "text") {
        item.displayObject = drawText(item.data);
      } else if (type === "circle") {
        item.displayObject = drawCircle(item.data);
      } else if (type === "rect") {
        item.displayObject = drawRect(item.data);
      } else if (type === "image") {
        item.displayObject = drawImage(item.data);
      }
    });

    const engine = new DrawEngine(app, { debug: true });
    const currentTime = 2;
    engine.draw(mockSlide, currentTime);
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
