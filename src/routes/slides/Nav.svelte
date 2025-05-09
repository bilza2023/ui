<script lang="ts">
    export let onNext: () => void;
    export let onPrev: () => void;
  </script>
  
  <nav>
    <div class="controls">
      <button on:click={onPrev} title="Previous Slide">⟵</button>
      <button on:click={onNext} title="Next Slide">⟶</button>
    </div>
  
    <div class="brand">
      taleem.help
    </div>
  </nav>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e1e1e;
      padding: 0.5rem 1rem;
      height: 60px;
      border-bottom: 1px solid #333;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
    }
  
    .controls {
      display: flex;
      gap: 0.5rem;
    }
  
    button {
      background: transparent;
      border: none;
      font-size: 1.25rem;
      color: #ccc;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      transition: background 0.2s, color 0.2s;
    }
  
    button:hover {
      background: #333;
      color: #ff8800;
    }
  
    .brand {
      color: #aaa;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  </style>
  