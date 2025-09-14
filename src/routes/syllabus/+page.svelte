<script>
  import Syllabus from '$lib/syllabusComp/Syllabus.svelte';
  export let data;

  // required props for <Syllabus />
  const { tcode, selected, synopsis, items } = data;

  // optional: convenient spread object
  // $: syllabusProps = { tcode, selected, synopsis, items };
</script>


<!-- <div class="top"> -->
<div class="bg-red-800">
  <Syllabus
  synopsis={synopsis}
  selected={selected}
  items={items}
/>
</div>
  <!-- </div> -->


<style>
  :global(body){
    background: var(--backgroundColor);
    color: var(--primaryText);
  }
 

</style>
