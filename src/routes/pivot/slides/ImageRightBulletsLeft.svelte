<script>
    export let data;
  
    const imageSrc = data.find(d => d.name === "image")?.content ?? "";
    const bullets = data.filter(d => d.name === "bullet").map(b => b.content);
  </script>
  
  <div class="slide-flex">
    <div class="bullets-zone">
      {#each bullets as bullet}
        <div class="bullet-item">{bullet}</div>
      {/each}
    </div>
  
    <div class="image-zone">
      <img src={imageSrc} alt="Slide Image" />
    </div>
  </div>
  
  <style>
.slide-flex {
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 8rem 10rem; /* ← Add side padding */
  gap: 2rem;
}

  
  .bullets-zone {
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
  
  .bullet-item {
    font-size: 4rem;
    font-weight: 500;
    line-height: 2.5;
  }
  
  .image-zone {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .image-zone img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }
  </style>
  