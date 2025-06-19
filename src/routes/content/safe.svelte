<script>
  import { deck } from "./deck.js";
  // import PresentationPlayer from "./PresentationPlayer.svelte";
  import { PivotPlayer } from "taleem-pivot-player";
</script>

{#if deck}
  <PivotPlayer {deck} />
{/if}
