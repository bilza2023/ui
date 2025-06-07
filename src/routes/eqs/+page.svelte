<script>
  import { onMount } from 'svelte';
  import { Howl } from 'howler';
  import { getHowler } from "./getHowler";
  import Player from '../../lib/players/player/Player';
  import SlideNav from '../../lib/players/SlideNav.svelte';
  import EqPlayer from '../../lib/players/eqsPlayer/EqPlayer.svelte';
  import PresentationData from '../../lib/staticVideosEq/slide';

  let currentTime = 0;
  let playing = false;
  let player;
  let maxEndTime;
  const data = PresentationData;
  const soundUrl = "sounds/music.opus";
  let images;

  onMount(() => {
 console.log("PresentationData" ,PresentationData);
 
  images = {
  default: "/images/taleemclass.webp",  
  drops: "/images/drops.png",
  femaleTeacher: "/images/female_teacher.jpg",
  physicsClass: "/images/physicsClass.webp",
  whatisforce: "/images/whatisforce.webp",
  typesOfForce: "/images/typesOfForce.webp",
  class: "/images/class.webp",
  taleemclass: "/images/taleemclass.webp",
  fbise9physicsChapter1Bg: "/images/fbise9physicsChapter1Bg.webp",
  appleFallingFromTree: "/images/appleFallingFromTree.webp",
  everyDayItems: "/images/everyDayItems.webp",
  rocketTakeoff: "/images/rocketTakeoff.webp",
  physicsArt: "/images/physicsArt.webp",
};



    const sound = getHowler(soundUrl);
    maxEndTime = Math.max(...data.slide.map(eq => eq.endTime));
    player = new Player(sound);
          player.onTick = (t) => {
        currentTime = +t;
        if (currentTime >= maxEndTime) {
          player.pause();
          playing = false;
          // no need to call seek again — it's already at maxEndTime
        }
      };

    reset();
    return () => player.pause();
  });

  function seek(time) {
    player.seek(time);
    currentTime = time;
    playing = false;
  }

  function reset() {
    playing = false;
    player.reset();
    currentTime = 0;
  }
</script>

{#if maxEndTime}
  <SlideNav
    {playing}
    {maxEndTime}
    {currentTime}
    on:play={() => { playing = true; player.play(); }}
    on:pause={() => { playing = false; player.pause(); }}
    on:reset={reset}
    on:seek={(e) => seek(e.detail)}
  />
{/if}

{#if images}
<!-- <EqPlayer slide={data} {currentTime} {images} /> -->
<EqPlayer slide={data} {currentTime} {images} on:seek={(e) => seek(e.detail)} />

{/if}
