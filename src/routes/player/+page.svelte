<svelte:head>
  <meta name="robots" content="index,follow" />
</svelte:head>

<img
  src="/images/taleem.webp"
  alt="Taleem Slide Preview"
  style="display: none;"
  width="1200"
  height="630"
/>

<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { SveltePlayer } from '../../lib/Player';

  export let data;
  const { deck, background, error } = data;
  let soundUrl = null;
  let notFound = false;
  let mounted = false;

  onMount(async () => {
    const params = new URLSearchParams($page.url.search);
    const filename = params.get('filename');
   
    if (!filename) {
      notFound = true;
    } else {
      try {
        const opusName = `${filename}.opus`;
        const response = await fetch(`/sounds/${opusName}`, { 
          method: 'HEAD',
          cache: 'no-store' // Prevent caching issues
        });
        soundUrl = response.ok ? `/sounds/${opusName}` : null;
      } catch (err) {
        console.log('Fetch error for sound file:', err.message); // Log for debugging
        soundUrl = null; // Ensure null on any error
      }
    }

    mounted = true;
    return () => {}; // Cleanup function
  });
</script>

{#if mounted}
  {#if notFound}
    <!-- dont remove this text-black -->
    <div class="flex items-center justify-center h-full p-8">
      <p class="text-lg font-semibold text-gray-700">Content not found.</p>
    </div>
  {:else if deck}
    {#key soundUrl}
      <SveltePlayer
        {deck}
        {soundUrl}
        {background}
      />
    {/key}
  {:else}
    <div class="flex items-center justify-center h-full p-8">
      <p class="text-lg font-medium text-gray-600">Loading…</p>
    </div>
  {/if}
{/if}

<style>
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  .h-full {
    height: 100%;
  }
</style>