<script>
  export let data;

  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  const bullets = data.filter(d => d.name === "bullet").map(b => b.content);
</script>

<div class="image-bullet-slide">
  <div class="left-image">
    <img src={imageSrc} alt="Slide Image" />
  </div>
  <div class="right-bullets">
    {#each bullets as b}
      <div class="bullet-item">• {b}</div>
    {/each}
  </div>
</div>

<style>
.image-bullet-slide {
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 40px;
}

.left-image {
  flex: 0 0 40%;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
}

.right-bullets {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bullet-item {
  font-size: clamp(20px, 3vw, 36px);
  line-height: 1.4;
  margin-bottom: 16px;
}

/* Prevent wrapping */
@media (max-width: 768px) {
  .image-bullet-slide {
    height: auto;
    padding: 20px;
  }
}
</style>
