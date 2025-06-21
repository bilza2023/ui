
<!-- +page.svelte -->
<script>
  import PivotPlayerUI from '../../lib/PivotPlayer/PivotPlayer.svelte';
  import { deck } from './deck-json.js';
</script>

<PivotPlayerUI
  {deck}
  soundUrl="/sounds/music.opus"
  background={{
    backgroundColor: "#ffffff",
    backgroundImage: "/pivot/defaultBg.png",
    backgroundImageOpacity: 0.8
  }}
/>
