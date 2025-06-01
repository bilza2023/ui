<script>
  import Nav from "../../../../lib/appComps/Nav.svelte";
  import Banner from "../../comps/Banner.svelte";
  import Footer from "../../../../lib/appComps/Footer.svelte";
  import ChapterCards from "../../comps/ChapterCards.svelte";
  import { lessons } from "./lessons.js";
  import PresentationCard from "../../comps/PresentationCard.svelte";
</script>

<Nav />
<Banner
  title="🏃 Chapter 1: Physical Quantities and Measurement"
  content="This chapter introduces the foundational concepts of physical quantities, units, and measurements. Students will learn about base and derived quantities, the International System of Units (SI), scientific notation, prefixes, and the use of measuring instruments like the vernier caliper and screw gauge. The chapter also covers error types and significant figures — essential skills for all future physics topics."
/>

<div class="px-6 py-10">
  <!-- <h2 class="text-2xl font-bold mb-6 text-[#3d2e1e]">📚 FBISE Courses</h2> -->

  <div class="flex flex-wrap gap-4">
    {#each lessons as course}
      <PresentationCard {...course} />
    {/each}
  </div>
</div>

<br /><br />
<Footer />
