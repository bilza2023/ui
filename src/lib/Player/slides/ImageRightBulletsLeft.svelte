<script>
  export let data;
  export let currentTime;

  $: imageItem = data.find(
    (d) => d.name === "image" && d.showAt <= currentTime
  );

  $: bullets = data
    .filter((d) => d.name === "bullet" && d.showAt <= currentTime)
    .sort((a, b) => a.showAt - b.showAt)
    .map((d) => d.content);
</script>

<div class="slide-container">
  <div class="bullets-left">
    <ul>
      {#each bullets as bullet}
        <li>{bullet}</li>
      {/each}
    </ul>
  </div>

  {#if imageItem}
    <div class="image-right">
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
</style>
