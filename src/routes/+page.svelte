<script>
    import {onMount} from "svelte";
    import Nav from "$lib/appComps/Nav.svelte";
    import Footer from "$lib/appComps/Footer.svelte";
    import SidebarCard from "$lib/appComps/homepage/SidebarCard.svelte";
    import TcodeCard from "../lib/appComps/homepage/TcodeCard.svelte";
    import BetaWarning from "$lib/appComps/BetaWarning.svelte";
  
    // import { syllabus } from "../lib/syllabus/syllabus";
    // import syllabus from '/data/syllabus.json';
    // console.log("syllabus", syllabus);
    let syllabus = [];
  
  onMount(async () => {
    const res = await fetch('/data/syllabus.json');
    syllabus = await res.json();
  });
  
  </script>
  
  <div class="min-h-screen flex flex-col justify-start bg-[#392908]">
    <Nav />
  
    <!-- <BetaWarning /> -->
  
    <section
      class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen"
    >
      <!-- Left Column -->
      <div
        class={` p-6 rounded-xl shadow-inner flex flex-col space-y-6 border-2 border-[#93754b]  `}
      >
        <!-- <TcodeCard tcodes={getAllTcodes()} /> -->
        <TcodeCard tcodes={syllabus} />
      </div>
  
      <!-- Right Sidebar -->
      <div
        class={` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white`}
      >
        <h4 class="text-lg font-bold mb-2 text-white">📢 Updates & Insights</h4>
  
        <SidebarCard
          icon="🚀"
          title="Be Part of AI Revolution"
          details="World is entering into a new era. This is a time to act for Pakistani Students. AI bring new oppertunities."
          url="/blog/be-part-of-ai-revolution.html"
        />
  
        <SidebarCard
          icon="📜"
          title="AI Foundation Track"
          details="Introducing AI Foundation Track - Taleem.Help. In the current economic conditions AI is a new form of business and earning."
          url="/blog/ai-foundation-track-brochure.html"
        />
  
        <SidebarCard
          icon="👨‍🎓"
          title="Future in AI Era for Pakistani Students"
          details="A brief blog post about some of the steps suggested for Pakistani Students"
          .
          url="/blog/future-in-the-ai-era-for--pakistani-students.html"
        />
  
        <SidebarCard
          icon="🌳"
          title="Brief: Pakistani IT Industry 2025"
          details="A snap shot of Pakistani IT industray in 2025. Some of the Top Earners and the Industrial sectors they target"
          .
          url="blog/backend-servies-presentation/pakistani-it-industry-overview.html"
        />
      </div>
    </section>
  
    <Footer />
  </div>
  