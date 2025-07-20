<script>
  export let data;
  export let currentTime;

  $: imageItem = data.find(d => d.name === "image" && d.showAt <= currentTime);

  $: bullets = data
    .filter(d => d.name === "bullet" && d.showAt <= currentTime)
    .sort((a, b) => a.showAt - b.showAt)
    .map(d => d.content);
</script>

<div class="slide-container">
  {#if imageItem}
    <div class="image-left">
      <img src={imageItem.content} alt="Slide image" />
    </div>
  {/if}
  <div class="bullets-right">
    <ul>
      {#each bullets as bullet}
        <li>{bullet}</li>
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
</style>
