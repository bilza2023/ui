<script>
  export let data;
  export let currentTime;
  export let imagesUrl;
  // Image: always visible; highlight when time passes showAt
  $: imageItem = (Array.isArray(data) ? data : []).find(d => d?.name === "image");
  $: imageActive = imageItem ? currentTime >= (imageItem.showAt ?? 0) : false;

  // Bullets: all visible; order by showAt
  $: bullets = (Array.isArray(data) ? data : [])
    .filter(d => d?.name === "bullet")
    .sort((a, b) => a.showAt - b.showAt);
</script>

<div class="slide-container">
  {#if imageItem}
    <div class={`image-left ${imageActive ? 'img-active' : 'img-dim'}`}>
      <img src={imagesUrl + imageItem.content} alt="Slide image" />
    </div>
  {/if}
  <div class="bullets-right">
    <ul>
      {#each bullets as b}
        <li class={currentTime >= b.showAt ? 'active' : 'dim'}>
          {b.content}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  /* ───────────────── slide frame ───────────────── */
  .slide-container {
    display: flex;
    flex-direction: row;        /* image left, bullets right */
    flex-wrap: nowrap;          /* never stack vertically   */
    align-items: center;        /* vertical centering       */
    justify-content: center;    /* horizontal balance       */
    gap: clamp(1rem, 3vw, 2rem);

    height: 100%;
    width: 100%;
    padding: clamp(1rem, 3vw, 2rem);
    box-sizing: border-box;
  }

  /* ───────────────── image column ───────────────── */
  .image-left {
    flex: 0 0 40%;              /* ~40 % of slide, can shrink if needed */
    max-width: 40%;
    max-height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-left img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  /* ───────────────── bullet column ──────────────── */
  .bullets-right {
    flex: 1 1 0;                /* take remaining width, allow shrink */
    min-width: 0;               /* permit shrinking instead of wrap   */
    font-size: clamp(1.2rem, 4vw, 2.5rem);
    font-weight: bold;
    line-height: 1.5;
  }

  .bullets-right ul {
    margin: 0;
    padding-left: 1em;
  }

  .bullets-right li {
    margin-bottom: 0.5em;
  }

  /* ───────────── NEW: highlight states only ───────────── */
  .bullets-right li.dim { opacity: 0.45; }
  .bullets-right li.active { opacity: 1; }

  .image-left.img-dim img { opacity: 0.65; }
  .image-left.img-active img { opacity: 1; }
</style>
