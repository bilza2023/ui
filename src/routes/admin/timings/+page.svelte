
<script lang="ts">
  import { onMount } from 'svelte';
  import { detectSoundById } from '$lib/services/soundServices.js';
  import { page } from '$app/stores';
  import PointerEditor from './PointerEditor.svelte';

  export let data;
  const { meta, deckRaw } = data;

  let deck: any = null;
  let deckLoaded = false;
  let error = '';

  let audio: HTMLAudioElement | null = null;
  let currentTime = 0;
  let soundUrl = '/sounds/default.opus';
  let soundExists = false;

  let deckDirty = false;

  // rAF clock
  const tick = () => {
    if (audio) currentTime = audio.currentTime;
    requestAnimationFrame(tick);
  };

  // slide timings
  function setSlideEnd(i: number) {
    if (!deck?.deck) return;
    const t = parseFloat(currentTime.toFixed(2));
    deck.deck[i].end = t;
    if (deck.deck[i + 1]) deck.deck[i + 1].start = t;
    deck = { ...deck };
    deckDirty = true;
  }
  function setSlideStart(i: number) {
    if (!deck?.deck || i === 0) return;
    const t = parseFloat(currentTime.toFixed(2));
    deck.deck[i - 1].end = t;
    deck.deck[i].start = t;
    deck = { ...deck };
    deckDirty = true;
  }

  // item timings
  function setShowAt(item: any) {
    item.showAt = parseFloat(currentTime.toFixed(1));
    deck = { ...deck };
    deckDirty = true;
  }
  function setShowAtZero(item: any) {
    item.showAt = 0;
    deck = { ...deck };
    deckDirty = true;
  }

  async function saveTimings(): Promise<boolean> {
    const id = $page.url.searchParams.get('id') ?? String(meta?.id ?? '');
    if (!id) {
      alert('❌ Save failed: missing id');
      return false;
    }
    try {
      const res = await fetch(`/admin/timings?id=${encodeURIComponent(id)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deck })
      });
      if (!res.ok) {
        let errMsg: string;
        try {
          const j = await res.json();
          errMsg = j?.error ?? JSON.stringify(j);
        } catch {
          errMsg = await res.text();
        }
        throw new Error(errMsg);
      }
      deckDirty = false;
      alert('✅ Save successful');
      return true;
    } catch (e: any) {
      alert(`❌ Save failed: ${e?.message || e}`);
      return false;
    }
  }

  async function saveAndDownload() {
    const ok = await saveTimings();
    if (ok) downloadTimings();
  }

  function downloadTimings() {
    const id = $page.url.searchParams.get('id') ?? String(meta?.id ?? 'deck');
    const blob = new Blob([JSON.stringify(deck, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deck-${id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handlePointerEdit() {
    deckDirty = true;
  }

  onMount(async () => {
    tick();

    // load deck from loader
    try {
      if (!deckRaw) throw new Error('Deck not found');
      deck = structuredClone(deckRaw);
      deckLoaded = true;
    } catch (e: any) {
      error = e?.message || 'Failed to load deck';
      return;
    }

    // detect audio like player does
    try {
      const idNum = Number(meta?.id ?? 0);
      const found = await detectSoundById(idNum);
      const url =
        typeof found === 'string'
          ? found
          : found?.url ?? found?.href ?? found?.src ?? '';
      if (url) {
        soundUrl = url;
        soundExists = true;
      }
    } catch {
      // keep defaults
    }
  });
</script>

<h1 style="width: 100%; border: 2px solid #facc15; border-radius: 0.375rem; text-align: center; font-size: 1.2rem; padding:6px; margin:2px; background-color: #0f4502">
  💡 Timing Page
</h1>

<div class="timing-actions" style="margin: 1rem 0;">
  <button on:click={saveTimings} class="btn">Save</button>
  <button on:click={saveAndDownload} class="btn" style="margin-left: 0.5rem;">Save and Download</button>
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

  <div class="time-display">Current Time: {currentTime.toFixed(2)}s</div>

  {#each deck.deck as slide, i}
    <div class="slide">
      <div class="slide-header">
        <strong>Slide {i + 1} — {slide.type}</strong>
        <button class="set-start" on:click={() => setSlideStart(i)} disabled={i === 0}>Set Start = Now</button>
      </div>

      {#if slide.type === 'pointerSlide'}
        <PointerEditor bind:slide {currentTime} on:edit={handlePointerEdit} />
      {/if}

      {#each slide.data as item}
        <div class="item">
          showAt:
          <input type="number" bind:value={item.showAt} step="0.0" />
          <button class="set-show-zero" on:click={() => setShowAtZero(item)}>ShowAt = 0</button>
          <button class="set-show" on:click={() => setShowAt(item)}>ShowAt = Now</button>
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
        <button class="set-end" on:click={() => setSlideEnd(i)}>Set End = Now</button>
      </div>
    </div>
  {/each}
{/if}

<style>
  :global(body){ background-color:#1f2937; color:#f3f4f6; }
  .audio-panel{ padding:1rem; }
  .time-display{ padding:0 1rem 1rem; font-size:.875rem; color:#a0aec0; }
  .slide{ padding:1rem; border-bottom:1px solid #374151; }
  .slide-header{ display:flex; justify-content:space-between; align-items:center; }
  .item{ padding-left:1.5rem; font-size:.875rem; color:#e5e7eb; margin-top:.5rem; }
  input[type="number"]{ width:4.5rem; background-color:#374151; color:#f3f4f6; border:none; padding:.25rem; border-radius:.25rem; text-align:right; }
  button{ margin-left:.5rem; padding:.25rem .5rem; border-radius:.25rem; background-color:#4a5568; color:#edf2f7; border:none; cursor:pointer; font-size:.75rem; }
  button:hover{ background-color:#2d3748; }
  button.set-start{ background-color:#6b7280; }
  button.set-start:disabled{ opacity:.5; cursor:not-allowed; }
  button.set-end{ background-color:#16a34a; }
  button.set-show{ background-color:#3b82f6; }
  button.set-show-zero{ background-color:#11038f; }
  .centered{ text-align:center; margin-top:2rem; }
  .error{ color:#e53e3e; text-align:center; margin-top:1rem; }
</style>
