<!-- src/lib/quran/components/AyahQarat.svelte -->
<script>
    export let surah;
    export let ayah;
    export let reciter = "Alafasy_64kbps";
  
    // NEW PROP: repeatCount (default: 1)
    export let repeatCount = 1;
  
    const BASE_URL = "https://everyayah.com/data";
  
    // Build codes
    $: surahCode = String(surah).padStart(3, "0");
    $: ayahCode = String(ayah).padStart(3, "0");
  
    // Final URL
    $: audioSrc = `${BASE_URL}/${reciter}/${surahCode}${ayahCode}.mp3`;
  
    let audioElement;
    let isPlaying = false;
  
    // Internal repeat counter
    let remainingRepeats = 0;
  
    // Pick correct icon based on repeatCount
    $: playIcon =
      repeatCount === 1 ? "🔉"
      : repeatCount === 3 ? "🔊"
      : repeatCount === 5 ? "🔊"
      : "🔉"; // fallback
  
    async function startPlayback() {
      if (!audioElement) return;
  
      remainingRepeats = repeatCount;
  
      try {
        await audioElement.play();
      } catch (err) {
        console.error("AyahQarat: playback failed", err);
      }
    }
  
    async function togglePlay() {
      if (!audioElement) return;
  
      if (isPlaying) {
        // Stop everything
        audioElement.pause();
        audioElement.currentTime = 0;
        remainingRepeats = 0;
        isPlaying = false;
        return;
      }
  
      // Start fresh
      await startPlayback();
    }
  
    function handlePlay() {
      isPlaying = true;
    }
  
    async function handleEnded() {
      remainingRepeats -= 1;
  
      if (remainingRepeats > 0) {
        // replay automatically
        audioElement.currentTime = 0;
        try {
          await audioElement.play();
        } catch (err) {
          console.error("AyahQarat: auto replay failed", err);
        }
        return;
      }
  
      // Fully finished
      isPlaying = false;
      audioElement.currentTime = 0;
    }
  
    function handlePause() {
      isPlaying = false;
    }
  
    function handleError() {
      console.error("AyahQarat: failed to load audio:", audioSrc);
      isPlaying = false;
    }
  </script>
  
  <button
    type="button"
    class="ayah-qarat-button"
    on:click={togglePlay}
    aria-label={isPlaying ? "Stop" : "Play"}
    aria-pressed={isPlaying}
    title={isPlaying ? "Stop recitation" : `Play ${repeatCount}x`}
  >
    {#if isPlaying}
      ⏸
    {:else}
      {playIcon}
    {/if}
  </button>
  
  <audio
    bind:this={audioElement}
    src={audioSrc}
    on:play={handlePlay}
    on:pause={handlePause}
    on:ended={handleEnded}
    on:error={handleError}
  />
  
  <style>
    .ayah-qarat-button {
      border: none;
      outline: none;
      cursor: pointer;
      background: transparent;
      font-size: 0.75rem; /* smaller icon size */
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.15rem 0.25rem;
    }
  
    .ayah-qarat-button:hover {
      transform: scale(1.05);
    }
  
    .ayah-qarat-button:active {
      transform: scale(0.95);
    }
  
    .ayah-qarat-button:focus-visible {
      outline: 2px solid #888;
      outline-offset: 2px;
      border-radius: 999px;
    }
  
    audio {
      display: none;
    }
  </style>
  