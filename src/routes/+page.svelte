<script>
  import BulletsNav from '$lib/components/BulletsNav.svelte';
  import UCard from '../lib/components/UCard.svelte';
  
  export let data;
  
  // Chips mapper for UQCard
  const mapToBodyItems = (row) => [
    row?.category ? { label: 'category',     value: row.category } : null,
    row?.type     ? { label: 'questionType', value: row.type }     : null,
    row?.status   ? { label: 'status',       value: row.status }   : null
  ].filter(Boolean);

  
  $: questions = data?.questions ?? [];
  $: types = ["videos" , "blog","courses" ]

  let activeCategory = 'videos';

  function onSelect(e) {
    activeCategory = e.detail.type;
  }
 

  $: filtered = questions.filter(q => q.homeCategory === activeCategory);
  // $: filtered = questions;
  console.log("data" , data);

</script>

<BulletsNav {types} on:select={onSelect} />

<div class="de">
  <!-- {#each filtered as q} -->
  <div class="cards">
    {#each filtered as row (row.id)}
      <UCard
        title={row.title || row.slug}
        href={ row.href || undefined}  
        thumbnail={row.thumbnail}
        bodyItems={mapToBodyItems(row)}
      />
    {/each}
  </div>
    

<!-- {/each} -->
</div>


<style>
    .cards{
      display:grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap:16px;
    }
  .de {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>