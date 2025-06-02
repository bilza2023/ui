<script>
  import { onMount } from 'svelte';
  import { Howl } from 'howler';
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
    
    const sound = new Howl({ src: [soundUrl], html5: true });
    maxEndTime = Math.max(...data.slide.map(eq => eq.endTime));
    player = new Player(sound);
                  player.onTick = (t) => {
                    currentTime = +t; // ensures reactivity
                    if (currentTime >= maxEndTime) {
                          player.pause();
                          player.seek(maxEndTime);
                          playing = false;
                        }
                  };
    return () => player.pause();
  });

  function seek(time) {
    player.seek(time);
    currentTime = time;
    playing = false; // optional: pause on seek
  }
</script>

{#if maxEndTime}
<SlideNav
  {playing}
  {maxEndTime}
  {currentTime}
  on:play={() => { playing = true; player.play(); }}
  on:pause={() => { playing = false; player.pause(); }}
  on:reset={() => { playing = false; player.reset(); currentTime = 0; }}
  on:seek={(e) => seek(e.detail)}
/>
{/if}

<EqPlayer slide={data} {currentTime} />
