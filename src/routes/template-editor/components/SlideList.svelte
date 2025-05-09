<script>
    export let slides = [];
    export let currentIndex = 0;
    export let setCurrent;
    export let moveUp;
    export let moveDown;
    export let deleteSlide;
  </script>
  
  <div class="sidebar">
    <h3>📑 Slides</h3>
  
    {#each slides as slide, i}
      <div class="slide-entry {i === currentIndex ? 'active' : ''}">
        <div on:click={() => setCurrent(i)}>{slide.name || `Slide ${i + 1}`}</div>
  
        {#if i === currentIndex}
          <div class="actions">
            <button on:click={() => moveUp(i)}>⬆️</button>
            <button on:click={() => moveDown(i)}>⬇️</button>
            <button on:click={() => deleteSlide(i)}>🗑️</button>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  
  <style>
    .sidebar {
      width: 180px;
      max-height: 80vh;
      overflow-y: auto;
      background: #1c1c1c;
      color: white;
      padding: 1rem;
      border-right: 1px solid #444;
    }
  
    h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: #ff8800;
    }
  
    .slide-entry {
      padding: 0.5rem;
      cursor: pointer;
      border-bottom: 1px solid #333;
    }
  
    .slide-entry.active {
      background: #333;
      font-weight: bold;
    }
  
    .actions {
      display: flex;
      gap: 0.3rem;
      margin-top: 0.3rem;
    }
  
    button {
      background: #ff8800;
      border: none;
      padding: 0.3rem;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 3px;
      color: #111;
    }
  </style>
  