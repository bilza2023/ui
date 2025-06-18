<script>
  export let chapter; // full chapter object from getNestedView()
  export let selectedExercise;
  export let isSubscribed = false;
  export let onSelectExercise;
</script>

<div class="p-6 space-y-4">
  <h2 class="text-2xl font-bold text-white">Exercises in {chapter.name}</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each chapter.exercises as exercise}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="bg-white rounded-xl shadow p-4 cursor-pointer hover:ring-2 ring-yellow-600"
        on:click={() => onSelectExercise?.(exercise)}
      >
        <h3 class="text-lg font-semibold text-gray-800">{exercise.name}</h3>
        <p class="text-sm text-gray-600">Contains {exercise.questions.length} questions</p>
      </div>
    {/each}
  </div>
</div>
