<script>
  export let data;

  // Extract cards
  const cards = data.filter(d => d.name === "card");
</script>

<div class="card-flex text-primary">
  {#each cards as card}
    <div class="card">
      <div class="icon">{card.icon}</div>
      <div class="label">{card.label}</div>
    </div>
  {/each}
</div>

<style>
  .card-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;
    width: 100%;
    height: 100%;
    padding: 60px;
    box-sizing: border-box;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 4px solid currentColor;
    border-radius: 20px;
    padding: 30px;
    min-width: 200px;
    max-width: 280px;
    text-align: center;
  }

  .icon {
    font-size: 100px;
    margin-bottom: 20px;
  }

  .label {
    font-size: 32px;
    font-weight: bold;
  }
</style>
