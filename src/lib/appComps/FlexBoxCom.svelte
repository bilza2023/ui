<script>
    let thumbnails = [
      "/brand/ai4.webp",
      "/brand/it.webp",
      "/brand/math_class9.webp",
      "/brand/english.webp",
    ];
  
    const fallback = "/brand/vv/placeholder.webp";
  </script>

<div class="flex flex-wrap justify-center gap-4 p-2">
    {#each Array(4) as _, i}
      <div class="w-[200px] h-[240px] bg-[#f3e8d9] border border-[#8b5306] rounded-xl overflow-hidden">
        <img
          src={thumbnails[i] || fallback}
          alt="thumbnail"
          class="w-full h-full object-cover"
        />
      </div>
    {/each}
  </div>
  
  