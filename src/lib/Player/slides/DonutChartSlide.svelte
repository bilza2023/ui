<script>
    export let data;
  
    const percent = parseInt(data.find(d => d.name === "percent")?.content ?? 0);
    const label = data.find(d => d.name === "label")?.content ?? "";
    const color = data.find(d => d.name === "color")?.content ?? "#4CAF50";
  
    const circumference = 2 * Math.PI * 80;
    const offset = circumference * (1 - percent / 100);
  </script>
  
  <div class="donut-slide">
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle class="track" cx="100" cy="100" r="80" />
      <circle
        class="fill"
        cx="100"
        cy="100"
        r="80"
        stroke={color}
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
      />
      <text x="100" y="110" text-anchor="middle" class="center-text">{percent}%</text>
    </svg>
    <div class="donut-label">{label}</div>
  </div>
  
  <style>
  .donut-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 2rem;
  }
  
  svg {
    transform: rotate(-90deg);
  }
  
  .track {
    fill: none;
    stroke: #eee;
    stroke-width: 20;
  }
  
  .fill {
    fill: none;
    stroke-width: 20;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
  }
  
  .center-text {
    fill: #333;
    font-size: 2.5rem;
    font-weight: bold;
    transform: rotate(90deg);
  }
  
  .donut-label {
    font-size: 2.5rem;
    font-weight: 500;
  }
  </style>
  