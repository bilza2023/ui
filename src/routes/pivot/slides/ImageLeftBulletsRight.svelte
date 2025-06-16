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
      <ul>
        {#each bullets as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>
    </div>
  </div>
  
  <style>
    .image-bullet-slide {
      display: flex;
      width: 100%;
      height: 100%;
    }
  
    .left-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  
    .left-image img {
      max-width: 100%;
      /* max-height: 100%; */
      max-height: 80%;
      object-fit: contain;
    }
  
    .right-bullets {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 40px;
    }
    .right-bullets ul {
    list-style: disc;
    padding-left: 20px;
    font-size: 80px;
    line-height: 220px; /* 1.5 × font-size = clean spacing */
  }

  </style>
  