<script>
    export let data;
    const imageSrc = data.find(d => d.name === "image")?.content ?? "";
    const title = data.find(d => d.name === "title")?.content ?? "";
  </script>
  
  <div class="image-slide">
    <div class="text-overlay title">{title}</div>
    <img class="full-image" src={imageSrc} alt="Slide Image" />
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
    
    max-width: 60vw;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
  
  .text-overlay.title {
    position: absolute;
    top: 5%;
    left: 50%;
    padding-top: 3rem;
    margin-bottom: 3rem;
    transform: translateX(-50%);
    font-size: 4rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 5px black;
  }
  </style>
  