
<script>
  export let tcodes = [];
 
</script>
<div class="flex flex-wrap gap-10 justify-center">
  {#each tcodes as t}
    <a href={`/syllabus?tcode=${t.tcodeName}`}>
      <div class="block flex-none w-64 mx-auto rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all bg-white">
        <img src={t.image} alt={t.tcodeName} class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-lg font-bold text-gray-800">{t.tcodeName}</h2>
          <p class="text-sm text-gray-600 mt-1">{t.tcodeName}</p>
        </div>
      </div>
    </a>
  {/each}
</div>
