<script>
  import { onMount } from 'svelte';
  import { Howl } from 'howler';
  import { getHowler } from "./getHowler";
  import Player from '../../lib/players/player/Player';
  import SlideNav from '../../lib/players/SlideNav.svelte';
  import EqPlayer from '../../lib/players/eqsPlayer/EqPlayer.svelte';
  import {default as demoPresentationData} from '../../lib/staticVideosEq/demo';

  let currentTime = 0;
  let playing = false;
  let player;
  let maxEndTime;
  let PresentationData=null;

  const soundUrl = "sounds/music.opus";
  let images;

onMount(async() => {
  // debugger;
  const params = new URLSearchParams(window.location.search);
  const filename = params.get("filename"); // e.g. fbise9physics-chapter-1-ex1_1-q1
  if (!filename) return;

  try {
    const modules = import.meta.glob('/src/lib/content/**/*.js');
    const matchingPath = Object.keys(modules).find(path => path.includes(`${filename}.js`));

    if (matchingPath) {
      const mod = await modules[matchingPath]();
      // console.log("mod",mod);
      PresentationData = mod.default;;
    } else {
      PresentationData = demoPresentationData;
      // console.error("Slide file not found:", filename);
    }
  } catch (err) {
    console.error("Error loading presentation:", err);
  }

///////////////////////////////
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
    maxEndTime = Math.max(...PresentationData.slide.map(eq => eq.endTime));
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

{#if PresentationData}
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
<!-- <EqPlayer slide={PresentationData} {currentTime} {images} /> -->
<EqPlayer slide={PresentationData} {currentTime} {images} on:seek={(e) => seek(e.detail)} />
{/if}

{/if}
