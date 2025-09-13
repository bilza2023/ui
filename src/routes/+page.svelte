<script>
  import BulletsNav from '$lib/components/BulletsNav.svelte';
  import UCard from '../lib/components/UCard.svelte';
  
  export let data;
  

  let showCourse = false;
  const tcodes = data.tcodes;
  console.log("tcodes===>" ,tcodes);
  
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
<button on:click={()=> showCourse = !showCourse}>Show Courses</button>
<BulletsNav {types} on:select={onSelect} />

{#if showCourse}
<!-- {#each filtered as q} -->
<div class="de">
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
  </div>
{:else}
<div class="de">
  <!-- {#each filtered as q} -->
  <div class="cards">
    {#each tcodes as row (row.id)}
      <UCard
        title={row.name}
        href={ row.href || undefined}  
        thumbnail={row.image}
        />
    {/each}
        <!-- bodyItems={mapToBodyItems(row)} -->
  </div>    
</div>
{/if}    

<!-- {/each} -->


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