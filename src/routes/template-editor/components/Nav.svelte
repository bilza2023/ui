
<script>
    export let toggleSidebar;
    export let toggleUpperEditor;
    export let toggleLowerEditor;
    export let toggleTemplateForm;
    export let loadFromFile;
    export let saveToFile;
    export let setCanvasScale;
  
    let scaleOptions = [1, 0.75, 0.5];
  </script>
  
  <nav class="nav-bar">
    <button on:click={toggleSidebar}>📚 Slides</button>
    <button on:click={toggleUpperEditor}>🧠 Code</button>
    <button on:click={toggleLowerEditor}>📄 JSON</button>
    <button on:click={toggleTemplateForm}>🎨 Templates</button>
    <button on:click={loadFromFile}>📂 Load</button>
    <button on:click={saveToFile}>💾 Save</button>
  
    {#each scaleOptions as scale}
      <button on:click={() => setCanvasScale(scale)}>{Math.round(scale * 100)}%</button>
    {/each}
  </nav>
  
  <style>
    .nav-bar {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      background: #1e1e1e;
      border-bottom: 1px solid #333;
      flex-wrap: wrap;
    }
  
    button {
      background: #444;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background: #ff8800;
      color: #000;
    }
  </style>
  