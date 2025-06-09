
<script>
    export let chapters = [];
    export let selectedChapter = null;
    export let isSubscribed = false;
    export let onSelectChapter = (ch) => {};
  </script>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {#each chapters as chapter (chapter.id)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-200 bg-white"
        class:bg-gray-100={!isSubscribed}
        on:click={() => onSelectChapter(chapter)}
      >
        <h2 class="text-xl font-bold mb-2">{chapter.title}</h2>
        <p class="text-sm text-gray-600 line-clamp-3">{chapter.description}</p>
      </div>
    {/each}
  </div>
  