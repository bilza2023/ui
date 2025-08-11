<svelte:head>
  <script type="module" src="/components/taleem-slides/taleem-slides.js"></script>
</svelte:head>

<script>
  import NavBar from '../../../lib/taleemSlides/NavBar.svelte';

  let deck = [];
  let mounted = false;
  let currentTime = 0;
  let duration = 0;

  // reference to the CE
  let slidesEl;

  function computeDuration(slides = []) {
    const times = slides.map(s => (s.end != null ? s.end : 0)); // avoid ??
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
        // avoid ?? and optional chaining to be safe
        const arr = Array.isArray(obj) ? obj : ((obj && obj.slides) ? obj.slides : (obj && obj.deck) ? obj.deck : []);
        deck = arr;
        duration = computeDuration(deck) || 100; // NavBar only
        currentTime = 0;
        mounted = true;
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }

  // push props into the CE whenever they change
  $: if (slidesEl) slidesEl.deck = deck;
  $: if (slidesEl) slidesEl.currentTime = currentTime;
</script>

{#if mounted && deck.length}
  <!-- USE THE WEB COMPONENT, not the Svelte component -->
  <taleem-slides bind:this={slidesEl}></taleem-slides>

  <NavBar {currentTime} {duration} onSeek={onSeek}/>
{:else}
  <div class="flex items-center justify-center h-full">Load a deck file to start</div>
{/if}

<input type="file" accept=".json" on:change={handleFile} />

<style>
  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}
  taleem-slides{display:block;width:100%;height:100vh}
</style>
