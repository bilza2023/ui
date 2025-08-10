<script>
  import TaleemSlides from '../../../lib/taleemSlides/TaleemSlides.svelte';
  import NavBar from '../../../lib/taleemSlides/NavBar.svelte';

  let deck = [];
  let mounted = false;
  let currentTime = 0;
  let duration = 0;

  function computeDuration(slides = []) {
    const times = slides.map(s => s.end ?? 0);
    return Math.max(0, ...times);
  }

  function onSeek(val) {
    currentTime = Math.max(0, Math.min(duration, val));
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const obj = JSON.parse(event.target.result);
        deck = Array.isArray(obj) ? obj : (obj.slides ?? obj.deck ?? []);
        duration = computeDuration(deck) || 100;
        currentTime = 0;
        mounted = true;
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }
</script>


{#if mounted && deck.length}
  <TaleemSlides {deck} {currentTime} {duration} />
  <NavBar {currentTime} {duration} onSeek={onSeek}/>
{:else}
  <div class="flex items-center justify-center h-full">Load a deck file to start</div>
{/if}


<!-- Load Deck Button -->


<input type="file" accept=".json" on:change={handleFile} />

<style>
  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}
</style>
