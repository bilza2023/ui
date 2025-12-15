<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let delay = 5000;

  function start() {
    dispatch("start");
  }

  function stop() {
    dispatch("stop");
  }

  function updateDelay(e) {
    delay = Number(e.target.value);
    dispatch("delayChange", delay);
  }
</script>

<div class="nav">
  <button on:click={start}>Start</button>
  <button on:click={stop}>Stop</button>

  <label>
    Delay (ms):
    <input
      type="number"
      min="1000"
      step="1000"
      bind:value={delay}
      on:change={updateDelay}
    />
  </label>
</div>

<style>
  .nav {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    padding: 8px;
    border-radius: 6px;
    color: white;
  }

  button {
    margin-right: 6px;
  }

  input {
    width: 100px;
  }
</style>
