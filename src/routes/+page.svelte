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
  .main-section {
    width: 100%;
    /* background-color: #C1B294; */
    min-height: 100vh;
    border-radius: 20px;
  }
</style>