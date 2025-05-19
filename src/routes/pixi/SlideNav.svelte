<script>
  import { onMount, onDestroy } from "svelte";
  import { Howl } from "howler";

  export let update = (t) => {};
  export let src = "/sounds/music.opus";

  let sound;
  let ticking = false;
  let audioReady = false;
  let maxEndTime = 0;
  let currentTime = 0;
  let raf;

  function tick() {
    currentTime = sound.seek() || 0;
    update(currentTime);

    if (currentTime >= maxEndTime) {
      stop();
      return;
    }

    if (sound.playing()) {
      raf = requestAnimationFrame(tick);
    } else {
      ticking = false;
    }
  }

  function play() {
    if (!audioReady) return;
    sound.play();
  }

  function pause() {
    if (sound) {
      sound.pause();
      ticking = false;
    }
  }

  function stop() {
    if (sound) {
      sound.stop();
      cancelAnimationFrame(raf);
      ticking = false;
      update(0);
    }
  }

  function setVolume(e) {
    const v = parseFloat(e.target.value);
    if (!isNaN(v)) sound.volume(v);
  }

  function seek(e) {
    const t = parseFloat(e.target.value);
    if (!isNaN(t)) {
      sound.seek(t);
      update(t);
    }
  }

  onMount(() => {
    sound = new Howl({
      src: [src],
      html5: true,
      onload: () => {
        audioReady = true;
        maxEndTime = sound.duration();
      },
      onplay: () => {
        if (!ticking) {
          ticking = true;
          raf = requestAnimationFrame(tick);
        }
      }
    });
  });

  onDestroy(() => {
    if (sound) sound.stop();
    cancelAnimationFrame(raf);
  });
</script>

<div class="text-white p-2 bg-black flex items-center gap-4">
  <button on:click={play}>▶ Play</button>
  <button on:click={pause}>⏸ Pause</button>
  <button on:click={stop}>⏹ Reset</button>

  <span class="text-sm font-mono">Time: {currentTime.toFixed(1)}s</span>

  <label class="text-sm">Seek:
    <input type="range" min="0" max={maxEndTime} step="0.1" on:input={seek} />
  </label>

  <label class="text-sm">Volume:
    <input type="range" min="0" max="1" step="0.01" on:input={setVolume} />
  </label>


</div>
