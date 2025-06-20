<script>
  export let data;

  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  const title = data.find(d => d.name === "title")?.content ?? "";
</script>

<div class="slide-container">
  <div class="title-zone">
    <h1 class="slide-title">{title}</h1>
  </div>
  <div class="image-zone">
    <img src={imageSrc} alt="Slide Image" />
  </div>
</div>

<style>
.slide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  gap: 20px;
}

.title-zone {
  text-align: center;
}

.slide-title {
  padding-top: 4rem;
  font-size: 4rem;
  margin: 0;
}

.image-zone {
  max-width: 70%;
  max-height: 70%;
  display: flex;
  justify-content: center;
}

.image-zone img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 1.5rem;
  }
}
</style>
