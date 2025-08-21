<script>
  import EqLines from "./EqLines.svelte";
  import EqSidebar from "./EqSidebar.svelte";

  export let data = [];
  export let currentTime = 0;

  // lines already have shape: { name: "line", showAt, content, type, spItems: [...] }
  $: lines = data.filter((item) => item.name === "line");

  $: activeLine = lines.findLast((l) => l.showAt <= currentTime);
  $: visibleSpItems = activeLine?.spItems ?? lines[0]?.spItems ?? [];
</script>

<link rel="stylesheet" href="/css/katex.min.css" />

<div class="eq-container">
  <div class="eq-left">
    <EqSidebar spItems={visibleSpItems} />    
  </div>

  <div class="eq-right">
    <EqLines {lines} {currentTime} />
  </div>
</div>

<style>
  .eq-container {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(148, 144, 165);
  }

  .eq-left {
    width: 70%;
    padding: 1rem;
    overflow-y: auto;
  }

  
  .eq-right {
    width: 30%;
    padding: 1rem;
    overflow-y: auto;
    border-left: 1px solid #e5e7eb; /* gray-200 */
    background-color: #1f2937; /* gray-800 */
    color: white;
  }
</style>
