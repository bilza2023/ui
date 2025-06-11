<script>
  import Nav from "../lib/appComps/Nav.svelte";  
  import FlexBoxCom from "../lib/appComps/FlexBoxCom.svelte";  
  import TaleemBanner from "../lib/appComps/TaleemBanner.svelte";  
  import Footer from "../lib/appComps/Footer.svelte";  
  import SubjectCard from "../lib/appComps/homepage/SubjectCard.svelte";  
  import SidebarCard from "../lib/appComps/homepage/SidebarCard.svelte";  
  import TcodeCard from "../lib/appComps/homepage/TcodeCard.svelte";

  import fbise10physics from "../lib/syllabusData/fbise10physics";  
  import fbise9physics from "../lib/syllabusData/fbise9physics.js";  
  // import fbise9math from "../lib/syllabusData/fbise9math";  

</script>
<div class="min-h-screen flex flex-col justify-start bg-[#160c00]">

  <Nav />
<!-- <TaleemBanner /> -->
  
<section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen">

  <!-- Left Column -->
  <div class={` p-6 rounded-xl shadow-inner flex flex-col space-y-6 border-2 border-[#93754b]  `}>
    
    <TcodeCard
    tcodes={[
      fbise9physics,
      fbise10physics,
      // fbise9math
    ]}
  />
  

  </div>

  <!-- Right Sidebar -->
  <div class={` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white`}>
    <h4 class="text-lg font-bold  mb-2 text-white">📢 Updates & Insights</h4>
    <SidebarCard />
    <SidebarCard />
  </div>

</section>




  <!-- Footer -->

<Footer />  
</div>
