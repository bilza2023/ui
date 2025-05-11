<script>
  export let selectedIndex = 0;

  const tracks = [
    { icon: '🧠', title: 'AI Foundation Track' },
    { icon: '🛠️', title: 'AI System Dev Track' },
    { icon: '💼', title: 'AI Business Dev Track' }
  ];
</script>

<div class="card-container">
  <div class="card-row">
    {#each tracks as track, i}
      <button
        class="track-card {selectedIndex === i ? 'selected' : ''}"
        on:click={() => selectedIndex = i}
      >
        <span class="icon">{track.icon}</span>
        <span class="title">{track.title}</span>
      </button>
    {/each}
  </div>
</div>

<style>
.card-container {
  padding: 0 2rem;
  margin-top: 2rem;
}

.card-row {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
}

.track-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex: 1;
  background-color: #C4A77F;
  color: #504234;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.track-card:hover {
  background-color: #504234;
  color: #ffffff;
  transform: scale(1.02);
}

.track-card.selected {
  background-color: #504234;
  color: #ffffff;
  border: 2px solid #C4A77F;
}

.icon {
  font-size: 1.25rem;
}

.title {
  white-space: nowrap;
}
</style>
