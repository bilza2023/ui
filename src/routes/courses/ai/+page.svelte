
<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import AIBanner from "./AIBanner.svelte";
  import AiCards from "./AiCards.svelte";
  import Dashboard from "./Dashboard.svelte";
  import AITrackTable from "./AITrackTable.svelte";
  import Footer from "./Footer.svelte";
  import Description from "./Description.svelte";
  import {dashboards,tableItems} from "./data.js";
  import {descriptions} from "./descriptions.js";


  let selectedIndex = 0;

  const themes = [
    { bgColor: "#F3EFE7", accentColor: "#A2836E", themeClass: "theme-foundation" },
    {  bgColor: "#F5F0EA",accentColor: "#7B93A4",themeClass: "theme-system" },
    { bgColor: "#FDF3E7", accentColor: "#C4A77F", themeClass: "theme-business" }
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
