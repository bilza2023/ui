<script>
  import '$lib/styles/tokens.css';
  import ChapterExDD from './ChapterExDD.svelte';
  import SyllabusCards from './SyllabusCards.svelte';

  export let data;
  const { tcode, selected, synopsis, items } = data;

  // Page-level filter state (init from loader)
  let chapter  = selected?.chapter  ?? '';
  let exercise = selected?.exercise ?? '';

  // Reactive filter
  $: filteredItems = items.filter(r =>
    (!chapter  || r.chapter  === chapter) &&
    (!exercise || r.exercise === exercise)
  );

  function onChange(e) {
    chapter  = e.detail.chapter  ?? '';
    exercise = e.detail.exercise ?? '';
    // TODO (optional): sync URL query params here
  }
</script>

<section class="page">
  <ChapterExDD {synopsis} selected={{ chapter, exercise }} on:change={onChange} />

  {#if filteredItems.length > 0}
    <SyllabusCards items={filteredItems} />
  {:else}
    <div class="empty">No items for this selection.</div>
  {/if}
</section>

<style>
  .page {
    display: grid;
    gap: var(--space-lg, 1rem);
    padding: var(--space-md, 1rem);
    background: var(--backgroundColor);
    color: var(--primaryText);
  }
  .empty {
    padding: 1rem;
    border: 1px dashed var(--borderColor);
    border-radius: 12px;
    color: var(--secondaryText);
    text-align: center;
  }
</style>
