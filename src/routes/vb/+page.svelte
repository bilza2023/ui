<script>
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { Player, createTicker } from "./24may/player";
  import { pixiApp } from "./pixiApp.js";
 
  import staticVideos from "../../lib/staticVideos/staticVideos";
  import SlideNav from "./SlideNav.svelte";
  import * as PIXI from "pixi.js";

  export const prerender = true;
  let container;
  let player;
  let ticker;
  let currentTime = 0;

  let presentationData; 
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
///////////////////////////////////////////////////
  onMount(async() => {
    // debugger;

const backgroundAssets = {
  class: PIXI.Texture.from("images/class2.webp"),
  drops: PIXI.Texture.from("images/drops.png"),
  femaleTeacher: PIXI.Texture.from("images/female_teacher.jpg"),
  physicsClass: PIXI.Texture.from("images/physicsClass.webp"),
  whatisforce: PIXI.Texture.from("images/whatisforce.webp"),
  typesOfForce: PIXI.Texture.from("images/typesOfForce.webp"),
  taleemclass: PIXI.Texture.from("images/taleemclass.webp"),
};
    // console.log("presentationData",presentationData);
////////////////////////////////////////////////////////////////////////
// const name = $page.url.searchParams.get("presentation") || "userSlide";
//    ({ presentationData } =
//      await import(/* @vite-ignore */ `../../lib/staticVideos/tests/${name}.js`)); 
const name = $page.url.searchParams.get("presentation") || "demo";
  presentationData = staticVideos[name];
 if(!presentationData) throw new Error( `${name} file not found`);
 
////////////////////////////////////////////////////////////////////////  
  
  
    const app = pixiApp(
      presentationData.slidesData[0].background?.backgroundColor || "#000000",
      presentationData.designWidth,
      presentationData.designHeight
    );

    // let soundUrl = null;
    let soundUrl = "sounds/music.opus";
    ticker = createTicker(soundUrl);
    ticker.volume(0.2);

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
