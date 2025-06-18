<!-- src/lib/NavBar.svelte -->
<script>
  export let selectedChapter = null;
  export let selectedExercise = null;
  export let fbise9physics;
  export let view;
  export let setView;
  export let resetAll;
</script>

<div class="button-container">
  <button on:click={resetAll} class="btn chapter-btn">
    {fbise9physics.tcodeName}
  </button>

  {#if selectedChapter}
    <button on:click={() => setView('exercise')} class="btn exercise-btn">
      Chapter > {selectedChapter.name}
    </button>
  {/if}

  {#if selectedExercise}
    <button on:click={() => setView('exercise')} class="btn exercise-btn">
      Exercise > {selectedExercise.name}
    </button>
  {/if}
</div>
