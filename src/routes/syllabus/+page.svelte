<script>
  import Syllabus from '$lib/syllabusComp/Syllabus.svelte';
  import ChapterExDD from './ChapterExDD.svelte';
  import SyllabusCards from './SyllabusCards.svelte';
  export let data;

  // required props for <Syllabus />
  const { tcode, selected, synopsis, items } = data;

  // console.log("data" ,data);

  // Page-level filter state (start from loader selection)
  let chapter = selected?.chapter ?? '';
  let exercise = selected?.exercise ?? '';

  // Filter (reactive)
  $: filteredItems = items.filter(r =>
    (!chapter  || r.chapter  === chapter) &&
    (!exercise || r.exercise === exercise)
  );

  function onChange(e) {
    chapter = e.detail.chapter ?? '';
    exercise = e.detail.exercise ?? '';
    // If you want, also update the URL here later.
  }
  // optional: convenient spread object
  // $: syllabusProps = { tcode, selected, synopsis, items };
</script>


<!-- <div class="top"> -->
<div class="bg-red-800">

<ChapterExDD {synopsis} selected={{ chapter, exercise }} on:change={onChange} />

  <SyllabusCards items={items} />
  <!-- <Syllabus
  synopsis={synopsis}
  selected={selected}
  items={items}
  /> -->
</div>
<!-- </div> -->

<style>
  :global(body){
    background: var(--backgroundColor);
    color: var(--primaryText);
  }
 

</style>
