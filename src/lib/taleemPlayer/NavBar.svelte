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
    <a class="btn btn--icon" href="/">🏠</a>
    <button class="btn btn--icon"  on:click={onPlay}>▶️</button>
    <button class="btn btn--icon"  on:click={onPause}>⏸️</button>
    <button class="btn btn--icon"  on:click={onStop}>⏹️</button>
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
  /* one style for both <a> and <button> */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-strong, #3a3a3a);
  border-radius: var(--radius-2, 8px);
  background: var(--surface-2, #262626);
  color: var(--text, #fff);
  font: inherit;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;        /* kills anchor underline */
  cursor: pointer;
  box-shadow: var(--shadow-1, 0 1px 2px rgba(0,0,0,.3));
  transition: background .15s ease, box-shadow .15s ease, transform .05s ease;
}
.btn:hover { background: var(--surface-3, #2e2e2e); box-shadow: var(--shadow-2, 0 2px 6px rgba(0,0,0,.35)); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 2px solid var(--brand, #89aaff); outline-offset: 2px; }

/* square, icon-only buttons (emoji) */
.btn--icon {
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  font-size: 1rem; /* adjust to taste */
}

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
