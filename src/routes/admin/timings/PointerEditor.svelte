<script>
  import { createEventDispatcher, onMount } from 'svelte';

  /**
   * PointerEditor – lets the author drop pointer items visually while tuning timings.
   *
   * Props (all are two‑way bound from Timings page):
   *   @prop {object}  slide        – the slide object (`type === "pointerSlide"`)
   *   @prop {number}  currentTime  – global playback clock (seconds)
   *
   * The component mutates `slide.data` directly and emits a bare `edit` event
   * whenever the list changes, so the parent can flip its `deckDirty` flag.
   */
  export let slide;
  export let currentTime = 0;

  const dispatch = createEventDispatcher();

  /* ─────────────── helpers ────────────────────────────────────────────── */

  // Extract background image (first item named "image")
  $: imgItem = slide?.data?.find((d) => d.name === 'image');
  $: imgUrl  = imgItem?.content || imgItem?.image || imgItem?.imageUrl || null;

  // Pointer items in this slide
  $: pointerItems = slide?.data?.filter((d) => d.name === 'pointer') ?? [];

  // Convert click position (pixels) → percentage coordinates (0‑100)
  function toPercent(xPx, yPx, rect) {
    return {
      x: Math.round((xPx / rect.width)  * 100),
      y: Math.round((yPx / rect.height) * 100)
    };
  }

  /* ─────────────── add / remove API ───────────────────────────────────── */

  function addPointer(evt) {
    // Ignore if no slide image
    if (!imgUrl) return;

    const rect = evt.currentTarget.getBoundingClientRect();
    const pct  = toPercent(evt.clientX - rect.left, evt.clientY - rect.top, rect);

    const newItem = {
      name:   'pointer',
      type:   'arrow',
      x:      pct.x,
      y:      pct.y,
      showAt: Math.round(currentTime),
      // optional flags default false
      blink:  false,
      wiggle: false
    };

    slide.data = [...slide.data, newItem];  // trigger reactivity
    dispatch('edit');                       // notify parent
  }

  function deletePointer(idx) {
    slide.data = slide.data.filter((d, i) => {
      if (d.name !== 'pointer') return true; // keep non‑pointers
      return i !== idx;                       // remove by absolute index
    });
    dispatch('edit');
  }

  /* ─────────────── pointer visibility test ───────────────────────────── */
  function isActive(item) {
    const from = item.showAt ?? slide.start;
    const to   = item.hideAt ?? slide.end;
    return currentTime >= from && currentTime <= to;
  }
</script>

{#if imgUrl}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="wrapper" on:click|stopPropagation={addPointer}>
    <!-- Background image -->
    <img src={imgUrl} alt="slide background" class="block w-full h-auto select-none" />

    <!-- Overlay pointers -->
    <div class="overlay">
      {#each pointerItems as item, idx}
        <div
          class="pointer {item.type} {item.blink ? 'blink' : ''} {item.wiggle ? 'wiggle' : ''}"
          style="left: {item.x}%; top: {item.y}%; opacity: {isActive(item) ? 1 : 0};"
        >
          <!-- icon svg -->
          {#if item.type === 'circle'}
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>
          {:else}
            <!-- default arrow -->
            <svg viewBox="0 0 24 24"><path d="M2 12h20M14 6l8 6-8 6"/></svg>
          {/if}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span class="delete" on:click|stopPropagation={() => deletePointer(idx)}>×</span>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p class="text-sm italic text-gray-500">No image found in this slide.</p>
{/if}



<style>
  .wrapper {
    position: relative;
    max-width: 100%;
    cursor: crosshair;
  }
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none; /* so clicks pass through to wrapper for add */
  }
  .pointer {
    position: absolute;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);
    pointer-events: auto; /* re‑enable on the icon for delete click */
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
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  .blink { animation: blink 1s infinite; }

  /* wiggle */
  @keyframes wiggle {
    0% { transform: translate(-50%, -50%) rotate(-5deg); }
    50% { transform: translate(-50%, -50%) rotate(5deg);  }
    100%{ transform: translate(-50%, -50%) rotate(-5deg); }
  }
  .wiggle { animation: wiggle 0.6s infinite; }

  /* delete × */
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
  img { max-width: 600px; margin: 1rem auto; display: block; }

</style>