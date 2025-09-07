<script>
  import QuestionItem from "./QuestionItem.svelte";
  export let items = [];
</script>

<!-- FLEX list: wraps into rows, with gaps, left-aligned -->
<div class="q-list flex flex-wrap gap-4 justify-start items-start">
  {#each items as q, i (q.slug ?? q.id ?? `idx-${i}`)}
    <QuestionItem item={q} />
  {/each}
</div>

<style>
  /* If Tailwind isn’t active for some reason, keep a safe fallback */
  .q-list { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start; 
  
  
  }
</style>
