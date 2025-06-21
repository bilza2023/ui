<script>
   import PivotPlayer from '../../lib/PivotPlayer/PivotPlayer.svelte';

   
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
      // debugger;
      deck = mod.deck;
      console.log("✅ Loaded deck module:", deck);
    } else {
      console.error(`❌ Could not find module at path: ${path}`);
    }
  });
</script>

{#if deck}

<PivotPlayer
  {deck}
  soundUrl="/sounds/music.opus"
  background={{
    backgroundColor: "#ffffff",
    backgroundImage: "/pivot/defaultBg.png",
    backgroundImageOpacity: 0.8
  }}
/>
{/if}
