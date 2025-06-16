<script>
    export let data;
  </script>
  
  <div class="corner-words">
    {#each data.words as word, i}
      <div class="word word-{i}">{word}</div>
    {/each}
  </div>
  
  <style>
    .corner-words {
      position: relative;
      height: 100vh;
      background-color: #111;
      color: white;
      font-family: sans-serif;
    }
  
    .word {
      position: absolute;
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    .word-0 { top: 20px; left: 20px; }
    .word-1 { top: 20px; right: 20px; }
    .word-2 { bottom: 20px; left: 20px; }
    .word-3 { bottom: 20px; right: 20px; }
  </style>
  