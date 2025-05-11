
<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import AIBanner from "../../../lib/appComps/homepage/AIBanner.svelte";
  import AiCards from "./AiCards.svelte";
  import Dashboard from "./Dashboard.svelte";
  import AITrackTable from "./AITrackTable.svelte";
  import Footer from "./Footer.svelte";
  import Description from "./Description.svelte";
  import {dashboards,tableItems} from "./data.js";


  let selectedIndex = 0;

  const themes = [
    { bgColor: "#F3EFE7", accentColor: "#A2836E", themeClass: "theme-foundation" },
    {  bgColor: "#F5F0EA",accentColor: "#7B93A4",themeClass: "theme-system" },
    { bgColor: "#FDF3E7", accentColor: "#C4A77F", themeClass: "theme-business" }
  ];

  const descriptions = [
  "This track introduces you to the fundamentals of AI. You'll explore what AI is, how it's used, and how to interact with tools like ChatGPT. Ideal for those starting their AI journey with minimal prior exposure. Emphasis is on clarity, confidence, and creativity.",
  "Dive into system design and technical integration. This track walks you through building AI-powered apps, setting up APIs, and automating workflows. You'll understand how to think in systems and structure real software pipelines around AI tools.",
  "Learn how to monetize and scale your AI skills. This track covers service packaging, branding, customer journeys, and launching small digital businesses. You’ll move from learner to creator, offering value with AI in the real world."
];
</script>

<Nav />
<AIBanner />
<AiCards bind:selectedIndex />

  <div  >
    <Dashboard
      {...themes[selectedIndex]}
      dashboardItems={dashboards[selectedIndex]} />

      <Description text={descriptions[selectedIndex]} {...themes[selectedIndex]} />

    <AITrackTable
      {...themes[selectedIndex]}
      trackItems={tableItems[selectedIndex]} />
  </div>

<br><br>
<Footer />
