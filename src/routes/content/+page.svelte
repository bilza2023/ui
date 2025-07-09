<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { SveltePlayer } from '../../lib/Player'; 
  import { deck404 } from './deck404.js';

  let deck     = null;
  let soundUrl = '/sounds/music.opus';
  let mounted  = false;
  const modules = import.meta.glob('$lib/content/*.js', { eager: true });

const deckMap = {};
for (const path in modules) {
  deckMap[path.split('/').pop().replace(/\\.js$/, '')] =
    modules[path].default ?? modules[path];
}

function loadDeck(filename) {
  // debugger;
  const deckWrapper = deckMap[filename] ?? null;
  deck =deckWrapper.question.deck;
  console.log(" deck" ,  deck);
}

  onMount(async () => {
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');

    if (filename) {
      // load the deck module
      // debugger;
      loadDeck(filename+ ".js");

      // then check for a matching sound file
      try {
        const opusName = filename + '.opus';
        const res = await fetch(`/sounds/${opusName}`, { method: 'HEAD' });
        if (res.ok) soundUrl = `/sounds/${opusName}`;
      } catch {
        /* ignore */
      }
    }

    mounted = true;
  });
</script>

{#if mounted}
  <SveltePlayer
    deck={deck ?? deck404}
    soundUrl={soundUrl}
    background={{
      backgroundColor: '#ffffff',
      backgroundImage: '/images/defaultBg.png',
      backgroundImageOpacity: 0.8
    }}
  />
{/if}
