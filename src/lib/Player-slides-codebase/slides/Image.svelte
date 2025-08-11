<!-- ImageSlide.svelte -->
<script>
  export let data;
  // find the image URL
  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
</script>

<div class="image-slide">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img class="slide-image" src={imageSrc} alt="Slide Image" />
</div>

<style>
  /* I. Container: full-height flex centering + padding */
  .image-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;           /* fill the parent (e.g. slide-outer) */
    padding: 2rem;          /* breathing room around the image */
    box-sizing: border-box;
  }

  /* II. Image: responsive, bordered, contained */
  .slide-image {
    max-width: 100%;
    max-height: 90%;
    object-fit: contain;    /* preserve aspect ratio */
    border: 4px solid #ddd; /* simple light gray border */
    border-radius: 8px;     /* gentle rounding */
  }
</style>
