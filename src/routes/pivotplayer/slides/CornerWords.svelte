<script>
  export let data;
  const cards = data.filter(d => d.name === "card");
</script>

<div class="card-grid text-primary">
  {#each cards as card}
    <div class="card">
      <div class="icon">{card.icon}</div>
      <div class="label">{card.label}</div>
    </div>
  {/each}
</div>

<style>
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid currentColor;
  border-radius: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
}

.icon {
  font-size: clamp(40px, 10vw, 80px);
  margin-bottom: 12px;
}

.label {
  font-size: clamp(18px, 3vw, 28px);
  font-weight: bold;
  line-height: 1.2;
}

/* Optional: Padding tweaks on small screens */
@media (max-width: 600px) {
  .card {
    padding: 2px;
  }
}
</style>
