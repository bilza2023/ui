<script>
  import { componentMap } from './componentMap';  // your index.js
  export let blocks = [];
</script>

{#each blocks as block}
  <svelte:component
    this={componentMap[block.type] ?? componentMap.p}
    content={block.content ?? block}   
  />
{/each}
