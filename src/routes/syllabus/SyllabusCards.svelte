<script>
    import UCard from '$lib/components/UCard.svelte';
  
    // Props
    export let items = [];                               // [{ id, title?, name?, href?, type?, chapter?, exercise?, status?, thumbnail? }, ...]
    export let fallbackThumb = '/media/images/taleem.webp';
    export let linkBuilder = null;                       // optional: (row) => href
  
    function hrefFor(row) {
      if (row.href) return row.href;
      if (typeof linkBuilder === 'function') return linkBuilder(row);
  
      // Default fallback routes (same as your current logic)
      if (row.type === 'note') return `/notes?id=${row.id}`;
      if (row.type === 'deck') return `/player?id=${row.id}`;
      return undefined;
    }
  
    const titleOf = (row) => row.title || row.name || String(row.id);
  </script>
  
  <div class="syllabus-layout">
    {#each items as row (row.id)}
      <UCard
        title={titleOf(row)}
        href={hrefFor(row)}
        thumbnail={row.thumbnail || fallbackThumb}
      >
        {#if row.type || row.chapter || row.exercise || row.status}
          <small>
            {#if row.type}Type: {row.type}{/if}
            {#if row.chapter && row.exercise} · Ch {row.chapter} · {row.exercise}{/if}
            {#if row.status} · {row.status}{/if}
          </small>
        {/if}
      </UCard>
    {/each}
  </div>
  
  <style>
    /* Mobile-first: stacked cards with wrap */
    .syllabus-layout {
      padding-left: 2%;
      padding-right: 2%;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-start;
    }
  </style>
  