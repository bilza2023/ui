<script>

import { deck } from "./deck.js";
  import PresentationPlayer from "./PresentationPlayer.svelte";
</script>

{#if deck}
<PresentationPlayer  {deck}/>
{/if}