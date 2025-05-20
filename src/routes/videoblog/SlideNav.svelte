<script>
  import { onMount, onDestroy } from "svelte";
  import { Howl } from "howler";

  export let update = (t) => {};
  export let src;

  let sound;
  let ticking = false;
  let audioReady = false;
  export let maxEndTime= 100;
  let currentTime = 0;
  let raf;

  function tick() {
    currentTime = sound.seek() || 0;
    update(currentTime);

    if (currentTime >= maxEndTime) {
      stop();
      return;
    }

    if (sound.playing()) {
      raf = requestAnimationFrame(tick);
    } else {
      ticking = false;
    }
  }

  function play() {
    if (!audioReady) return;
    sound.play();
  }

  function pause() {
    if (sound) {
      sound.pause();
      ticking = false;
    }
  }

  function stop() {
    if (sound) {
      sound.stop();
      cancelAnimationFrame(raf);
      ticking = false;
      update(0);
    }
  }

  function setVolume(e) {
    const v = parseFloat(e.target.value);
    if (!isNaN(v)) sound.volume(v);
  }

  function seek(e) {
    const t = parseFloat(e.target.value);
    if (!isNaN(t)) {
      sound.seek(t);
      update(t);
    }
  }

  onMount(() => {
    sound = new Howl({
      src: [src],
      html5: true,
      onload: () => {
        audioReady = true;
        // maxEndTime = maxEndTime;
        //this should come from page
      },
      onplay: () => {
        if (!ticking) {
          ticking = true;
          raf = requestAnimationFrame(tick);
        }
      }
    });
  });

  onDestroy(() => {
    if (sound) sound.stop();
    cancelAnimationFrame(raf);
  });
</script>

<div class="text-white p-2 bg-[#111827] flex items-center gap-4">
  
  <!-- <div class="text-red-700"> -->
  <button on:click={play}>▶ Play</button>
  <button on:click={pause}>⏸ Pause</button>
  <button on:click={stop}>⏹ Reset</button>
  <!-- </div> -->

  <span class="text-sm font-mono text-yellow-500 ">{currentTime.toFixed(1)}/{Math.floor(maxEndTime)}&nbsp;s</span>
  <div class="flex items-center gap-2 w-full">
    <div class="flex-1 flex items-center gap-2">
      <span class="text-sm">⏱️</span>
      <input
        type="range"
        min="0"
        max={maxEndTime}
        step="0.1"
        bind:value={currentTime}
        on:input={seek}
        class="w-full"
      />
    </div>

    <div class="w-32 flex items-center gap-2">
      <span class="text-sm">📢</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        on:input={setVolume}
        class="w-full"
      />
    </div>
  </div>
  


</div>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f0f0f0;
  }

  #pixi-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: rgb(31, 31, 32);
    overflow: hidden;
  }

  input[type="range"] {
    accent-color: #FF9800; /* Works in modern browsers */
  }

  /* WebKit (Chrome, Safari) */
  input[type="range"]::-webkit-slider-runnable-track {
    background: #e3d6c2;
    height: 6px;
    border-radius: 4px;
  }

  input[type="range"]::-webkit-slider-thumb {
    background: #e3d6c2;
    border: none;
    height: 14px;
    width: 14px;
    margin-top: -4px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
  }

  /* Firefox */
  input[type="range"]::-moz-range-track {
    background: #e3d6c2;
    height: 6px;
    border-radius: 4px;
  }

  input[type="range"]::-moz-range-thumb {
    background: #e3d6c2;
    border: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    cursor: pointer;
  }
</style>
