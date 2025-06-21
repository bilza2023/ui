<script>
    export let data;
  
    const title = data.find(d => d.name === "title")?.content ?? "";
    const subtitle = data.find(d => d.name === "subtitle")?.content ?? "";
  </script>
  
  <div class="slide-container">
    <h1 class="slide-title">{title}</h1>
    <p class="slide-subtitle">{subtitle}</p>
  </div>
  
  <style>
  .slide-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    text-align: center;
    gap: 20px;
  }
  
  .slide-title {
    font-size: 3rem;
    margin: 0;
  }
  
  .slide-subtitle {
    font-size: 1.5rem;
    margin: 0;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .slide-title {
      font-size: 2rem;
    }
    .slide-subtitle {
      font-size: 1rem;
    }
  }
  </style>
  