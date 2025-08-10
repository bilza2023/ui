<script>
  import TaleemSlides from '../../../lib/taleemSlides/TaleemSlides.svelte';

import {onMount} from "svelte"
  let deck = [];          // must be slides[]
  let soundUrl = null;
  let mounted = false;
  let currentTime = 0;

  const BASE = '/decks_workbench/';

  function trigger(){

    setInterval(()=>{
      currentTime +=1;
      console.log("currentTime" ,currentTime);
    } ,1000);
    
  
  }
  onMount(async () => {
    const params   = new URLSearchParams(window.location.search);
    const filename = params.get('filename') ?? 'index.json';
    const path     = `${BASE}${filename}`;

    if (filename.endsWith('.json')) {
      const res = await fetch(path);
      const obj = await res.json();

      // ✅ normalize to slides[]
      deck = Array.isArray(obj) ? obj : (obj.slides ?? obj.deck ?? []);
      soundUrl = null; // not needed for this test
      trigger()//
      mounted = true;
      return;
    }

    alert('For now, load a .json deck (we’ll add .js later).');
    mounted = true;
  });
</script>

{#if mounted && deck.length}
  {#key  currentTime}
  <TaleemSlides {deck} {currentTime} />
  {/key}
{:else}
  <div class="flex items-center justify-center h-full">Loading…</div>
{/if}

<style>
  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}
</style>
