<script>
  import { onMount } from 'svelte';
  import { page }      from '$app/stores';
  import { SveltePlayer } from '../../../lib/Player';
  
  import DeckBuilder from '../../../lib/deckbuilder/Deckbuilder.js';
  import { zodDeckV1 } from '../../../lib/deckbuilder/schema/ZodDeckV1.js';


  let deck =  [
      {
        "type": "eq",
        "start": 0,
        "end": 30,
        "data": [
          {
            "name": "line",
            "type": "heading",
            "content": "Theorem 10.1.3 — Geometry Setup",
            "showAt": 0,
            "spItems": [
              {
                "type": "spText",
                "content": "Understanding the base triangle configuration"
              },
              {
                "type": "spImage",
                "content": "/images/theorems9old_10.1.3.svg"
              }
            ]
          },
          {
            "name": "line",
            "type": "text",
            "content": "Given triangle ABC with perpendicular from B to AC",
            "showAt": 5,
            "spItems": [
              {
                "type": "spText",
                "content": "This is the construction basis for the proof."
              }
            ]
          },
          {
            "name": "line",
            "type": "math",
            "content": "AB^2 + BC^2 = AC^2",
            "showAt": 15,
            "spItems": [
              {
                "type": "spText",
                "content": "Pythagorean identity applied in the triangle."
              }
            ]
          },
          {
            "name": "line",
            "type": "text",
            "content": "This completes the logical explanation of Theorem 10.1.3",
            "showAt": 25,
            "spItems": [
              {
                "type": "spText",
                "content": "Diagram and formula now aligned."
              }
            ]
          }
        ]
      }
    ];

  let background = {

    backgroundColor: '#fffff',
    backgroundImage : null,
    backgroundImageOpacity :1
  };   
  
  let notFound   = false;
  let soundUrl   = '/sounds/music.opus';
  let mounted    = false;


  // Run once after the component mounts
  onMount(() => {
   

    mounted = true;
  });
</script>

{#if mounted}
  {#if notFound}
  <!-- dont remove this text-black -->
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
