<script>
  import { onMount } from 'svelte';
  import TaleemPlayer from '$lib/taleemPlayer/Player.svelte';

  let deck        = [];       // slides[]
  let background  = {};       // bg config
  let soundUrl    = null;     // string | null
  let mounted     = false;    // gates the player

  /** Absolute root for workbench assets served from /static */
  const BASE = '/decks_workbench/';

  onMount(async () => {

    /* 1️⃣ choose file ------------------------------------------------ */
    const params   = new URLSearchParams(window.location.search);
    const filename = params.get('filename') ?? 'index.json';
    const path     = `${BASE}${filename}`;

    /* 2️⃣ dispatch by extension ------------------------------------- */
    if (filename.endsWith('.json')) {
      /* ---- pure JSON deck ---------------------------------------- */
      const res = await fetch(path);
      const obj = await res.json();
      deck       = obj.deck       ?? obj;      // handles {deck:[]} or plain []
      background = obj.background ?? {};
      soundUrl   = obj.soundUrl   ?? null;

    } else if (filename.endsWith('.js')) {
      /* ---- authoring JS deck ------------------------------------- */
      /* dynamic import: Vite/SvelteKit treats /static files as ESM modules */
      const mod = await import(/* @vite-ignore */ path);
      if (typeof mod.defineDeck !== 'function')
        throw new Error('defineDeck() not found in module');

      const { default: Deckbuilder } = await import('../../../lib/deckbuilder/Deckbuilder');
      const b  = new Deckbuilder();
      mod.defineDeck(b);
      const q  = b.build();

      deck       = q.deck;
      background = q.background ?? {};
      soundUrl   = q.soundUrl   ?? null;
    } else {
      throw new Error('Unsupported file type: ' + filename);
    }
  mounted = true;

  });
</script>

{#if mounted && deck.length}
  <TaleemPlayer {deck} {background} {soundUrl} />
{:else}
  <div class="flex items-center justify-center h-full">Loading…</div>
{/if}

<style>
  .flex           { display: flex; }
  .items-center   { align-items: center; }
  .justify-center { justify-content: center; }
  .h-full         { height: 100%; }
</style>
