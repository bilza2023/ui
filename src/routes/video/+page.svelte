<script>
  import { onMount } from "svelte";
  import {  createTicker } from "./ticker/createTicker";
  import { page } from '$app/stores';
  import {Player} from "taleem-canvasplayer";
  import { pixiApp } from "./pixiApp.js";
  import { presentationData as demoPresentationData } from "../../lib/content/demo.js";
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
 
const assets = {
  drops: PIXI.Texture.from("images/drops.png"),
  femaleTeacher: PIXI.Texture.from("images/female_teacher.jpg"),
  physicsClass: PIXI.Texture.from("images/physicsClass.webp"),
  whatisforce: PIXI.Texture.from("images/whatisforce.webp"),
  typesOfForce: PIXI.Texture.from("images/typesOfForce.webp"),
  class: PIXI.Texture.from("images/class.webp"),
  taleemclass: PIXI.Texture.from("images/taleemclass.webp"),
  fbise9physicsChapter1Bg: PIXI.Texture.from("images/fbise9physicsChapter1Bg.webp"),
  appleFallingFromTree: PIXI.Texture.from("images/appleFallingFromTree.webp"),
  everyDayItems: PIXI.Texture.from("images/everyDayItems.webp"),
  rocketTakeoff: PIXI.Texture.from("images/rocketTakeoff.webp"),
  physicsArt: PIXI.Texture.from("images/physicsArt.webp"),
};
   
try {
  // debugger;
  const filename = $page.url.searchParams.get("filename") || "demo";
  // const filename =  "fbise9physics-chapter-1-ex1_1-q1";
  const modules = import.meta.glob('/src/lib/content/**/*.js');
  const match = Object.keys(modules).find(path => path.includes(`${filename}.js`));
  if (match) {
    const mod = await modules[match]();
    presentationData = mod.presentationData;
    console.log("presentationData",presentationData);
  } else {
    console.warn(`Module not found for ${filename}, loading demo`);
    presentationData = demoPresentationData; // 👈 fallback line
  }

} catch (err) {
  console.error(`Slide not found for ${name}`, err);
}
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
    // console.log("assets" , assets);
    player.setAssets?.(assets); 
    
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
