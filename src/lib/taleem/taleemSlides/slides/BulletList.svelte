<script>
  export let data;
  export let currentTime;

  // All bullets visible; sort by showAt for stable order
  $: bullets = (Array.isArray(data) ? data : [])
    .filter(item => item?.name === "bullet")
    .sort((a, b) => a.showAt - b.showAt);
</script>

<div class="slide-container">
  <ul class="bullet-list">
    {#each bullets as b}
      <li class={`bullet-item ${currentTime >= b.showAt ? 'active' : 'dim'}`}>
        {b.content}
      </li>
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

/* NEW: highlight vs. pre-highlight */
.bullet-item.dim {
  opacity: 0.45;
}
.bullet-item.active {
  opacity: 1;
  font-weight: 700;
}

@media (max-width: 768px) {
  .bullet-list {
    font-size: 2rem;
  }
}
</style>
