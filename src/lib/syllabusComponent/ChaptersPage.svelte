<script>
  export let chapters = [];
  export let selectedChapter = null;
  export let isSubscribed = false;
  export let onSelectChapter = (ch) => {};
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {#each chapters as chapter (chapter.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="rounded-xl overflow-hidden shadow hover:shadow-md transition bg-[#fefcf8] border border-[#eee5db] cursor-pointer"
      class:bg-gray-100={!isSubscribed}
      on:click={() => onSelectChapter(chapter)}
    >
      <!-- Thumbnail -->
      <div class="h-[180px] overflow-hidden">
        <img
          src={chapter.image || "/tcodes/chapter-banner.webp"}
          alt={chapter.chapterName}
          class="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      <!-- Card Text -->
      <div class="p-4">
        <h2 class="text-lg font-semibold line-clamp-1">{chapter.chapterName}</h2>
        <p class="text-sm text-gray-600 line-clamp-2">{chapter.description}</p>

        {#if chapter.tag}
          <div class="mt-2 text-xs inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
            {chapter.tag}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
