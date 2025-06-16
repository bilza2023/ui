
<script>
    export let data;
    const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  </script>
  
  <div class="image-slide">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img class="full-image" src={imageSrc} alt="Slide Image" />
  </div>
  
  <style>
    .image-slide {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  
    .full-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
  