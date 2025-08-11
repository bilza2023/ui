<script>
  export let data;
  export let currentTime;
  let bars = [];

  $: bars = data
    .filter(item => item.name === "bar" && item.showAt <= currentTime)
    .sort((a, b) => a.showAt - b.showAt);
</script>

<!-- debug -->
<!-- <p style="position:absolute; top:10px; left:10px; color:white; z-index:99;">
  currentTime: {currentTime}
</p> -->
<!-- <p style="position:absolute; top:30px; left:10px; color:white; z-index:99;">
  bars: {JSON.stringify(bars)}
</p> -->

<div class="slide-container">
  <div class="chart-area">
    {#each bars as bar}
      <div class="bar-container">
        <div
          class="bar"
          style="height: {bar.value}%; background-color: {bar.color || '#3498db'}"
        ></div>
        <div class="label">{bar.label}</div>
      </div>
    {/each}
  </div>
</div>

  <style>
.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;   /* ← center vertically */
  height: 100%;
  width: 100%;
  padding: 60px;         /* removed padding-bottom override */
  box-sizing: border-box;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 100%;
  justify-content: flex-end;
}

.chart-area {
  display: flex;
  align-items: flex-end;
  gap: 100px;
  height: 80%;
  width: 100%;
  justify-content: center;
}

.bar {
  width: 100%;
  transition: height 0.3s ease-in-out;
}

.label {
  margin-top: 12px;
  font-size: 1.5rem;
  color: black;
  text-align: center;
}

@media (max-width: 768px) {
  .label {
    font-size: 1rem;
  }
  .bar-container {
    width: 40px;
  }
}

</style>