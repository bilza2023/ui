<script>
  import { onMount }          from 'svelte';
  import { page }             from '$app/stores';
  import { SveltePlayer }     from '../../lib/Player';
  import DeckBuilder          from '../../lib/deckbuilder/Deckbuilder';
  import { zodDeckV1 }        from '../../lib/deckbuilder/schema/ZodDeckV1';
  import { deck404 }          from './deck404.js';

  let deck    = null;
  let soundUrl = '/sounds/music.opus';
  let mounted  = false;

  // Eagerly load all deck modules
  const modules = import.meta.glob('$lib/content/*.js', { eager: true });
  const deckMap = {};

  for (const path in modules) {
    const name = path.split('/').pop().replace(/\.js$/, '');
    const mod  = modules[path];
    // Expect each deck file to export function defineDeck(builder)
    deckMap[name] = mod.defineDeck ?? mod.default;
  }

  async function loadDeckByName(name) {
    const defineDeck = deckMap[name];
    if (typeof defineDeck !== 'function') {
      deck = deck404;
      return;
    }
    const builder = new DeckBuilder();
    defineDeck(builder);
    const candidate = builder.build();
    const result = zodDeckV1.safeParse(candidate);

    if (!result.success) {
      const err = result.error.errors[0];
      alert(`Validation failed at ${err.path.join('.')}: ${err.message}`);
      deck = deck404;
    } else {
      deck = result.data.deck;
    }
  }

  onMount(() => {
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');
    if (filename) {
      loadDeckByName(filename);
      // optional: check for matching .opus sound
      debugger;
      const opusName = filename + '.opus';
      fetch(`/sounds/${opusName}`, { method: 'HEAD' })
        .then(res => { if (res.ok) soundUrl = `/sounds/${opusName}`; })
        .catch(() => {});
    }
    mounted = true;
  });
</script>

{#if mounted}
  {#key soundUrl}
  <SveltePlayer
    deck={deck ?? deck404}
    soundUrl={soundUrl}
    background={{
      backgroundColor: '#ffffff',
      backgroundImage: '/images/defaultBg.png',
      backgroundImageOpacity: 0.8
    }}
  />
  {/key}
{/if}
