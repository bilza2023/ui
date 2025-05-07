<script>
  import Nav from "../lib/appComps/Nav.svelte";  
  import FlexBoxCom from "../lib/appComps/FlexBoxCom.svelte";  
</script>

<div class="min-h-screen flex flex-col justify-between bg-[#d5c3ab]">

  <!-- Navigation -->
  <Nav />

  <!-- Slogan strip -->
  <section class="w-full bg-[#ecdcc6]/90 px-6 py-3 shadow-sm">
    <div class="flex items-baseline space-x-2">
      <h1 class="text-xl font-bold text-gray-800 tracking-tight">taleem.help</h1>
      <p class="text-sm text-gray-700 font-light leading-snug">Education for Every Pakistani</p>
    </div>
  </section>

  <!-- Main content -->
  <main class="flex-grow flex justify-center items-start py-8">
    <FlexBoxCom />
  </main>

  <!-- Footer -->
  <footer class="text-center text-sm text-gray-700 py-6 border-t border-[#c8b59e] bg-[#ecdcc6]">
    © 2025 Taleem.help — Built with ❤️ in Islamabad
  </footer>
</div>
