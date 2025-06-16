<script>
  import { onMount } from "svelte";
  import { Howl } from "howler";
  import { Player } from "taleem-canvasplayer";
  import SlideNav from "./SlideNav.svelte";
  import { presentationData } from "./presentationData.js";

  export const prerender = true;

  let container;
  let player;
  let sound;
  let currentTime = 0;

  $: currentTime;

  onMount(() => {
    sound = new Howl({
      src: ["sounds/music.opus"],
      html5: true
    });
    sound.volume(0.2);

    player = new Player({
      mountEl: container,
      deckData: presentationData.slidesData,
      width: presentationData.designWidth,
      height: presentationData.designHeight,
      backgroundColor: presentationData.slidesData[0].background?.backgroundColor || "#000000",
      sound,
      assets: {
        drops: "images/drops.png",
        femaleTeacher: "images/female_teacher.jpg",
        physicsClass: "images/physicsClass.webp",
        whatisforce: "images/whatisforce.webp",
        typesOfForce: "images/typesOfForce.webp",
        class: "images/class.webp",
        taleemclass: "images/taleemclass.webp",
        fbise9physicsChapter1Bg: "images/fbise9physicsChapter1Bg.webp",
        appleFallingFromTree: "images/appleFallingFromTree.webp",
        everyDayItems: "images/everyDayItems.webp",
        rocketTakeoff: "images/rocketTakeoff.webp",
        physicsArt: "images/physicsArt.webp"
      }
    });

    player.setTime(0);

    function syncTimeLoop() {
      const loop = () => {
        if (player) {
          
          currentTime = player.getCurrentTime();
          // console.log("currentTime" , currentTime);
        }
        requestAnimationFrame(loop);
      };
      loop(); // Start loop immediately
    }

    syncTimeLoop();
  });
</script>

{#if player}
  <div class="">
    <SlideNav
      {currentTime}
      maxEndTime={presentationData.totalDuration}
      on:play={() => player.play()}
      on:pause={() => player.pause()}
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
    align-items: start;
    height: 100vh;
    background-color: #3b3a3a;
    margin-top: 0;
    padding-top: 0;
  }

  :global(body) {
    margin: 0;
  }
</style>
