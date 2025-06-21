<script>
    export let data;
  
    const number = data.find(d => d.name === "number")?.content ?? "";
    const label = data.find(d => d.name === "label")?.content ?? "";
  </script>
  
  <div class="slide-container">
    <div class="big-number">{number}</div>
    <div class="label-text">{label}</div>
  </div>
  
  <style>
  .slide-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 20px;
    padding: 40px;
    box-sizing: border-box;
    text-align: center;
  }
  
  .big-number {
    font-size: 6rem;
    font-weight: bold;
  }
  
  .label-text {
    font-size: 1.5rem;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .big-number {
      font-size: 3rem;
    }
  
    .label-text {
      font-size: 1rem;
    }
  }
  </style>
  