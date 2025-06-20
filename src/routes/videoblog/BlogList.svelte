

  <script>
    // Accepts an array of blog entries, each with { emoji, title, href, description, thumbnail }
    export let blogs = [];
    let title = "Title";
  </script>
  
  <ul class="space-y-6">
    {#each blogs as { emoji, title, href, description, thumbnail }}
      <li class="bg-[#f8f2dd] p-5 rounded-lg shadow hover:shadow-md transition flex items-center gap-4">
        <img
          src={thumbnail}
          alt="thumbnail"
          class="w-24 h-24 object-cover rounded"
        />
  
        <div>
          <a
            href={href}
            class="text-2xl text-[#023047] font-semibold hover:underline flex items-center gap-2"
          >
            <span>{emoji}</span>
            <span>{title}</span>
          </a>
          <p class="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </li>
    {/each}
  </ul>
  