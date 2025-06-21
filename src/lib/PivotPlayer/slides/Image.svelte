
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
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0; /* remove padding to maximize vertical space */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.full-image {
  width: auto;
  height: auto;
  max-width: 90vw;   /* 90% of viewport width */
  max-height: 90vh;  /* 90% of viewport height */
  aspect-ratio: 16 / 9;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}

/* === Breakpoints === */

/* xs: <480px */
@media (max-width: 480px) {
  .image-slide { padding: 20px; }
  .image-slide img { max-height: 300px; }
}

/* sm: 481–767px */
@media (min-width: 481px) and (max-width: 767px) {
  .image-slide { padding: 30px; }
  .image-slide img { max-height: 400px; }
}

/* md: 768–1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .image-slide img { max-height: 500px; }
}

/* lg: 1025–1440px */
@media (min-width: 1025px) and (max-width: 1440px) {
  .image-slide img { max-height: 600px; }
}

/* xl: >1440px */
@media (min-width: 1441px) {
  .image-slide img { max-height: 900px; }
}

  </style>
  