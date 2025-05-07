<script>
  //@ts-nocheck
  export let url = '/';
  export let bg = 'bg-transparent';
  export let hoverBg = 'hover:bg-[#bfa074]';
  export let titleColor = 'text-gray-900';
  </script>
  
  <div class="w-20 group rounded-md">
    <a href={url}>
      <button class={`w-full flex flex-col items-center p-2 m-0 rounded ${bg} ${hoverBg} active:bg-gray-900 transition-colors`}>
        <span class="text-md">&#x1F3E0;</span>
        <span class={`text-xs font-medium transition-colors group-hover:${titleColor}`}>
          Home
        </span>
      </button>
    </a>
  </div>
  