<script>
    export let data;
  
    const bullets = data.filter(d => d.name === "bullet").map(b => b.content);
  </script>
  
  <div class="slide-container">
    <ul class="bullet-list">
      {#each bullets as bullet}
        <li class="bullet-item">{bullet}</li>
      {/each}
    </ul>
  </div>
  
  <style>
  .slide-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
  }
  
  .bullet-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    font-size: 1.5rem;
  }
  
  .bullet-item {
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 768px) {
    .bullet-list {
      font-size: 1rem;
    }
  }
  </style>
  