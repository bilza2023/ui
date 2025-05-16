<script lang="ts">
  // @ts-nocheck
  import Logo from './Logo.svelte';

  export let player;
  export let slide = '—';   // slide label
  export let time  = '0:00';// running time

  const start   = () => player?.start?.();
  const pause   = () => player?.pause?.();
  const restart = () => player?.reset?.();
</script>

<div class="flex justify-between items-center p-3 px-6 m-0 bg-[#c4a77f] shadow-sm">
  <!-- Left: controls + timer + slide label -->
  <div class="flex items-center space-x-2">
    <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={start}>▶</button>
    <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={pause}>⏸</button>
    <!-- <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={restart}>⟲</button> -->
    <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={pause}>⏹</button>


    <div class="ml-4 flex items-baseline space-x-2 text-sm font-mono text-gray-900">
      <span>{time}</span>
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
