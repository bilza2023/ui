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
  import { page }      from '$app/stores';
  import { SveltePlayer } from '../../lib/Player';

  export let data;
  const { deck, background,error } = data;

  // let deck       = null;        // slide array for the player
  // let background = null;        // background config   
  let notFound   = false;
  // let soundUrl   = '/media/sounds/music.opus';
  let soundUrl   = null;
  let mounted    = false;


  // Run once after the component mounts
  onMount(() => {
    // debugger;
    console.log("deck",deck);
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');

    if (!filename) {
      notFound = true;
    } else {
      // Optionally look for a matching .opus file
      const opusName = `${filename}.opus`;
      fetch(`/sounds/${opusName}`, { method: 'HEAD' })
        .then((res) => { if (res.ok) soundUrl = `/sounds/${opusName}`; })
        .catch(() => {});
    }

    mounted = true;
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
  /* Basic centering helpers */
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
