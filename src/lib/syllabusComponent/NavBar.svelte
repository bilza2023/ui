<script>
    export let tcode = "";
    export let selectedChapter = null;
    export let selectedExercise = null;
    export let onBackToChapters = () => {};
    export let onBackToExercises = () => {};
  </script>
  
  <nav class="w-full bg-[#c9b7a1] text-gray-800 px-6 py-3 border-b border-gray-200 ">
    <div class="text-lg font-semibold tracking-wide space-x-2">
      <span class="text-gray-500">Subject: ›</span>
      <button class="text-blue-800 underline hover:text-blue-600"
              on:click={onBackToChapters}>
        {tcode}
      </button>
  
      {#if selectedChapter}
        <span class="text-gray-500">Chapter: ›</span>
        <button class="text-blue-800 underline hover:text-blue-600"
                on:click={onBackToExercises}>
          {selectedChapter.chapterName}
        </button>
      {/if}
  
      {#if selectedExercise}
        <span class="text-gray-500">Exercise: ›</span>
        <span class="text-gray-900">{selectedExercise.exerciseName}</span>
      {/if}
    </div>
  </nav>
  