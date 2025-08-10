<script>
  import TaleemSlides from '../../../lib/taleemSlides/TaleemSlides.svelte';
  import NavBar from '../../../lib/taleemSlides/NavBar.svelte';

import {onMount} from "svelte"
  let deck = [];          // must be slides[]
  // console.log("deck" ,deck);
  let soundUrl = null;
  let mounted = false;
  let currentTime = 0;
  let duration = 60;


  const BASE = '/decks_workbench/';


  onMount(async () => {
    const params   = new URLSearchParams(window.location.search);
    const filename = params.get('filename') ?? 'index.json';
    const path     = `${BASE}${filename}`;

    if (filename.endsWith('.json')) {
      const res = await fetch(path);
      const obj = await res.json();

      // ✅ normalize to slides[]
      deck = Array.isArray(obj) ? obj : (obj.slides ?? obj.deck ?? []);
      // debugger;
      duration = deck[deck.length -1].end;
      console.log("duration" , duration);
      soundUrl = null; // not needed for this test
      // trigger()//
      mounted = true;
      return;
    }

    alert('For now, load a .json deck (we’ll add .js later).');
    mounted = true;
  });

  function onSeek(val){
   currentTime = val;
  }
</script>

{#if mounted && deck.length}
  <!-- {#key  currentTime} -->
  <TaleemSlides {deck} {currentTime} />
  <!-- {/key} -->
{:else}
  <div class="flex items-center justify-center h-full">Loading…</div>
{/if}

<NavBar  {currentTime} {onSeek} {duration} />
<style>
  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}
</style>
