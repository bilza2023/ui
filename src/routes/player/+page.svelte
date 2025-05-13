<script>
  import { onMount } from 'svelte';
  import * as PIXI from 'pixi.js';
  import TickerPlayer from './TickerPlayer.js';
  import { slides } from './testSlides.js';

  let player;
  let currentTime = 0;

  onMount(() => {
    const app = new PIXI.Application({
      width: 800,
      height: 400,
      backgroundColor: 0x1e1e1e,
    });

    document.getElementById('pixi-container').appendChild(app.view);

    player = new TickerPlayer({ app, slides });

    const interval = setInterval(() => {
      currentTime = player.currentTime.toFixed(1);
    }, 100);

    return () => clearInterval(interval);
  });

  const toggle = () => {
    if (player.isPlaying) {
      player.pause();
    } else {
      player.start();
    }
  };

  const reset = () => {
    player.reset();
    currentTime = 0;
  };
</script>

<h1 class="text-xl font-bold mb-2">🧪 Slide Player Test</h1>
<p class="text-sm text-gray-300 mb-2">⏱️ Current Time: {currentTime}s</p>

<div class="flex gap-2 mb-3">
  <button on:click={toggle} class="bg-green-600 px-3 py-1 rounded text-white">▶ Play / ⏸ Pause</button>
  <button on:click={reset} class="bg-gray-700 px-3 py-1 rounded text-white">⏮ Reset</button>
</div>

<div id="pixi-container" class="border border-gray-500 w-[800px] h-[400px]"></div>
