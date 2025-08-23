<script>
  export let data;
  export let currentTime;

  // Image: always render if present; highlight after its showAt
  $: imageItem   = (Array.isArray(data) ? data : []).find(d => d?.name === "image");
  $: imageActive = imageItem ? currentTime >= (imageItem.showAt ?? 0) : false;

  // Bullets: always render; order by showAt so highlight progresses in time
  $: bullets = (Array.isArray(data) ? data : [])
    .filter(d => d?.name === "bullet")
    .sort((a, b) => a.showAt - b.showAt);
</script>

<div class="slide-container">
  <div class="bullets-left">
    <ul>
      {#each bullets as b}
        <li class={currentTime >= b.showAt ? 'active' : 'dim'}>
          {b.content}
        </li>
      {/each}
    </ul>
  </div>

  {#if imageItem}
    <div class={`image-right ${imageActive ? 'img-active' : 'img-dim'}`}>
      <img src={imageItem.content} alt="Slide image" />
    </div>
  {/if}
</div>

<style>
  /* ───────────────── slide frame ───────────────── */
  .slide-container {
    display: flex;
    flex-direction: row; /* bullets left, image right */
    flex-wrap: nowrap; /* never stack vertically    */
    align-items: center; /* vertical centering        */
    justify-content: center; /* horizontal balance        */
    gap: clamp(1rem, 3vw, 2rem);

    height: 100%;
    width: 100%;
    padding: clamp(1rem, 3vw, 2rem);
    box-sizing: border-box;
  }

  /* ───────────────── bullets column ─────────────── */
  .bullets-left {
    flex: 1 1 0; /* takes remaining width, can shrink */
    min-width: 0; /* allow shrinking instead of wrap   */
    display: flex;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.2rem, 4vw, 2.5rem);
    line-height: 1.5;
  }

  .bullets-left ul {
    margin: 0;
    padding-left: 1.25em; /* disc bullets */
  }

  .bullets-left li {
    margin-bottom: 0.5em;
  }

  /* ───────────────── image column ──────────────── */
  .image-right {
    flex: 0 0 40%; /* ~40 % of slide, can shrink */
    max-width: 40%;
    max-height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-right img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
  }

  /* ───────────── NEW: highlight states only ───────────── */
  .bullets-left li.dim { opacity: 0.45; }
  .bullets-left li.active { opacity: 1; }

  .image-right.img-dim img { opacity: 0.65; }
  .image-right.img-active img { opacity: 1; }
</style>
