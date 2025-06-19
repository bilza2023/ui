<script>
  export let icon = "📘";
  export let title = "Untitled";
  export let color = "#007BFF"; // default blue
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card" style="--card-color: {color}" on:click>
  <div class="card-icon">{icon}</div>
  <div class="card-title">{title}</div>
</div>

<style>
  .card {
    background-color: #ffffff;
    border: 2px solid var(--card-color);
    border-left: 6px solid var(--card-color);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: sans-serif;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }

  .card-icon {
    font-size: 1.75rem;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
  }
</style>
