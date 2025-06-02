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

  onMount(() => {
    const sound = getHowler(soundUrl);
    maxEndTime = Math.max(...data.slide.map(eq => eq.endTime));
    player = new Player(sound);
    player.onTick = (t) => {
      currentTime = +t;
      if (currentTime >= maxEndTime) {
        player.pause();
        player.seek(maxEndTime);
        playing = false;
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

<EqPlayer slide={data} {currentTime} />
