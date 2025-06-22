
<script>
  // renamed from fbise9physics → syllabus
  export let syllabus;
  export let selectedChapter;
  export let selectedExercise;
  export let unSelectCh;
  export let unSelectEx;
</script>

<div class="button-container">
  <button on:click={() => { unSelectCh(); unSelectEx(); }} class="btn chapter-btn">
    {syllabus.tcodeName}:
  </button>

  {#if selectedChapter}
    <button on:click={unSelectEx} class="btn exercise-btn">
      Chapter › {selectedChapter.name}
    </button>
  {/if}

  {#if selectedExercise}
    <button class="btn question-btn">
      Exercise › {selectedExercise.name}
    </button>
  {/if}
</div>

<style>
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding: 0.75rem 1.25rem;
    background-color: #f9f9fb;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.95rem;
  }

  .btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.3rem 0.8rem;
    font-size: 1.5rem;
    border-radius: 16px;
    font-weight: 500;
    font-style: italic;
    text-transform: capitalize;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .btn::after {
    content: "›";
    font-style: normal;
    margin-left: 0.4rem;
    color: #aaa;
  }

  .btn:last-child::after {
    content: "";
  }

  .btn:hover {
    background-color: #e6e6f0;
  }

  .chapter-btn {
    color: #0056b3;
  }

  .exercise-btn {
    color: #1d7834;
  }

  .question-btn {
    color: #ffc107;
  }
</style>
