<script>
  export let icon = "📘";
  export let title = "Untitled";
  export let description = "";
  export let color = "#007BFF";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card" style="--card-color: {color}" on:click>
  <div class="card-icon">{icon}</div>

  <div class="card-title">
    {#if title}
      {title.slice(0, 20)}{title.length > 20 ? '…' : ''}
    {/if}
  </div>
  
  {#if description}
    <div class="card-desc">{description}</div>
  {/if}
</div>

<style>
.card {
  width: 240px;
  min-height: 180px;
  background-color: #ffffff;
  border: 2px solid var(--card-color);
  border-top: 8px solid var(--card-color);
  padding: 1.2rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: sans-serif;
  text-align: center;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  background-color: #fdfdfd;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  color: var(--card-color);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.9rem;
  color: #555;
  opacity: 0.85;
  margin-top: auto;
}
</style>
