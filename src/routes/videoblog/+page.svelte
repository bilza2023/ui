<script>
  import { onMount } from "svelte";
  import { Player, createTicker } from "./24may/player";
  import { pixiApp } from "./pixiApp.js";
  import { presentationData } from "./24may/testSlides/userSlide1"; // ✅ updated import
  // import { createTicker } from './ticker/createTicker.js';
  import SlideNav from "./SlideNav.svelte";
  import * as PIXI from "pixi.js";

const backgroundAssets = {
  chalkboard: PIXI.Texture.from("images/class2.webp"),
  sciFiHallway: PIXI.Texture.from("images/drops.png")
};
  let container;
  let player;
  let ticker;
  let currentTime = 0;

  function resize(app, designWidth, designHeight) {
    if (!container) return;
  const parent = container;
  const scaleX = parent.clientWidth / designWidth;
  const scaleY =  (parent.clientHeight * 0.9) / designHeight;
  const scale = Math.min(scaleX, scaleY);

  app.view.style.width = `${designWidth * scale}px`;
  app.view.style.height = `${designHeight * scale}px`;
  app.view.style.display = "block";
  app.view.style.margin = "0 auto";
}

  onMount(() => {
    // debugger;
    console.log("presentationData",presentationData);
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

    // Inject assets
    console.log("backgroundAssets" , backgroundAssets);
    player.setAssets?.(backgroundAssets); 
    
    container.appendChild(app.view);
    container.appendChild(app.view);

    if (container) {
        resize(app, presentationData.designWidth, presentationData.designHeight);
    }
    
    window.addEventListener("resize", () => {
      if (container) {
        resize(app, presentationData.designWidth, presentationData.designHeight);
      }
    });

    player.setTime(0);
    // player.pause();

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
<div class="">
  <SlideNav
    {currentTime}
    maxEndTime={presentationData.totalDuration}
    on:play={() => player.play()}
    on:pause={() => player.timeSource.pause()}
    on:reset={() => player.reset()}
    on:seek={(e) => player.setTime(e.detail)}
  />
</div>  
{/if}

<div class="stage" bind:this={container}></div>

<style>
.stage {
  display: flex;
  justify-content: center;
  align-items: start;  /* 👈 this is the fix */
  height: 100vh;
  background-color: #3b3a3a;
}

  :global(body) {
  margin: 0;
}

.stage {
  margin-top: 0;      /* Remove top spacing */
  padding-top: 0;     /* Ensure no padding from top */
}

</style>
