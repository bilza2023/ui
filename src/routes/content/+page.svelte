<script>
  // import { deck } from "./deck.js";
  import { PivotPlayer } from "taleem-pivot-player";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { get } from "svelte/store";

  const modules = import.meta.glob("/src/lib/content/**/*.js");
  let deck = null;
  onMount(async () => {
    const url = get(page).url;
    const tcode = url.searchParams.get("tcode");
    const filename = url.searchParams.get("filename");

    if (!tcode || !filename) {
      console.error("Missing tcode or filename in query params");
      return;
    }

    const path = `/src/lib/content/${tcode}/${filename}.js`;

    if (modules[path]) {
      const mod = await modules[path]();
      debugger;
      deck = mod.default;
      console.log("✅ Loaded deck module:", mod);
    } else {
      console.error(`❌ Could not find module at path: ${path}`);
    }
  });
</script>

{#if deck}
  <PivotPlayer {deck} />
{/if}
