<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import Nav from "$lib/appComps/Nav.svelte";
  import Sidebar from "$lib/appComps/homepage/Sidebar.svelte";
  import TcodeCard from "$lib/homeIndex/TcodeCard.svelte";
  import HomeIndex from "$lib/homeIndex/HomeIndex.svelte";
  import SecondaryNav from "$lib/SecondaryNav.svelte";
 
  import { listTcodes } from "../lib/services/synopsisServices";
  export let data;
  let syllabus = [];
  onMount(() => {

    syllabus = listTcodes(); // [{ tcodeName, description, image }]
  });

  let pageDisplayState = 0;
</script>


<Nav />
<div class="page">

  <div >
    <SecondaryNav
      items={["Videos" , "Courses"]}
      bind:pageDisplayState={pageDisplayState}
    />
  </div>

  <section class="main-section">
    {#if pageDisplayState == 0}
    <HomeIndex {data}/>
    <br>
    <br>
    {:else if pageDisplayState == 1}
    <TcodeCard tcodes={syllabus} />
    {/if}

    <!-- // DO NOT DELETE -->
    <!-- <Sidebar /> -->
  </section>

</div>

<style>
  /* Page shell */
  .page {
    max-width: 2500px;
    margin-inline: auto;
  }

  /* Main content panel */
  .main-section {
    width: 100%;
    min-height: 60vh;

    /* Just use surfaceColor directly — avoids mismatch with border */
    background: var(--surfaceColor);
    color: var(--primaryText);

    border: 1px solid var(--borderColor);
    border-radius: 16px;

    padding: clamp(12px, 2vw, 24px);
    box-shadow:
      0 1px 1px rgba(0,0,0,.04),
      0 4px 14px rgba(0,0,0,.08);
  }

  .main-section > * + * {
    margin-top: clamp(12px, 2vw, 24px);
  }
</style>
