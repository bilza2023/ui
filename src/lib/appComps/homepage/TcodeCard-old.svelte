<script>
  export let tcodes = [];
  debugger;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each tcodes as t}
    {#if t.link}
      <a
        href={t.link}
        class="block bg-white rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all"
      >
        {#if t.image}
          <img src={t.image} alt={t.name} class="w-full h-48 object-cover" />
        {/if}

        <div class="p-4">
          <h2 class="text-lg font-bold text-gray-800">{t.name}</h2>

          {#if t.description}
            <p class="text-sm text-gray-600 mt-1">{t.description}</p>
          {/if}
        </div>
      </a>
    {/if}
  {/each}
</div>
