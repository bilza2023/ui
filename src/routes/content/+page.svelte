<script>
  import { onMount }      from 'svelte';
  import { page }         from '$app/stores';
  import { SveltePlayer } from '../../lib/Player';
  import DeckBuilder      from '../../lib/deckbuilder/Deckbuilder';
  import { zodDeckV1 }    from '../../lib/deckbuilder/schema/ZodDeckV1';

  let deck      = null;
  let notFound  = false;
  let soundUrl  = '/sounds/music.opus';
  let mounted   = false;

  // Eagerly load all deck modules
  const modules = import.meta.glob('$lib/content/*.js', { eager: true });
  const deckMap = {};
  for (const path in modules) {
    const name = path.split('/').pop().replace(/\.js$/, '');
    const mod  = modules[path];
    deckMap[name] = mod.defineDeck ?? mod.default;
  }

  async function loadDeckByName(name) {
    const defineDeck = deckMap[name];
    if (typeof defineDeck !== 'function') {
      notFound = true;
      return;
    }

    const builder = new DeckBuilder();
    defineDeck(builder);
    const candidate = builder.build();
    const result = zodDeckV1.safeParse(candidate);

    if (!result.success) {
      console.error('Deck validation error:', result.error);
      notFound = true;
    } else {
      deck = result.data.deck;
    }
  }

  onMount(() => {
    const params   = new URLSearchParams($page.url.search);
    const filename = params.get('filename');

    if (!filename) {
      notFound = true;
    } else {
      loadDeckByName(filename);

      // optional: load matching .opus if it exists
      const opusName = `${filename}.opus`;
      fetch(`/sounds/${opusName}`, { method: 'HEAD' })
        .then(res => { if (res.ok) soundUrl = `/sounds/${opusName}`; })
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
  {:else}
    {#key soundUrl}
      <SveltePlayer
        {deck}
        {soundUrl}
        background={{
          backgroundColor: '#ffffff',
          backgroundImage: '/images/defaultBg.png',
          backgroundImageOpacity: 0.8
        }}
      />
    {/key}
  {/if}
{/if}
