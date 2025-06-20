<script>
    export let data;
  
    const title = data.find(d => d.name === "title")?.content ?? "";
    const bars = data.filter(d => d.name === "bar");
  </script>
  
  <div class="bar-chart-slide">
    <h1 class="chart-title">{title}</h1>
  
    <div class="bar-list">
      {#each bars as { label, value, color }}
        <div class="bar-row">
          <div class="bar-label">{label}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width: {value}%; background-color: {color}"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
  .bar-chart-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    padding: 4rem;
    box-sizing: border-box;
  }
  
  .chart-title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .bar-list {
    width: 100%;
    display: flex;
    padding-left: 3rem;
    flex-direction: column;
    gap: 2rem;
  }
  
  .bar-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .bar-label {
    width: 20%;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .bar-track {
    flex: 1;
    height: 2.5rem;
    background-color: #eee;
    border-radius: 1.25rem;
    overflow: hidden;
  }
  
  .bar-fill {
    height: 100%;
    border-radius: 1.25rem 0 0 1.25rem;
  }
  </style>
  