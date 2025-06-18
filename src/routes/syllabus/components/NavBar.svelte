<script>
  export let tcode = "Unknown";
  export let selectedChapter = null;
  export let selectedExercise = null;

  export let onBackToChapters;
  export let onBackToExercises;

  console.log("NavBar selectedChapter:", selectedChapter);
  console.log("NavBar selectedExercise:", selectedExercise);
</script>

<nav class="bg-[#1e1205] text-white px-6 py-4 flex items-center space-x-4 shadow-md">
  <!-- Always show subject name -->
  <h1 class="text-xl font-bold text-yellow-300">📘 {tcode}</h1>

  <!-- Show selected chapter if available -->
  {#if selectedChapter && selectedChapter.name}
    <span>/</span>
    <button
      on:click={() => onBackToChapters?.()}
      class="text-yellow-200 hover:underline"
    >
      {selectedChapter.name}
    </button>
  {/if}

  <!-- Show selected exercise if available -->
  {#if selectedExercise && selectedExercise.name}
    <span>/</span>
    <button
      on:click={() => onBackToExercises?.()}
      class="text-yellow-200 hover:underline"
    >
      {selectedExercise.name}
    </button>
  {/if}
</nav>
