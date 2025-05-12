<script>
    export let title = "";
    export let description = "";
    export let dim = false;
    export let price = "";
    export let period = "";
    export let icon = "🎓"; // default icon
  </script>
  
  <div class="p-6 rounded-2xl shadow-lg border border-[#e0cbb1] transition duration-200 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]"
       class:opacity-40={dim}
       class:pointer-events-none={dim}
       class:bg-[#fff3e6]={!dim}
       class:bg-[#e5e5e5]={dim}>
  
    <h3 class="text-xl font-extrabold mb-2 text-[#3d2e1e] tracking-tight">{title}</h3>
    <p class="text-sm text-gray-800 mb-3 leading-snug">{description}</p>
  
    <div class="text-center text-5xl my-4 drop-shadow-sm">{icon}</div>
  
    <div class="text-center font-bold text-[#3d2e1e] text-base mb-1">💰 {price}</div>
  <div class="text-center font-bold text-[#b85c00] text-base mb-3">📅 {period}</div>

  <div class="text-left text-xs text-[#856953] opacity-70 tracking-wide mt-2">taleem.help</div>

  </div>
  