<script>
  export let data;
  const word1 = data.find(d => d.name === "word1")?.content ?? "";
  const word2 = data.find(d => d.name === "word2")?.content ?? "";
  const word3 = data.find(d => d.name === "word3")?.content ?? "";
  const word4 = data.find(d => d.name === "word4")?.content ?? "";
</script>

<div class="corner-words text-primary">
  <div class="top-left">{word1}</div>
  <div class="top-right">{word2}</div>
  <div class="bottom-left">{word3}</div>
  <div class="bottom-right">{word4}</div>
</div>

<style>
  .corner-words {
    position: relative;
    height: 100vh;
    font-size: 1.5rem;
    font-family: var(--fontBase);
  }

  .top-left     { position: absolute; top: 20px; left: 20px; }
  .top-right    { position: absolute; top: 20px; right: 20px; }
  .bottom-left  { position: absolute; bottom: 20px; left: 20px; }
  .bottom-right { position: absolute; bottom: 20px; right: 20px; }
</style>
