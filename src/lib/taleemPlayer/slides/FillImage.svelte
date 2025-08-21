<!-- FullImageSlide.svelte -->
<script>
    export let data;
    const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  </script>
  
  <div class="full-image-slide">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img class="full-image" src={imageSrc} alt="Slide Image" />
  </div>
  
  <style>
    /* Fullscreen image slide container */
    .full-image-slide {
      height: 100%;
      width: 100%;
      padding: 1rem;               /* breathing room around edges */
      box-sizing: border-box;
    }
  
    .full-image {
      width: 100%;
      height: 100%;
      object-fit: contain;         /* no crop, scale to fit */
      display: block;
    }
  </style>
  