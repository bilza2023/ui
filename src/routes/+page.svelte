<script>
  import PageCategoryNav from '$lib/components/PageCategoryNav.svelte';
  import UCard from '$lib/components/UCard.svelte';

  export let data;
 
  const pageNav =data.pageNav;
  const questions = data.questions;

  let activeTop = 'videos';

  function setCat(newCat){
    activeTop = newCat.id;

  }
  // reactive filter
  $: filtered = questions.filter(q => q.category === activeTop);
</script>

<div class="PageCategoryNavWrapper">
  <PageCategoryNav items={pageNav} evt={setCat} size=40 active={activeTop} p/>

</div>

<section class="wrap">
  <h2 class="h">{activeTop.charAt(0).toUpperCase() + activeTop.slice(1)}</h2>
  <div class="cards">
    {#each filtered as row (row.category + '-' + row.id)}
      <UCard
        title={row.title}
        thumbnail={row.thumbnail}
        href={row.href}
      />
    {/each}
  </div>
</section>

<style>
  .PageCategoryNavWrapper {
    margin: 12px 2px;
  }
  .wrap { padding-left: 30px; padding-right: 30px; }
  .h { margin: 18px 0; font-size: 0.5rem; }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
</style>
