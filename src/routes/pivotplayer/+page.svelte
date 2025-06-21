
<!-- +page.svelte -->
<script>
  import PivotPlayer from '../../lib/PivotPlayer/PivotPlayer.svelte';
  import { deck } from './deck.js';
</script>

<PivotPlayer
  {deck}
  soundUrl="/sounds/music.opus"
  background={{
    backgroundColor: "#ffffff",
    backgroundImage: "/pivot/defaultBg.png",
    backgroundImageOpacity: 0.8
  }}
/>
