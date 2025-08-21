<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import PointerEditor from './PointerEditor.svelte';
  import Nav from '../../../lib/appComps/Nav.svelte';

  let deck: any = null;
  let deckLoaded = false;
  let error = '';

  let audio: HTMLAudioElement | null = null;
  let currentTime = 0;
  let soundUrl = '/sounds/default.opus';

  // continuously update currentTime
  const tick = () => {
    if (audio) currentTime = audio.currentTime;
    requestAnimationFrame(tick);
  };

  // Set end time of slide i
  function setSlideEnd(i: number) {
    if (!deck?.deck) return;
    const t = parseFloat(currentTime.toFixed(2));
    deck.deck[i].end = t;
    if (deck.deck[i + 1]) deck.deck[i + 1].start = t;
    deck = { ...deck };
  }

  // Set start time of slide i (and previous slide’s end)
  function setSlideStart(i: number) {
    if (!deck?.deck || i === 0) return;
    const t = parseFloat(currentTime.toFixed(2));
    deck.deck[i - 1].end = t;
    deck.deck[i].start = t;
    deck = { ...deck };
  }

  // Set showAt for a slide item
  function setShowAt(item: any) {
    item.showAt = parseFloat(currentTime.toFixed(1));
    deck = { ...deck };
  }
  function setShowAtZero(item: any) {
    item.showAt = 0;
    deck = { ...deck };
  }
  async function saveTimings(): Promise<boolean> {
    const filename = $page.url.searchParams.get('filename') ?? '';
    const res = await fetch(`/admin/timings?filename=${encodeURIComponent(filename)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deck)
    });

    if (!res.ok) {
      // try JSON, fallback to text
      let errMsg: string;
      try {
        const data = await res.json();
        errMsg = data.error ?? JSON.stringify(data);
      } catch {
        errMsg = await res.text();
      }
      alert(`❌ Save failed: ${errMsg}`);
      return false;
    }

    // on success we expect JSON { success: true }
    alert('✅ Save successful');
    return true;
  }

  async function saveAndDownload() {
    const ok = await saveTimings();
    if (ok) {
      // download only if save succeeded
      downloadTimings();
    }
  }

  function downloadTimings() {
    const filename = $page.url.searchParams.get('filename') ?? 'deck';
    const blob = new Blob([JSON.stringify(deck, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
 let deckDirty = false;
  function handlePointerEdit({ detail }) {
  // detail can include { action, itemIndex } if you chose to dispatch it
  deckDirty = true;
}

  let soundExists = false;
  onMount(async () => {
    tick();

    const filename = $page.url.searchParams.get('filename');
    if (!filename) {
      error = 'No filename provided';
      return;
    }

    // attempt to load audio from /sounds/<filename>.opus
    try {
      const head = await fetch(`/sounds/${filename}.opus`, { method: 'HEAD' });
      if (head.ok) {
        soundUrl = `/sounds/${filename}.opus`;
        soundExists = true;
      }
    } catch {
      // ignore, fallback stays
    }

    // fetch deck JSON from your server endpoint
    try {
      const res = await fetch(`/admin/timings?filename=${encodeURIComponent(filename)}`);
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || res.statusText);
      }
      deck = await res.json();
      deckLoaded = true;
    } catch (e) {
      error = (e as Error).message;
    }
  });
</script>

<Nav/>
<h1 style="width: 100%; border: 2px solid #facc15; border-radius: 0.375rem; text-align: center; font-size: 1.2rem; padding:6px; margin:2px; background-color: #0f4502">
  💡 Timing Page
</h1>

<div class="timing-actions" style="margin: 1rem 0;">
  <button on:click={saveTimings} class="btn">
    Save
  </button>
  <button
    on:click={saveAndDownload}
    class="btn"
    style="margin-left: 0.5rem;"
  >
    Save and Download
  </button>
</div>

{#if error}
  <p class="error">Error: {error}</p>
{:else if !deckLoaded}
  <p class="centered">Loading deck…</p>
{:else}
    {#if soundExists}
      <div class="audio-panel">
        <audio bind:this={audio} src={soundUrl} controls class="w-full"></audio>
      </div>
    {:else}
    <h1 style="width: 100%; border: 2px solid #facc15; border-radius: 0.375rem; text-align: center; font-size: 1.2rem; padding:6px; margin:2px; background-color: #0f4502">
      💡 Sound not found
    </h1>
    {/if}  

  <div class="time-display">
    Current Time: {currentTime.toFixed(2)}s
  </div>

  {#each deck.deck as slide, i}
    <div class="slide">
      <div class="slide-header">
        <strong>Slide {i + 1} — {slide.type}</strong>
        <button
          class="set-start"
          on:click={() => setSlideStart(i)}
          disabled={i === 0}
        >
          Set Start = Now
        </button>
      </div>

      {#if slide.type === 'pointerSlide'}
      <PointerEditor
        bind:slide         
        {currentTime}    
        on:edit={() => deckDirty = true} 
      />
     {/if}
      
      

      {#each slide.data as item}
        <div class="item">
          
          showAt:
          <input type="number" bind:value={item.showAt} step="0.0" />
          <button class=" set-show-zero" on:click={() => setShowAtZero(item)}>
            ShowAt = 0
          </button>
          <button class="set-show" on:click={() => setShowAt(item)}>
            ShowAt = Now
          </button>
          • {item.name || item.type}: "{item.content}" 
        </div>
      {/each}

      <div style="display: flex; align-items: center; margin-top: 0.5rem;">
        <label>
          Start:
          <input type="number" bind:value={slide.start} step="0.01" />
        </label>
        <label style="margin-left: 1rem;">
          End:
          <input type="number" bind:value={slide.end} step="0.01" />
        </label>
        <button class="set-end" on:click={() => setSlideEnd(i)}>
          Set End = Now
        </button>
      </div>


    </div>
  {/each}
{/if}



<style>
  :global(body) {
    background-color: #1f2937; /* gray-800 */
    color: #f3f4f6; /* gray-100 */
  }
  .audio-panel {
    padding: 1rem;
  }
  .time-display {
    padding: 0 1rem 1rem;
    font-size: 0.875rem;
    color: #a0aec0; /* gray-400 */
  }
  .slide {
    padding: 1rem;
    border-bottom: 1px solid #374151; /* gray-700 */
  }
  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item {
    padding-left: 1.5rem;
    font-size: 0.875rem;
    color: #e5e7eb; /* gray-200 */
    margin-top: 0.5rem;
  }
  input[type="number"] {
    width: 4.5rem;
    background-color: #374151;
    color: #f3f4f6;
    border: none;
    padding: 0.25rem;
    border-radius: 0.25rem;
    text-align: right;
  }
  button {
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #4a5568; /* gray-600 */
    color: #edf2f7;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
  }
  button:hover {
    background-color: #2d3748; /* gray-700 */
  }
  button.set-start {
    background-color: #6b7280; /* gray-500 */
  }
  button.set-start:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  button.set-end {
    background-color: #16a34a; /* green-600 */
  }
  button.set-show {
    background-color: #3b82f6; /* blue-500 */
  }
  button.set-show-zero {
    background-color: #11038f; /* blue-500 */
  }
  .centered {
    text-align: center;
    margin-top: 2rem;
  }
  .error {
    color: #e53e3e; /* red-600 */
    text-align: center;
    margin-top: 1rem;
  }
</style>
