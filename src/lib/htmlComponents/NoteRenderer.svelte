<script>
  import { componentMap } from '$lib/htmlComponents';  // your index.js
  export let blocks = [];
</script>

{#each blocks as block}
  <svelte:component
    this={componentMap[block.type] ?? componentMap.p}
    content={block.content ?? block}   
  />
{/each}
