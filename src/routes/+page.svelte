<script>
    import {onMount} from "svelte";
    import Nav from "$lib/appComps/Nav.svelte";
    import Footer from "$lib/appComps/Footer.svelte";
    import Sidebar from "$lib/appComps/homepage/Sidebar.svelte";
    import TcodeCard from "../lib/appComps/homepage/TcodeCard.svelte";
    import VideosCard from "../lib/appComps/homepage/VideosCard.svelte";
    import HomeIndex from "../lib/homeIndex/HomeIndex.svelte";
   
    let showCourses = false;
    let syllabus = [];

    import { getSubjectsIndex } from '../lib/services/syllabusServicer';

onMount(async () => {
  syllabus = await getSubjectsIndex();
});

  
  </script>
  
  <div class="min-h-screen flex flex-col justify-start bg-[#594112]">
    <Nav />
  
    <!-- <BetaWarning /> -->
  <div>
    <button 
    class="bg-[#C4A77F] text-[#0e3d0c] p-1 m-1 rounded-md "
    on:click={()=> showCourses = !showCourses}>Courses/Videos</button>
  </div>


<section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen">


  {#if showCourses}
        <TcodeCard tcodes={syllabus} />
        {:else}    
        <!-- <VideosCard />     -->
        <HomeIndex />    

        {/if}    
      <Sidebar/>
 </section>
  
    <Footer />
  </div>
  