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

  // 0=Courses, 1=Videos, 2=Notes (match your simple {#if pageDisplayState==0} …)
  let navItems = ["Courses", "Videos", "Notes"];
  let pageDisplayState = 0;
</script>

<div class="min-h-screen flex flex-col justify-start bg-[#594112]">
  <Nav />

  <div class="pl-20">
    <SecondaryNav
      items={navItems}
      bind:pageDisplayState={pageDisplayState}
      align="left"
    />
  </div>

  <section class="w-full px-12 py-10 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen">
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
