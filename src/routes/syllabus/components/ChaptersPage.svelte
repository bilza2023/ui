<script>
  export let chapters = [];
  export let isSubscribed = false;
  export let selectedChapter;
  export let onSelectChapter;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
  {#each chapters as chapter}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="cursor-pointer bg-white rounded-xl shadow hover:ring-2 ring-yellow-600 overflow-hidden"
      on:click={() => onSelectChapter?.(chapter)}
    >
      {#if chapter.image}
        <!-- <img src={chapter.image} alt={chapter.name} class="w-full h-40 object-cover rounded-t-xl" /> -->
      <img src="/pivot/box.webp" alt={chapter.name} class="w-full h-40 object-cover rounded-t-xl" />
      {/if}

      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-800">{chapter.name}</h2>

        {#if chapter.description}
          <p class="text-sm text-gray-600 mt-1">{chapter.description}</p>
        {/if}
      </div>
    </div>
  {/each}
</div>
