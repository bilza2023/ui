<script>
  import { createEventDispatcher } from "svelte";

  /** PointerEditor – visual tool for adding/removing timed pointers
   *  Works only inside admin/timings on slides with type "pointerSlide".
   *  Supported shapes: "arrow" and "circle" (hard‑locked).
   */
  export let slide;
  export let currentTime = 0;

  const dispatch = createEventDispatcher();

  /* Toolbar presets (applied to the *next* pointer the user drops) */
  let defaults = {
    type: "arrow", // 'arrow' | 'circle'
    blink: false,
    wiggle: false,
  };

  /* derived helpers */
  $: imgItem = slide?.data?.find((d) => d.name === "image");
  $: imgUrl = imgItem?.content ?? imgItem?.image ?? imgItem?.imageUrl ?? null;
  $: pointerItems = slide?.data?.filter((d) => d.name === "pointer") ?? [];

  $: console.log("pointerItems", pointerItems);

  /* Utils */
  function toPercent(xPx, yPx, rect) {
    return {
      x: Math.round((xPx / rect.width) * 100),
      y: Math.round((yPx / rect.height) * 100),
    };
  }

  /* Add pointer on image click */
  function addPointer(evt) {
    if (!imgUrl) return;
    const rect = evt.currentTarget.getBoundingClientRect();
    const { x, y } = toPercent(
      evt.clientX - rect.left,
      evt.clientY - rect.top,
      rect
    );

    slide.data = [
      ...slide.data,
      {
        name: "pointer",
        x,
        y,
        showAt: Math.round(currentTime),
        hideAt: undefined,
        ...defaults, // type / blink / wiggle
      },
    ];
    dispatch("edit");
  }

  /* Remove pointer */
  function deletePointer(target) {
    slide.data = slide.data.filter((d) => d !== target);
    dispatch("edit");
  }

  /* Timing visibility */
  function isActive(item) {
    const from = item.showAt ?? slide.start;
    const to = item.hideAt ?? slide.end;
    return currentTime >= from && currentTime <= to;
  }
</script>

{#if imgUrl}
  <!-- wrapper -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="wrapper" on:click|stopPropagation={addPointer}>
    <img src={imgUrl} alt="slide" class="bg" />

    <div class="overlay">
      {#each pointerItems as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="pointer {item.type} {item.blink ? 'blink' : ''} {item.wiggle
            ? 'wiggle'
            : ''}"
          style="left:{item.x}% ; top:{item.y}% ; opacity:{isActive(item)
            ? 1
            : 0}"
        >
          {#if item.type === "circle"}
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /></svg>
          {:else}
            <svg viewBox="0 0 24 24"
              ><path
                d="M2 12l20 0M14 6l8 6-8 6"
                stroke-width="2"
                fill="none"
              /></svg
            >
          {/if}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="delete"
            on:click|stopPropagation={() => deletePointer(item)}>×</span
          >
        </div>
      {/each}
    </div>
  </div>

  <!-- toolbar -->
  <div class="toolbar">
    Type:
    <select bind:value={defaults.type}>
      <option value="arrow">Arrow</option>
      <option value="circle">Circle</option>
    </select>
    <label><input type="checkbox" bind:checked={defaults.blink} /> Blink</label>
    <label
      ><input type="checkbox" bind:checked={defaults.wiggle} /> Wiggle</label
    >
  </div>
{:else}
  <p class="text-sm italic text-gray-500">No image in this slide.</p>
{/if}

<!-- 👇 Add just below the toolbar -->
{#if pointerItems.length}
  <div class="pointer-list">
    {#each pointerItems as p, idx}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span class="pill" on:click={() => deletePointer(p)}>
        {idx + 1}. {p.type} ×
      </span>
    {/each}
  </div>
{/if}

<style>
  .pointer-list {
  margin: 0.25rem auto 0.75rem;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  background: #1c0c0c;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  cursor: pointer;
  user-select: none;
}

.pill:hover { background: #ffb4b4; }

  .wrapper {
    position: relative;
    max-width: 600px;
    margin: 1rem auto;
    cursor: crosshair;
  }
  .bg {
    display: block;
    width: 100%;
    height: auto;
    user-select: none;
  }
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .pointer {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    width: 24px;
    height: 24px;
  }
  .pointer svg {
    width: 100%;
    height: 100%;
    stroke: #ffda00;
  }
  .pointer.circle svg {
    fill: transparent;
    stroke-width: 3;
  }
  .pointer.arrow svg {
    fill: none;
    stroke-width: 3;
  }
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
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  .blink {
    animation: blink 0.8s step-start infinite;
  }
  @keyframes wiggle {
    0% {
      transform: translate(-50%, -50%) rotate(-5deg);
    }
    50% {
      transform: translate(-50%, -50%) rotate(5deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-5deg);
    }
  }
  .wiggle {
    animation: wiggle 0.4s ease-in-out infinite;
  }
  .toolbar {
    max-width: 600px;
    margin: 0.5rem auto 1rem;
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    align-items: center;
  }
  .toolbar select,
  .toolbar input {
    background-color: #1c0c0c;
    cursor: pointer;
  }
</style>
