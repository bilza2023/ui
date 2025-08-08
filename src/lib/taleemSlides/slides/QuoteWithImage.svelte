<script>
  export let data;

  // Extract slide data
  const title = data.find(d => d.name === "quoteLine")?.content ?? "";
  const subtitle = data.find(d => d.name === "author")?.content ?? "";
  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
</script>

<div class="slide">
  <h1 class="title">{title}</h1>
  <p class="subtitle">— {subtitle}</p>
  <div class="image-container">
    <img src={imageSrc} alt={subtitle} />
  </div>
</div>

<style>
.slide {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: clamp(1rem, 5vw, 2rem);
  height: 100vh;
  box-sizing: border-box;
}

.title {
  font-size: clamp(2rem, 6vw, 3rem);
  margin: clamp(0.25rem, 1.5vw, 0.75rem) 0;
  line-height: 1.1;
}

.subtitle {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  opacity: 0.8;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.image-container img {
  width: clamp(40%, 70vw, 70%);
  height: auto;
  object-fit: contain;
}
</style>
