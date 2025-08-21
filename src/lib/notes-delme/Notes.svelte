<script>
  import { componentMap } from './componentMap';


  // Safe default so SSR/HMR never explodes
  export let blocks =  [];
</script>

{#each blocks as block,i}
  <!--  -->
    <!-- All other blocks keep original API -->
    <svelte:component
      this={componentMap[block.type]}
      block={blocks[i]} />
  
{/each}
