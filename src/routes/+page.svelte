<script>
    import Nav from "../lib/appComps/Nav.svelte";  
    import FlexBoxCom from "../lib/appComps/FlexBoxCom.svelte";  
  </script>
  
  <div class="min-h-screen h-full bg-[#cbad84]">
    <!-- dbc6ab -->
    <Nav />
  
    <!-- Slogan strip -->
    <section class="w-full bg-[#ecdcc6]/90 px-6 py-3 shadow-sm">
      <div class="flex items-baseline space-x-2">
        <h1 class="text-xl font-bold text-gray-800 tracking-tight">taleem.help</h1>
        <p class="text-sm text-gray-700 font-light leading-snug">Education for Every Pakistani</p>
      </div>
    </section>
  
    <!-- IT/AI Courses -->
    <div class="w-full flex justify-center">
        <FlexBoxCom />
      </div>
      
  

  </div> <!-- 👈 this was too early before -->
  