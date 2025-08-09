<script>
  export let currentTime = 0;
  export let duration    = 100;
  export let onPlay  = () => {};
  export let onPause = () => {};
  export let onStop  = () => {};
  export let onSeek  = (val) => {};
  export let hasAudio = false;

  let visible = true;
  let hideTimeout;
  function showTemporarily() {
    visible = true;
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => (visible = false), 4000);
  }
  const handleMove = () => showTemporarily();

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
</script>

<div
  class="nav-bar"
  class:visible
  on:pointermove={handleMove}
  on:touchstart={handleMove}
>
  {#if hasAudio}
    <button on:click={onPlay}>▶️</button>
    <button on:click={onPause}>⏸️</button>
    <button on:click={onStop}>⏹️</button>
  {/if}

  <span class="timer">{formatTime(currentTime)} / {formatTime(duration)}</span>

  <!-- changed: value=... and currentTarget -->
  <input
    type="range"
    min="0"
    max={duration}
    step="0.1"
    value={currentTime}
    on:input={(e) => onSeek(+e.currentTarget.value)}
  />
</div>


<style>
  .nav-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    color: white;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.4s;
    z-index: 10;
  }
  .nav-bar.visible { opacity: 1; }

  .nav-bar button {
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.75rem;
    font-size: 0.9rem;
    background: #333;
    color: #fff;
    cursor: pointer;
  }
  .nav-bar button:hover { background: #555; }

  .nav-bar .timer { min-width: 90px; text-align: center; }
  .nav-bar input[type="range"] { flex: 1; }
</style>
