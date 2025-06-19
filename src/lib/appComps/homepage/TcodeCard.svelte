<script>
  export let tcodes = [];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each tcodes as t}
  <a href={`/syllabus/${t.tcodeName}`}>
    <div class="block bg-white rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all">
      <img src="/pivot/box.webp" alt={t.tcodeName} class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-800">{t.tcodeName}</h2>
        <p class="text-sm text-gray-600 mt-1">{t.tcodeName}</p>
      </div>
    </div>
  </a>  
  {/each}
</div>
