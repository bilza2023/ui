<script>
    export let tcodes = []; // Array of { name, description, image, link, tag }

 </script>
  
  <div class="flex flex-wrap gap-4 p-4 justify-center">
    {#each tcodes as tcode (tcode.tcodeName)}
      <a
        href={tcode.link}
        class="w-[320px] rounded-xl overflow-hidden shadow hover:shadow-md transition bg-[#fefcf8] border border-[#eee5db] no-underline"
      >
        <!-- Thumbnail -->
        <div class="h-[160px] overflow-hidden">
          <img
            src={tcode.image || "/tcodes/taleem-banner.webp"}
            alt={tcode.name}
            class="w-full h-full object-cover"
          />
        </div>
  
        <!-- Card Text -->
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">{tcode.tcodeName}</h2>
          <p class="text-sm text-gray-600 line-clamp-2">{tcode.description}</p>
  
          {#if tcode.tags}
            <div
              class="mt-2 text-xs inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded"
            >
              {tcode.tags}
            </div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
<!--   
  Dimensions: 560×315px (16:9 ratio) or 640×360px
Aspect ratio: 16:9 landscape
Format: WebP or high-quality JPEG -->