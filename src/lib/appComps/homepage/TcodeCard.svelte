<script>
  export let tcodes = [];
  // debugger;
</script>

<div class="flex flex-wrap gap-10 justify-center ">
  {#each tcodes as t}
  <a href={`/syllabus/${t.tcodeName}`}>
    <div class="block  max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all">

    <div class="block bg-white rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all">
      <img src={t.image} alt={t.tcodeName} class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-800">{t.tcodeName}</h2>
        <p class="text-sm text-gray-600 mt-1">{t.tcodeName}</p>
      </div>
    </div>
    </div>
  </a>  
  {/each}
</div>
