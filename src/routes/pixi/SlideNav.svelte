<script>
  export let start;
  export let pause;
  export let reset;
  export let handleVolume;
  export let handleSeek;
  export let time;
  export let duration; // ✅ duration is passed from parent
  export let volume = 1; // Also add this in +page.svelte

  
</script>

<nav
  class="bg-gray-900 text-white text-sm font-mono px-4 py-2 flex justify-between items-center"
>
  <!-- Left -->
  <div class="flex items-center space-x-3">
    <button on:click={start}>▶ Play</button>
    <button on:click={pause}>⏸ Pause</button>
    <button on:click={reset}>⏮ Reset</button>
    <span class="text-yellow-300"
      >Time: {Math.floor(time)} / {Math.floor(duration)} sec</span
    >
  </div>

  <!-- Middle: Scrollbars -->
  <div class="flex w-1/2 space-x-2 mx-4">
    <input
      type="range"
      min="0"
      max={duration}
      step="0.01"
      value={time}
      on:input={handleSeek}
      class="w-[80%] h-2 accent-yellow-200 cursor-pointer"
    />
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      on:input={handleVolume}
      class="w-[20%] h-[2px] accent-green-400 cursor-pointer"
    />
  </div>

  <!-- Right -->
  <div class="text-yellow-300">
    <a href="https://taleem.help">taleem.help</a>
  </div>
</nav>

<style>
  nav button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
  }

  nav button:hover {
    text-decoration: underline;
  }
</style>
