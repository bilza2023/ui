<!-- ImageSlide.svelte -->
<script>
  export let data;
  export let imagesUrl;
  // find the image URL
  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
</script>

<div class="image-slide">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img class="fullImage" src={imagesUrl + imageSrc} alt="Slide Image" />
</div>

<style>
 .image-slide{
  display:flex; align-items:center; justify-content:center;
  height:100%; width:100%;
  padding:2rem; box-sizing:border-box;
  overflow:hidden; min-height:0;
}

.fullImage{
  display:block; margin:auto;
  max-width:100%; max-height:90%;
  width:auto; height:auto;
  object-fit:contain;
}



</style>
