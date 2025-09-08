<script>
  import BulletsNav from '$lib/components/BulletsNav.svelte';
  import UQCard from '../lib/components/UQCard.svelte';
  
  export let data;
  // console.log("data" , data);

  // Route mapper for index entries
  const hrefFor = (row) => {
    if (!row?.slug) return '';
    if (row?.type === 'note') return `/notes?filename=${row.slug}`;
    if (row?.type === 'deck') return `/player?filename=${row.slug}`;
    if (row?.type === 'course') return `/syllabus?tcode=${row.slug}`;
    // unknown type → non-clickable
    return '';
  };

  // Chips mapper for UQCard
  const mapToBodyItems = (row) => [
    row?.category ? { label: 'category',     value: row.category } : null,
    row?.type     ? { label: 'questionType', value: row.type }     : null,
    row?.status   ? { label: 'status',       value: row.status }   : null
  ].filter(Boolean);

  
  $: questions = data?.questions ?? [];
  $: types = ["videos" , "blog","courses" ]

  let activeType = 'videos';

  function onSelect(e) {
    activeType = e.detail.type;
  }
 

  $: filtered = questions.filter(q => q.category === activeType);
</script>

<BulletsNav {types} on:select={onSelect} />

<div class="de">
  <!-- {#each filtered as q} -->
  <div class="cards">
    {#each filtered as row (row.id)}
      <UQCard
        title={row.title || row.slug}
        href={hrefFor(row) || undefined}  
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