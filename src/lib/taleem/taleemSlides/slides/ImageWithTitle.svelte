<script>
  export let data;
  export let imagesUrl;

  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  const title = data.find(d => d.name === "title")?.content ?? "";
</script>

<div class="slide-container">
  <div class="title-zone">
    <h1 class="slide-title">{title}</h1>
  </div>
  <div class="image-zone">
    <img src={imagesUrl +imageSrc} alt="Slide Image" />
  </div>
</div>

<style>
  .slide-container {
    display: flex;
    flex-direction: column;
    justify-content: center;    /* vertical centering */
    align-items: center;        /* horizontal centering */
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
  }

  .title-zone {
    text-align: center;
  }

  .slide-title {
    margin: 0;
    font-size: clamp(1.5rem, 6vw, 4rem);
    line-height: 1.2;
  }

  .image-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 70%;
    max-height: 60%;
  }

  .image-zone img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    .slide-title {
      font-size: clamp(1.2rem, 8vw, 2rem);
    }
    .image-zone {
      max-width: 90%;
      max-height: 70%;
    }
  }
</style>
