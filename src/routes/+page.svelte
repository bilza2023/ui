<script>
  import BulletsNav from "$lib/components/BulletsNav.svelte";
  import UCard from "../lib/components/UCard.svelte";
  import RoundToggle from "../lib/components/RoundToggle.svelte";

  export let data;

  let showCourse = false;
  const tcodes = data.tcodes;
  console.log("tcodes===>", tcodes);

  // Chips mapper for UQCard
  const mapToBodyItems = (row) =>
    [
      row?.category ? { label: "category", value: row.category } : null,
      row?.type ? { label: "questionType", value: row.type } : null,
      row?.status ? { label: "status", value: row.status } : null,
    ].filter(Boolean);

  $: questions = data?.questions ?? [];
  $: types = ["videos", "blog"];

  let activeCategory = "videos";

  function onSelect(e) {
    activeCategory = e.detail.type;
  }

  $: filtered = questions.filter((q) => q.homeCategory === activeCategory);
  // $: filtered = questions;
  // console.log("data" , data);
</script>

<!-- {#each filtered as q} -->
<div class="wrapper">


  <RoundToggle
    label={showCourse ? "Courses" : "Samples"}
    icon={showCourse ? '📚' : '🎨'}
    size={54}
    bind:checked={showCourse}
  />


  {#if showCourse}
    <!-- {#each filtered as q} -->
    <!-- <button class="courese-btn" on:click={()=> showCourse = !showCourse}>🚀</button>   -->
    <div class="cards">
      {#each tcodes as row (row.id)}
      <a href={`/syllabus?tcode=${row.slug}`}>
        <UCard
          title={row.name}
          href={row.href || undefined}
          thumbnail={row.image}
        />
        </a>
      {/each}
      <!-- bodyItems={mapToBodyItems(row)} -->
    </div>
  {:else}
    <!-- <button class="courese-btn" on:click={()=> showCourse = !showCourse}>🎨</button> -->
    <BulletsNav {types} on:select={onSelect} />
    <div class="cards">
      {#each filtered as row (row.id)}
        <UCard
          title={row.title || row.slug}
          href={row.href || undefined}
          thumbnail={row.thumbnail}
          bodyItems={mapToBodyItems(row)}
        />
      {/each}
    </div>
  {/if}
</div>

<!-- {/each} -->

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
  .wrapper {
    padding-left: 30px;
    padding-right: 30px;
  }

</style>
