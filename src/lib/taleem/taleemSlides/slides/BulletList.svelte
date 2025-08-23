<script>
  export let data;
  export let currentTime;

  // Reactive statement: recompute on every currentTime change
  $: visibleBullets = data
    .filter(item => item.name === "bullet" && item.showAt <= currentTime)
    .sort((a, b) => a.showAt - b.showAt)
    .map(item => item.content);
</script>

<div class="slide-container">
  <ul class="bullet-list">
    {#each visibleBullets as bullet}
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
  font-size: 5rem;
}

.bullet-item {
  margin-bottom: 0.8rem;
}

@media (max-width: 768px) {
  .bullet-list {
    font-size: 2rem;
  }
}
</style>
