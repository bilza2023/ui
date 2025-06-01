
<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import Banner from "../comps/Banner.svelte";
  import Footer from "../../../lib/appComps/Footer.svelte";
  import ChapterCards from "../comps/ChapterCards.svelte";
  import {chapters} from "./chapters.js";

  let selectedIndex = 0;



</script>

<Nav />
<Banner 
title = "📘 Physics Class 9  (FBISE)"
content="  Taleem.Help’s Physics course for Class 9 follows the Federal Board syllabus in a smart, structured way. Each chapter is broken down into easy-to-understand slides, teacher-narrated video lectures, and exam-focused notes. We cover all key concepts — from motion and force to energy and heat — with solved numericals, quizzes, and practical examples. It’s designed to help students master Physics at their own pace, using modern tools."
/>



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
