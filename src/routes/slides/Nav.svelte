<script lang="ts">
    export let onNext: () => void;
    export let onPrev: () => void;
  </script>
  
  <header>
    <button on:click={onPrev}>⬅️ Prev</button>
    <button on:click={onNext}>Next ➡️</button>
  </header>
  
  <style>
    header {
      background: #1e1e1e;
      padding: 1rem;
      text-align: center;
      display: flex;
      justify-content: center;
      gap: 1rem;
      border-bottom: 1px solid #333;
    }
  
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background: #ff8800;
      border: none;
      border-radius: 4px;
      color: #111;
      cursor: pointer;
    }
  </style>
  