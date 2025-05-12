<script>
    export let title = "";
    export let description = "";
    export let thumbnail = "";
    export let timePeriod = "";
    export let fee = "";
    export let dim = false;
  </script>
  
  <div class="p-5 rounded-xl shadow transition duration-200 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] flex flex-col gap-3"
       class:opacity-40={dim}
       class:pointer-events-none={dim}
       class:bg-[#fff9f0]={!dim}
       class:bg-[#f5f5f5]={dim}>
  
    {#if thumbnail}
      <img src={thumbnail} alt={title} class="w-full h-40 object-cover rounded-lg" />
    {/if}
  
    <h3 class="text-lg font-bold text-[#3d2e1e]">{title}</h3>
    <p class="text-sm text-gray-700 flex-grow">{description}</p>
  
    <div class="text-sm text-gray-600 mt-auto">
      <div><strong>⏱️ Duration:</strong> {timePeriod}</div>
      <div><strong>💸 Fee:</strong> {fee}</div>
    </div>
  </div>
  