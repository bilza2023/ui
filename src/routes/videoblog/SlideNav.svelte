
<script>
  import { createEventDispatcher } from "svelte";

  export let currentTime = 0;
  export let maxEndTime = 1000;

  const dispatch = createEventDispatcher();

  function seek(e) {
    const t = parseFloat(e.target.value);
    if (!isNaN(t)) {
      dispatch("seek", t);
    }
  }

  function play() {
    dispatch("play");
  }

  function pause() {
    dispatch("pause");
  }

  function reset() {
    dispatch("reset");
  }

  function setVolume(e) {
    // optional if you want to pass volume to outside
  }
</script>

<div class="text-white p-2 bg-[#111827] flex items-center gap-4">
  <!-- <div class="text-red-700"> -->
  <button on:click={play}>▶ Play</button>
  <button on:click={pause}>⏸ Pause</button>
  <button on:click={stop}>⏹ Reset</button>
  <!-- </div> -->

  <span class="text-sm font-mono text-yellow-500"
    >{currentTime.toFixed(1)}/{Math.floor(maxEndTime)}&nbsp;s</span
  >
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
  html,
  body {
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
    accent-color: #ff9800; /* Works in modern browsers */
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
