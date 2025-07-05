<script>
  import { onMount } from 'svelte';
  export let data;
  import {PivotPlayer} from 'taleem-pivot-player';
  import { deck404 } from './deck404.js';
 
  // data.deck is already a JS object (or null)
 let deck = data.deck ?? null;  
  let mounted = false;

  onMount(() => {
    // debugger;
    mounted = true;
  });
</script>

{#if mounted}
  {#if deck}
    <PivotPlayer
      {deck}
      soundUrl="/sounds/music.opus"
      background={{
        backgroundColor: "#ffffff",
        backgroundImage: "/pivot/defaultBg.png",
        backgroundImageOpacity: 0.8
      }}
    />
  {:else}
    <PivotPlayer
      deck={deck404}
      soundUrl="/sounds/music.opus"
      background={{
        backgroundColor: "#ffffff",
        backgroundImage: "/pivot/defaultBg.png",
        backgroundImageOpacity: 0.8
      }}
    />
  {/if}
{/if}
