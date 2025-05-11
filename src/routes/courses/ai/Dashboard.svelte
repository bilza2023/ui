<script>
  export let dashboardItems = []; // each: { number, title, icon }
  export let bgColor = "#FDF3E7";
  export let accentColor = "#C4A77F";
  export let themeClass = "theme-business";
  
</script>

<div class="dashboard-wrapper {themeClass}">
  <div class="dashboard" style="--bg-color: {bgColor}; --accent-color: {accentColor}">
    {#each dashboardItems as item}
      <div class="tile">
        <div class="icon">{item.icon}</div>
        <div class="number">{item.number}</div>
        <div class="label">{item.title}</div>
      </div>
    {/each}
  </div>
</div>

<style>
.dashboard-wrapper {
  padding: 1.5rem 2rem;
}

.dashboard {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.tile {
  background-color: color-mix(in srgb, var(--bg-color) 85%, #000);
  border: 1px solid var(--accent-color);
  color: #1f2937;
  flex: 1 1 calc(25% - 1rem);
  padding: 1.25rem 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.tile:hover {
  transform: translateY(-2px);
}

.icon {
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
}

.number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.25rem;
}

.label {
  font-size: 0.9rem;
  opacity: 0.85;
}
</style>
