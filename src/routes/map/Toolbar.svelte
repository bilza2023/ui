<script>
    export let playing = false;
    export let current = 0;
    export let duration = 100;
    export let speed = 1;
  
    export let onPlayPause;
    export let onStop;
    export let onReset;
    export let onSeek;
  </script>
  
  <div class="bottom-toolbar">
    <button class="btn play" on:click={onPlayPause}>
      {playing ? "Pause" : "Play"}
    </button>
  
    <button class="btn stop" on:click={onStop}>Stop</button>
    <button class="btn reset" on:click={onReset}>Reset</button>
  
    <input
      type="range"
      class="scrub"
      min="0"
      max={duration}
      step="1"
      value={current}
      on:input={(e) => onSeek(+e.target.value)}
    />
  
    <div class="small-muted">Speed</div>
    <input
      type="range"
      min="0.5"
      max="2.0"
      step="0.1"
      value={speed}
      class="speed"
      disabled
    />
  </div>
  
  <style>
    /* copy toolbar CSS from your working version */
  </style>
  