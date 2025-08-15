<!-- +page.svelte -->
<script>
  import { onMount } from "svelte";
  import Nav from "$lib/appComps/Nav.svelte";
  import Footer from "$lib/appComps/Footer.svelte";
  import Sidebar from "$lib/appComps/homepage/Sidebar.svelte";
  import TcodeCard from "$lib/appComps/homepage/TcodeCard.svelte";
  import HomeIndex from "$lib/homeIndex/HomeIndex.svelte";
  import SecondaryNav from "$lib/SecondaryNav.svelte";
  import HomePageNotes from "$lib/homeIndex/HomePageNotes.svelte";
  import { getSubjectsIndex } from "$lib/services/syllabusServicer";

  let syllabus = [];
  onMount(async () => {
    syllabus = await getSubjectsIndex();
  });

  let navItems = ["Courses", "Videos", "Notes"];
  let pageDisplayState = 0;
</script>

<div class="page">
  <Nav />

  <div class="secondary-nav-container">
    <SecondaryNav
      items={navItems}
      bind:pageDisplayState={pageDisplayState}
      align="left"
    />
  </div>

  <section class="content-section">
    {#if pageDisplayState == 0}
      <TcodeCard tcodes={syllabus} />
    {:else if pageDisplayState == 1}
      <HomeIndex />
    {:else if pageDisplayState == 2}
      <HomePageNotes />
    {/if}

    <Sidebar />
  </section>

  <Footer />
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  .secondary-nav-container {
    padding-left: 5rem;
  }

  .content-section {
    width: 100%;
    padding: 2.5rem 3rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    min-height: 100vh;
    background-color: var(--color-surface);
  }

  @media (min-width: 768px) {
    .content-section {
      grid-template-columns: 3fr 1fr;
    }
  }
</style>
