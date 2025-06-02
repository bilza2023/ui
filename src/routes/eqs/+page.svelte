<script>
  import EqPlayer from '../../lib/eqsai/player/EqPlayer.svelte';
  import slide from '../../lib/eqsai/slide';

  let currentTime = 0;

  // Mock timer for demo
  const interval = setInterval(() => {
    currentTime += 1;
    if (currentTime > 30) clearInterval(interval);
  }, 1000);
</script>

<EqPlayer {slide} {currentTime} />
