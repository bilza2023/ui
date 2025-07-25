<script>
  import { createEventDispatcher } from 'svelte';

  /**
   * PointerEditor – visual editor for `pointerSlide` items on the Timings page.
   *
   * Props:
   *   slide        → the full slide object (expects data[] array)
   *   currentTime  → global playback clock (seconds)
   *
   * Behaviour:
   *   • Click on the image to drop a pointer using the current toolbar presets.
   *   • Each pointer icon shows delete "×" badge to remove it.
   *   • Emits a bare `edit` event on any mutation so parent can set deckDirty.
   */
  export let slide;
  export let currentTime = 0;

  const dispatch = createEventDispatcher();

  /* ── reactive look‑ups ─────────────────────────────────────────────── */
  $: imgItem = slide?.data?.find((d) => d.name === 'image');
  $: imgUrl  = imgItem?.content || imgItem?.image || imgItem?.imageUrl || null;
  $: pointerItems = slide?.data?.filter((d) => d.name === 'pointer') ?? [];

  /* ── toolbar presets for new pointers ─────────────────────────────── */
  let defaults = {
    type:   'arrow',   // 'arrow' | 'circle'
    blink:  false,
    wiggle: false
  };

  /* ── helpers ───────────────────────────────────────────────────────── */
  function toPercent(xPx, yPx, rect) {
    return {
      x: Math.round((xPx / rect.width)  * 100),
      y: Math.round((yPx / rect.height) * 100)
    };
  }

  function addPointer(evt) {
    if (!imgUrl) return;
    const rect = evt.currentTarget.getBoundingClientRect();
    const pct  = toPercent(evt.clientX - rect.left, evt.clientY - rect.top, rect);

    const newItem = {
      name:   'pointer',
      ...defaults,               // use toolbar presets
      x:      pct.x,
      y:      pct.y,
      showAt: Math.round(currentTime)
    };

    slide.data = [...slide.data, newItem];
    dispatch('edit');
  }

  function deletePointer(target) {
    slide.data = slide.data.filter((d) => d !== target);
    dispatch('edit');
  }

  function isActive(item) {
    const from = item.showAt ?? slide.start;
    const to   = item.hideAt ?? slide.end;
    return currentTime >= from && currentTime <= to;
  }
</script>

{#if imgUrl}
  <!-- Wrapper captures clicks for new pointers -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="wrapper" on:click|stopPropagation={addPointer}>
    <img src={imgUrl} alt="slide background" />

    <!-- Pointer overlay -->
    <div class="overlay">
      {#each pointerItems as item}
        <div
          class="pointer {item.type} {item.blink ? 'blink' : ''} {item.wiggle ? 'wiggle' : ''}"
          style="left:{item.x}%; top:{item.y}%; opacity:{isActive(item) ? 1 : 0};">

          {#if item.type === 'circle'}
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>
          {:else}
            <svg viewBox="0 0 24 24"><path d="M2 12h20M14 6l8 6-8 6"/></svg>
          {/if}

          <!-- delete badge -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span class="delete" on:click|stopPropagation={() => deletePointer(item)}>×</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Toolbar presets -->
  <div class="pointer-toolbar">
    <label>Type:
      <select bind:value={defaults.type}>
        <option value="arrow">Arrow</option>
        <option value="circle">Circle</option>
      </select>
    </label>

    <label><input type="checkbox" bind:checked={defaults.blink}> Blink</label>
    <label><input type="checkbox" bind:checked={defaults.wiggle}> Wiggle</label>
  </div>
{:else}
  <p class="text-sm italic text-gray-500">No image found in this slide.</p>
{/if}

<style>
  /* Image wrapper */
  .wrapper {
    position: relative;
    max-width: 600px;
    margin: 1rem auto;
    cursor: crosshair;
  }
  .wrapper img {
    display: block;
    width: 100%;
    height: auto;
  }
  /* Overlay container */
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  /* Pointer icon */
  .pointer {
    position: absolute;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);
    pointer-events: auto; /* allow delete click */
  }
  .pointer.circle svg {
    fill: #ffda00;
    stroke: #000;
    stroke-width: 2;
  }
  .pointer.arrow svg {
    fill: none;
    stroke: #ffda00;
    stroke-width: 3;
  }
  /* blink */
  @keyframes blink { 0%{opacity:1} 50%{opacity:0} 100%{opacity:1} }
  .blink { animation: blink 1s infinite; }

  /* wiggle */
  @keyframes wiggle { 0%{transform:translate(-50%,-50%) rotate(-5deg);} 50%{transform:translate(-50%,-50%) rotate(5deg);} 100%{transform:translate(-50%,-50%) rotate(-5deg);} }
  .wiggle { animation: wiggle 0.6s infinite; }

  /* delete badge */
  .delete {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #c00;
    color: #fff;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    cursor: pointer;
  }

  /* toolbar */
  .pointer-toolbar {
    margin: 0.5rem auto 1rem;
    max-width: 600px;
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    justify-content: center;
  }
  .pointer-toolbar label { display: flex; align-items: center; gap: 0.25rem; }
  .pointer-toolbar select { padding: 2px 6px; }
</style>
