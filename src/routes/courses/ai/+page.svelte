<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import AIBanner from "../../../lib/appComps/homepage/AIBanner.svelte";
  import AiCards from "./AiCards.svelte";
  import Dashboard from "./Dashboard.svelte";
  import AITrackTable from "./AITrackTable.svelte";
  import Footer from "./Footer.svelte";

  let selectedIndex = 0;
  const themes = [
  { bgColor: "#F3EFE7", accentColor: "#A2836E", themeClass: "theme-foundation" },
  { bgColor: "#EDF4F7", accentColor: "#6B99B4", themeClass: "theme-system" },
  { bgColor: "#FDF3E7", accentColor: "#C4A77F", themeClass: "theme-business" }
];


</script>

<Nav />
<AIBanner />
<AiCards bind:selectedIndex />

<!-- Dashboard Area -->
{#if selectedIndex === 0}
  <Dashboard {...themes[0]} />
  <AITrackTable {...themes[0]} />
{:else if selectedIndex === 1}
  <Dashboard {...themes[1]} />
  <AITrackTable {...themes[1]} />
{:else}
  <Dashboard {...themes[2]} />
  <AITrackTable {...themes[2]} />
{/if}

<br>
<br>
<Footer />