<!-- src/routes/notes/[filename]/+page.svelte -->
<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>
  import Nav from "$lib/appComps/Nav.svelte";
  export let data;                 // { filename, html }
</script>

<Nav/>

<main class="notes" data-filename={data.filename}>
  {@html data.html}
</main>
