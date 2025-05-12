
<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import ITBanner from "./ITBanner.svelte";
  import Footer from "./Footer.svelte";
  import FbiseCard from "./FbiseCard.svelte";
  
  let selectedIndex = 0;
  const fbiseCourses = [
  {
    title: "Math - Class 9",
    description: "Full course for Federal Board with notes, quizzes, and videos.",
    price: "Rs 18000",
    period: "2 months",
    icon: "📐",
    dim: false
  },
  {
    title: "Physics - Class 9",
    description: "Chapter-wise lessons and exam preparation.",
    price: "Rs 18000",
    period: "2 months",
    icon: "🧲",
    dim: false
  },
  {
    title: "English - Class 9",
    description: "Grammar, comprehension, and writing practice.",
    price: "Rs 18000",
    period: "2 months",
    icon: "📘",
    dim: false
  },
  {
  title: "Computer Science - Class 9",
  description: "Basics of computing, software, hardware, and IT skills.",
  price: "Rs 8000",
  period: "1 months",
  icon: "💻",
  dim: false
},
  {
    title: "Biology - Coming Soon",
    description: "Coming soon — Stay tuned!",
    price: "",
    period: "",
    icon: "🧬",
    dim: true
  },
  {
    title: "Chemistry - Coming Soon",
    description: "Launching shortly.",
    price: "",
    period: "",
    icon: "⚗️",
    dim: true
  }
];

</script>

<Nav />
<ITBanner />



<div class="px-6 py-10">
  <h2 class="text-2xl font-bold mb-6 text-[#3d2e1e]">📚 FBISE Courses</h2>
  <div class="flex flex-wrap gap-4">
    {#each fbiseCourses as course}
      <FbiseCard {...course} />
    {/each}
  </div>
</div>

<br><br>
<Footer />
