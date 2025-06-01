
<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import Banner from "./Banner.svelte";
  import Footer from "./Footer.svelte";
  import ChapterCards from "./ChapterCards.svelte";
  import {chapters} from "./chapters.js";

  let selectedIndex = 0;



</script>

<Nav />
<Banner />



<div class="px-6 py-10">
  
  <!-- <h2 class="text-2xl font-bold mb-6 text-[#3d2e1e]">📚 FBISE Courses</h2> -->

  <div class="flex flex-wrap gap-4">
    {#each chapters as course}
      <ChapterCards {...course} />
    {/each}
  </div>
</div>

<br><br>
<Footer />
