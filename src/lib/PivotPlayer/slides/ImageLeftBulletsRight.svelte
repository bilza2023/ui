<script>
  export let data;

  const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  const bullets = data.filter(d => d.name === "bullet").map(b => b.content);
</script>

<div class="slide-grid">
  <div class="image-zone">
    <img src={imageSrc} alt="Slide Image" />
  </div>
  <div class="bullets-zone">
    {#each bullets as bullet}
      <div class="bullet-item">{bullet}</div>
    {/each}
  </div>
</div>

<style>
.slide-grid {
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  padding-left: 12rem;
  box-sizing: border-box;
  gap: 2rem;
}

.image-zone {
  display: flex;
  justify-content: flex-start;  /* Push content to the left edge */
  align-items: center;
  overflow: hidden;
}

.image-zone img {
  display: block;               /* Removes inline spacing */
  max-width: 100%;              /* Never overflow container */
  height: auto;
  object-fit: contain;
}



.bullets-zone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding-right: 1rem;
}

.bullet-item {
  font-size: 4rem; /* Bigger text */
  line-height: 2.5;
  font-weight: 500;
}
</style>

