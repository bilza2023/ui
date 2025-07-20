<script>
    export let data;
  
    const number = data.find(d => d.name === "number")?.content ?? "";
    const label = data.find(d => d.name === "label")?.content ?? "";
  </script>
  
  <div class="stat-slide">
    <div class="stat-number">{number}</div>
    <div class="stat-label">{label}</div>
  </div>
  
  <style>
  .stat-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 10rem;
    font-weight: 800;
    color: #333;
  }
  
  .stat-label {
    font-size: 3rem;
    font-weight: 500;
    color: #555;
  }
  </style>
  