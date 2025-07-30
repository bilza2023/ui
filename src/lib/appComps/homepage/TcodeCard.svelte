<script>
  export let tcodes = [];
   let folderName = "subject";
</script>

<div class="grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-6 px-4 py-8">
  {#each tcodes as t}
    <a href={`/${folderName}?tcode=${t.tcodeName}`}>
      <div class="bg-[#2d2d2d] border border-gray-700 rounded-xl shadow-md hover:ring-2 hover:ring-yellow-500 transition-all overflow-hidden">
        <img src={t.image} alt={t.tcodeName} class="w-full h-48 object-cover border-b border-gray-600" />
        <div class="p-4 text-center bg-[#6d4d26]    ">
          <h2 class="text-white font-semibold text-lg">{t.tcodeName}</h2>
        </div>
      </div>
    </a>
  {/each}
</div>
