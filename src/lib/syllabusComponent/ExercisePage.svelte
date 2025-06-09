
<script>
    export let chapter = null;
    export let selectedExercise = null;
    export let isSubscribed = false;
    export let onSelectExercise = (ex) => {};
  </script>
  
  {#if chapter}
    <h2 class="text-2xl font-semibold px-4 mt-4 mb-2">{chapter.name} — Exercises</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {#each Array.from(chapter.exercisesMap.values()) as ex (ex.exercise)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 cursor-pointer transition"
          on:click={() => onSelectExercise(ex)}
        >
          <h3 class="text-lg font-medium">Exercise {ex.exercise}</h3>
          <p class="text-sm text-gray-700">Questions: {ex.questions.length}</p>
        </div>
      {/each}
    </div>
  {/if}
  