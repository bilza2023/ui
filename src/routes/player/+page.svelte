<script>
  import { onMount } from 'svelte';
  import * as PIXI from 'pixi.js';
  import TickerPlayer from './TickerPlayer.js';
  import { slidesData } from './testSlides.js';

  let player;
  let currentTime = 0;
  let canvasContainer;

  onMount(() => {
    const app = new PIXI.Application({
      resizeTo: canvasContainer,
      backgroundColor: 0x1e1e1e,
    });

    canvasContainer.appendChild(app.view);

    player = new TickerPlayer({ app, slidesData });

    // Update currentTime only while playing
    const interval = setInterval(() => {
      if (player?.isPlaying) {
        currentTime = player.currentTime.toFixed(1);
      }
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

<!-- Full dark background -->
<div class="min-h-screen bg-gray-900 text-white">
  <!-- Toolbar -->
  <div class="w-full px-4 py-2 flex justify-between items-center">
    <!-- Buttons on left -->
    <div class="flex gap-3">
      <button on:click={toggle} class="bg-green-600 px-3 py-1 rounded">▶ Play / ⏸ Pause</button>
      <button on:click={reset} class="bg-gray-600 px-3 py-1 rounded">⏮ Reset</button>
      <span class="text-sm">⏱ {currentTime}s</span>
    </div>

    <!-- Title on right -->
    <div class="font-bold text-lg text-right">🧪 Slide Player</div>
  </div>

  <!-- Responsive Canvas Area -->
  <div class="flex justify-center mt-4">
    <div
      bind:this={canvasContainer}
      class="relative w-full max-w-screen-xl aspect-[16/9]"
      style="max-height: calc(100vh - 100px);"
    >
      <!-- Pixi canvas will be injected here -->
    </div>
  </div>
</div>
