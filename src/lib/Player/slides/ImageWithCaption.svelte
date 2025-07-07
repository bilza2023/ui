<script>
    export let data;
    const imageSrc = data.find(d => d.name === "image")?.content ?? "";
    const caption = data.find(d => d.name === "caption")?.content ?? "";
  </script>
  
  <div class="image-slide">
    <img class="full-image" src={imageSrc} alt="Slide Image" />
    <div class="text-overlay caption">{caption}</div>
  </div>
  
  <style>
  .image-slide {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .full-image {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
  
  .text-overlay.caption {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    color: white;
    text-shadow: 1px 1px 4px black;
  }
  </style>
  