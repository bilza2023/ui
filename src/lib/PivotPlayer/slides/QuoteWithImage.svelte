<script>
    export let data;
  
    const quote = data.find(d => d.name === "quote")?.content ?? "";
    const author = data.find(d => d.name === "author")?.content ?? "";
    const imageSrc = data.find(d => d.name === "image")?.content ?? "";
  </script>
  
  <div class="slide-container">
    <div class="quote-zone">
      <blockquote class="quote">"{quote}"</blockquote>
      <div class="author">— {author}</div>
    </div>
    <div class="image-zone">
      <img src={imageSrc} alt="Author Image" />
    </div>
  </div>
  
  <style>
  .slide-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    height: 100%;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
  }
  
  .quote {
    font-size: 2rem;
    font-style: italic;
    margin: 0;
  }
  
  .author {
    margin-top: 10px;
    font-size: 1.2rem;
    opacity: 0.7;
  }
  
  .image-zone img {
    max-width: 120px;
    height: auto;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    .quote {
      font-size: 1.5rem;
    }
    .author {
      font-size: 1rem;
    }
  }
  </style>
  