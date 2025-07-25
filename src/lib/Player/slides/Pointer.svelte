<script>
  import { onMount } from 'svelte';

  /* incoming props */
  export let data = [];
  export let currentTime = 0;

  /* grab image path */
  $: bgUrl = (() => {
    const img = data.find(
      (d) => d.name === 'image' || d.name === 'background'
    );
    return img?.content ?? img?.image ?? img?.imageUrl ?? null;
  })();

  /* pointer metadata */
  $: allPointers = data
    .filter((d) => d.name === 'pointer')
    .map((p) => ({ ...p, hideAt: p.hideAt ?? Number.POSITIVE_INFINITY }));

  /* visible pointers for this moment */
  $: visiblePointers = allPointers.filter(
    (p) => currentTime >= p.showAt && currentTime < p.hideAt
  );


</script>

<div class="slide-outer">
  <div class="wrapper">
    {#if bgUrl}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img  class="bg" src={bgUrl} alt="slide image" />
    {/if}

    {#each visiblePointers as p}
      <div
        class={`pointer ${p.type ?? 'circle'} ${p.blink ? 'blink' : ''} ${
          p.wiggle ? 'wiggle' : ''
        }`}
        style="left: {p.x}% ; top: {p.y}% ;"
      ></div>
    {/each}
  </div>
</div>

<style>
  /* full-slide container */
  .slide-outer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  /* 16:9 box that always fills width */
  .wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;  /* forces landscape */
  }

  /* image never cropped; scales with wrapper */
  .bg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
  }

  /* pointers */
  .pointer {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .pointer.circle {
    width: 22px;
    height: 22px;
    border: 3px solid red;
    border-radius: 50%;
  }

  .pointer.arrow {
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-top-color: red;
  }

  @keyframes blinkAnim { 50% { opacity: 0; } }
  .blink { animation: blinkAnim 0.8s step-start infinite; }

  @keyframes wiggleAnim {
    from { transform: translate(-50%, -50%) rotate(-5deg); }
    to   { transform: translate(-50%, -50%) rotate( 5deg); }
  }
  .wiggle { animation: wiggleAnim 0.4s ease-in-out infinite alternate; }
</style>
