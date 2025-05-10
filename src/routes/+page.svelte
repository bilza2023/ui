<script>
  import Nav from "../lib/appComps/Nav.svelte";  
  import FlexBoxCom from "../lib/appComps/FlexBoxCom.svelte";  
  import TaleemBanner from "../lib/appComps/TaleemBanner.svelte";  
  import Footer from "../lib/appComps/Footer.svelte";  
  import SubjectCard from "../lib/appComps/homepage/SubjectCard.svelte";  
  import SidebarCard from "../lib/appComps/homepage/SidebarCard.svelte";  

</script>

<div class="min-h-screen flex flex-col justify-between bg-[#d5c3ab]">

  <Nav />
<TaleemBanner />
  
<section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12">

  <!-- Left Column -->
  <div class="bg-[#f3e8d9] p-6 rounded-xl shadow-inner flex flex-col space-y-6">
    <SubjectCard />
    <SubjectCard />
    <SubjectCard />
  </div>

  <!-- Right Sidebar -->
  <div class="bg-[#ecdcc6] p-4 rounded-xl shadow flex flex-col space-y-4">
    <h4 class="text-lg font-bold text-[#3d2e1e] mb-2">📢 Updates & Insights</h4>
    <SidebarCard />
    <SidebarCard />
  </div>

</section>




  <!-- Footer -->

<Footer />  
</div>
