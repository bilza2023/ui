
<script>
  import QCard from '../../lib/homeIndex/QCard.svelte';
  export let data;
  const questions = data?.questions ?? [];
</script>

<div class="app-container">
  <div class="layout-container">
    <div class="main-content">
      <!-- Sample Videos -->
      <div class="questions-container">
        <!-- Only render once loaded -->
        {#if questions.length}
          <QCard 
          {questions} 
          />
        {:else}
          <p>Loading…</p>
        {/if}
      </div>
    </div>
  </div>
</div>


<style>
  .app-container {
    max-width: 2500px;
    margin-inline: auto;
    padding: clamp(12px, 2vw, 24px);
  }

  .layout-container {
    display: flex;
    justify-content: center;
  }

  .main-content {
    flex: 1;
    border: 4px solid var(--backgroundColor);
    border-radius: 16px;
    padding: clamp(12px, 2vw, 24px);
    box-shadow:
      0 1px 1px rgba(0,0,0,.04),
      0 4px 14px rgba(0,0,0,.08);
  }

  .questions-container {
   
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
</style>
