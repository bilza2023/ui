<script>
  import { createEventDispatcher } from "svelte";
  export let currentRoom = 0;
  export let maxRooms = 30;
  export let speed = 1.0;

  const dispatch = createEventDispatcher();

  let localScrub = currentRoom;
  $: localScrub = currentRoom;

  function handlePlay() { dispatch("play"); }
  function handleStop() { dispatch("stop"); }
  function handleReset() { dispatch("reset"); }

  function handleScrubInput(e) {
    const v = Number(e.target.value);
    localScrub = v;
    dispatch("scrub", { value: v });
  }

  function handleSpeed(e) {
    const v = Number(e.target.value);
    dispatch("speedchange", { value: v });
  }
</script>

<style>
  :global(:root){ --ui-bg: rgba(255,255,255,0.95); --accent:#ffc84c; --muted:#666; }
  .bottom-toolbar {
    position:fixed;
    left:50%;
    transform:translateX(-50%);
    bottom:14px;
    height:58px;
    background:var(--ui-bg);
    border-radius:10px;
    box-shadow:0 6px 22px rgba(0,0,0,0.45);
    display:flex;
    align-items:center;
    gap:12px;
    padding:8px 12px;
    z-index:2500;
    min-width:420px;
    color:#111;
  }
  .btn { background:transparent; border:0; padding:8px 12px; font-weight:700; border-radius:8px; cursor:pointer; }
  .btn.play { background: linear-gradient(90deg,#ffb84c,#ffc84c); color:#222; }
  .btn.stop { background:#f2f2f2; color:#b03030; }
  .scrub { -webkit-appearance:none; appearance:none; width:360px; height:8px; border-radius:8px; }
  .small-muted { color:var(--muted); font-weight:600; font-size:12px; margin-left:6px; }
  .room-badge { position:fixed; left:12px; bottom:88px; z-index:2500; background:rgba(0,0,0,0.6); color:#fff; padding:8px 12px; border-radius:8px; font-weight:700; }
</style>

<div id="roomBadge" class="room-badge">Room {Math.min(maxRooms, Math.max(0, Math.round(currentRoom))) + 1} / {maxRooms}</div>

<div class="bottom-toolbar" role="toolbar" aria-label="Map controls">
  <button class="btn play" on:click={handlePlay} aria-label="Play">Play</button>
  <button class="btn stop" on:click={handleStop} aria-label="Stop">Stop</button>
  <button class="btn" on:click={handleReset} aria-label="Reset">Reset</button>

  <input
    class="scrub"
    type="range"
    min="0"
    max={maxRooms - 1}
    step="0.01"
    bind:value={localScrub}
    on:input={handleScrubInput}
    aria-label="Seek"
  />

  <div class="small-muted">Speed</div>
  <input
    type="range"
    min="0.1"
    max="3.0"
    step="0.1"
    value={speed}
    on:input={handleSpeed}
    aria-label="Speed"
    style="width:120px;"
  />
</div>
