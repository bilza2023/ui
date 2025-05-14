<script lang="ts">
  // @ts-nocheck
  import Logo from './Logo.svelte';

  export let player;

  const start   = () => player?.start?.();
  const pause   = () => player?.pause?.();
  const restart = () => player?.reset?.();
</script>

<div class="flex justify-between items-center p-3 px-6 m-0 bg-[#c4a77f] shadow-sm">
  <!-- Left: slide controls -->
  <div class="flex space-x-2">
    <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={start}>▶</button>
    <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={pause}>⏸</button>
    <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" on:click={restart}>⟲</button>
  </div>

  <!-- Right: Home / Logo -->
  <Logo
    url="/"
    bg="bg-[#c4a77f]"
    hoverBg="hover:bg-[#bc9661]"
    titleColor="text-gray-900"
  />
</div>
