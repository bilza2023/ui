<script>
  import { onMount } from 'svelte';
  import Notes from '../../lib/notes/Notes.svelte';
  import Nav from "$lib/appComps/Nav.svelte";
  export let data;

  const { note, error } = data;

  // For now we just inspect the JSON in the console
  onMount(() => {
    if (note) {
      console.log('NOTE JSON 👉', note);
    } else {
      console.error('Note load error:', error);
    }
  });
</script>

<Nav/>

{#if data.error}
  <p style="color:red">{data.error}</p>
{:else}
<div class="notes_container">

  <Notes blocks={data.note.blocks} />
</div>
{/if}


<style>
  /* 1) Reset everything inside notes_container */
  .notes_container,
  .notes_container * {
    all: unset;
    box-sizing: border-box;
  }

  /* 2) Re-declare your container styles */
  .notes_container {
    display: block;                   /* reset from unset */
    width: 100%;
    margin: 0;
    background-color: #594112;
    padding: 5px 10%;
    min-height: 100vh;

    /* re-declare any inherited properties you need: */
    font-family: system-ui, sans-serif;
    color: white;
    line-height: 1.6;
  }
</style>
