<script>
  import { onMount } from 'svelte';
  import { page }      from '$app/stores';
  import { SveltePlayer } from '../../lib/Player';

  let deck       = null;        // slide array for the player
  let background = null;        // background config   
  let notFound   = false;
  let soundUrl   = '/sounds/music.opus';
  let mounted    = false;

  /**
   * Fetch a pre‑built deck JSON by name.
   * Expects the file to live at: /data/content/<name>.json
   */
  async function loadDeckJson (name) {
    try {
      const res = await fetch(`/data/content/${name}.json`);
      if (!res.ok) {
        notFound = true;
        return;
      }

      const json = await res.json();
      deck       = json.deck;                     // core deck array
      background = json.background ?? {           // fallback background
        backgroundColor: '#ffffff',
        backgroundImage: '/images/defaultBg.png',
        backgroundImageOpacity: 0.8
      };
    } catch (err) {
      console.error('Deck fetch error:', err);
      notFound = true;
    }
  }

  // Run once after the component mounts
  onMount(() => {
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');

    if (!filename) {
      notFound = true;
    } else {
      loadDeckJson(filename);

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
