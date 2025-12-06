<script>
    import { createEventDispatcher, onMount } from 'svelte';
  
    export let sideA = []; // array of blocks
    export let sideB = []; // array of blocks
    export let index = 0;  // optional card index for aria labels
    export let initiallyFlipped = false;
  
    const dispatch = createEventDispatcher();
    let flipped = initiallyFlipped;
  
    onMount(() => {
      flipped = initiallyFlipped;
    });
  
    function toggle() {
      flipped = !flipped;
      if (flipped) dispatch('reveal');
    }
  </script>
  
  <article class="card-viewer" role="group" aria-label={"Card " + (index + 1)}>
    <button class="card-surface" on:click={toggle} aria-pressed={flipped} aria-label="Flip card">
      {#if !flipped}
        <!-- Side A -->
        {#each sideA as block (block && block.data)}
          {#if block.type === 'heading'}
            <h2 class="card-heading">{block.data}</h2>
          {:else if block.type === 'image'}
            <img class="card-image" src={block.data} alt="" />
          {:else}
            <div class="card-div">{block.data}</div>
          {/if}
        {/each}
      {:else}
        <!-- Side B -->
        {#each sideB as block (block && block.data)}
          {#if block.type === 'heading'}
            <h2 class="card-heading">{block.data}</h2>
          {:else if block.type === 'image'}
            <img class="card-image" src={block.data} alt="" />
          {:else}
            <div class="card-div">{block.data}</div>
          {/if}
        {/each}
      {/if}
    </button>
  </article>
  
  <style>
  .card-viewer { display:flex; justify-content:center; padding:12px; }
  .card-surface { width:100%; text-align:center; border-radius:8px; padding:18px; background:var(--card-bg, transparent); border:1px solid var(--card-border, rgba(0,0,0,0.06)); cursor:pointer; }
  .card-heading { margin:0 0 8px 0; font-size:1.25rem; }
  .card-div { white-space:pre-wrap; line-height:1.4; }
  .card-image { max-width:100%; height:auto; display:block; margin:10px auto; }
  </style>
  