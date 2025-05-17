<script lang="ts">
  // @ts-nocheck
  import Logo from './Logo.svelte';

  export let player;
  export let slide = '—';   // slide label
  export let time  = 0;// running time

  function formatTime(t) {
  const min = Math.floor(t / 60);
  const sec = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 10); // single-digit ms (0–9)
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${ms}`;
}

  const start   = () => player?.start?.();
  const pause   = () => player?.pause?.();
  const restart = () => player?.reset?.();
</script>

<div class="flex justify-between items-center p-3 px-6 m-0 bg-[#3a3a3a] shadow-sm">
  <!-- Left: controls + timer + slide label -->
  <div class="flex items-center space-x-2">
    <button class="px-3 py-1 rounded  hover:bg-[#a8865f] text-gray-900 shadow" on:click={start}>▶</button>
    <button class="px-3 py-1 rounded hover:bg-[#a8865f] text-gray-900 shadow" on:click={pause}>⏸</button>
    <button class="px-3 py-1 rounded  hover:bg-[#a8865f] text-gray-900 shadow" on:click={pause}>⏹</button>
    


    <div class="ml-4 flex items-baseline space-x-2 text-sm font-mono text-white">
      <span>{formatTime(time)}</span>
      <span class="opacity-70">|</span>
      <span class="italic">{slide}</span>
  </div>
  
  </div>

  <!-- Right: Home / Logo -->
  <Logo
    url="/"
    bg="bg-[#c4a77f]"
    hoverBg="hover:bg-[#bc9661]"
    titleColor="text-gray-900"
  />
</div>
