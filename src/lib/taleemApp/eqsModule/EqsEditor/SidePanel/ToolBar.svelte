<script>
  //@ts-nocheck
  import Eqs from "../../Eqs";
  export let item;

  function getEqsSpItem(type){
    // debugger;
    const spItem = Eqs.getEqsSpItem(type);
    item.sp = [...item.sp,spItem];
  }
</script>

<div class='flex justify-center gap-1 bg-green-950 p-2 rounded-md'>
  <div class="bg-stone-950 text-white rounded-xl m-1 p-1 text-xs">Side Panel</div>
  

  <button on:click={() => getEqsSpItem("heading")} 
    class="bg-orange-600 text-white p-1 text-xs rounded-md">Heading</button>
    
  <button on:click={() => getEqsSpItem("text")} 
    class="bg-green-700 text-white p-1 text-xs rounded-md">Text</button>
  
  <button on:click={() => getEqsSpItem("code")} 
    class="bg-yellow-600 text-white p-1 text-xs rounded-md">Code</button>
  
  <button on:click={() => getEqsSpItem("img")} 
    class="bg-green-600 text-white p-1 text-xs rounded-md">Image</button>
  
  <button on:click={() => getEqsSpItem('table')} 
    class="bg-green-900 text-white p-1 text-xs rounded-md">Table</button>
  
  <button on:click={() => getEqsSpItem('tableCode')} 
    class="bg-red-900 text-white p-1 text-xs rounded-md">Code Table</button>
</div>