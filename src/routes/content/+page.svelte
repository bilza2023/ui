<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { PivotPlayer } from 'taleem-pivot-player';
  import { deck404 } from './deck404.js';

  export let data;
  let { deck } = data;

  let soundUrl = '/sounds/music.opus';  // default
  let mounted  = false;                 // hide player until URL decided

  onMount(async () => {
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');

    if (filename) {
      try {
        // quick HEAD request – no download, just existence check
        const res = await fetch(`/sounds/${filename}.opus`, { method: 'HEAD' });
        if (res.ok) soundUrl = `/sounds/${filename}.opus`;
      } catch {
        /* network failure → keep default */
      }
    }

    mounted = true;   // now we know the correct URL; render player
  });
</script>

{#if mounted}
  <PivotPlayer
    deck={deck ?? deck404}
    soundUrl={soundUrl}
    background={{
      backgroundColor: '#ffffff',
      backgroundImage: '/pivot/defaultBg.png',
      backgroundImageOpacity: 0.8
    }}
  />
{/if}
