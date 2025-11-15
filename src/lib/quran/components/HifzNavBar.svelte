<script>
  import { createEventDispatcher } from 'svelte';
  import quran from '$lib/quran/quran.json';
  import {
    getAllSurahs,
    getSurahName
  } from '$lib/quran/quranHelpers.js';

  import {
    MAX_HOOK,
    surahMeta,
    hookToRef,
    getSurahStartHook,
    getSurahEndHook
  } from '$lib/quran/hookIndex.js';

  const dispatch = createEventDispatcher();

  // Current global position (1 → 6236). Parent should bind:hookId.
  export let hookId = 1;
  export let maxHook = MAX_HOOK;

  // Optional: parent can pass a label for current hifz status later
  export let statusLabel = ''; // e.g. "Learning", "Review", "Solid"

  const allSurahs = getAllSurahs(quran);

  // Keep hookId within bounds and numeric
  $: {
    const n = Number(hookId) || 1;
    if (n !== hookId || n < 1 || n > maxHook) {
      hookId = Math.min(maxHook, Math.max(1, n));
    }
  }

  // Derived info from hookId
  $: currentRef = hookToRef(hookId);
  $: currentSurahNumber = currentRef?.surah ?? 1;
  $: currentAyah = currentRef?.ayah ?? 1;
  $: currentRefString = currentRef ? currentRef.ref : '—';

  $: currentSurahRecord =
    allSurahs[currentSurahNumber - 1] || allSurahs[0];

  $: currentSurahName = getSurahName(currentSurahRecord);
  $: currentSurahMeta = surahMeta[currentSurahNumber];
  $: currentAyahsInSurah = currentSurahMeta?.ayahs ?? 0;

  // Percentage through the Qur'an
  $: progressPercent = ((hookId / maxHook) * 100).toFixed(2);

  // Central setter so we can fire an event if parent wants to listen
  function setHook(newHook) {
    const clamped = Math.min(maxHook, Math.max(1, Number(newHook) || 1));
    if (clamped === hookId) return;
    hookId = clamped;
    dispatch('change', { hookId: clamped });
  }

  // Navigation actions
  function goFirstHook() {
    setHook(1);
  }

  function goLastHook() {
    setHook(maxHook);
  }

  function goPrevAyah() {
    if (hookId > 1) setHook(hookId - 1);
  }

  function goNextAyah() {
    if (hookId < maxHook) setHook(hookId + 1);
  }

  function goPrevSurah() {
    if (currentSurahNumber > 1) {
      const start = getSurahStartHook(currentSurahNumber - 1);
      if (start) setHook(start);
    }
  }

  function goNextSurah() {
    if (currentSurahNumber < 114) {
      const start = getSurahStartHook(currentSurahNumber + 1);
      if (start) setHook(start);
    }
  }

  function onSurahChange(event) {
    const s = Number(event.target.value);
    const start = getSurahStartHook(s);
    if (start) setHook(start);
  }

  // Slider handling
  let sliderValue = hookId;

  $: sliderValue = hookId;

  function onSliderInput(event) {
    const val = Number(event.target.value) || 1;
    setHook(val);
  }
</script>

<nav class="hifz-nav">
  <!-- Top row: Surah dropdown + ref + hook info -->
  <div class="row row-top">
    <div class="group">
      <label for="surahSelect"></label>
      <select
        id="surahSelect"
        on:change={onSurahChange}
        bind:value={currentSurahNumber}
      >
        {#each allSurahs as s, i}
          <option value={i + 1}>
            {(i + 1)} — {getSurahName(s)}
          </option>
        {/each}
      </select>
    </div>

    <div class="group info">
      <!-- <div>Ref: <strong>{currentRefString}</strong></div> -->
      <div class="surah-ayah-label">
        Surah / āyah:
        <strong>{currentAyah}</strong> / {currentAyahsInSurah}
      </div>

      {#if statusLabel}
        <div class="status-pill">{statusLabel}</div>
      {/if}
    </div>
  </div>

  <!-- Middle row: main navigation buttons -->
  <div class="row row-buttons" dir="ltr">
    <button type="button" on:click={goPrevAyah} disabled={hookId <= 1}>
      ◀ Prev
    </button>

    <button type="button" on:click={goNextAyah} disabled={hookId >= maxHook}>
      Next ▶
    </button>

    <button type="button" on:click={goPrevSurah} disabled={currentSurahNumber <= 1}>
      « Prev Surah
    </button>

    <button type="button" on:click={goNextSurah} disabled={currentSurahNumber >= 114}>
      Next Surah »
    </button>
  </div>

  <!-- Bottom row: global scrollbar -->
  <div class="row row-slider" dir="ltr">
    <span class="ayat-label">
      Ayat # : (<strong>{hookId}</strong> / {maxHook} {progressPercent} % of Qur'an)
    </span>

    <input
      id="hookSlider"
      type="range"
      min="1"
      max={maxHook}
      bind:value={sliderValue}
      on:input={onSliderInput}
    />
  </div>
</nav>

<style>
  .hifz-nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    color: var(--primaryText);
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .row-top {
    justify-content: space-between;
    align-items: flex-start;
  }

  .group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .group.info {
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
  }

  label {
    font-weight: 500;
    color: var(--secondaryText);
  }

  select {
    padding: 0.2rem 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid var(--borderColor);
    background: var(--surfaceColor);
    color: var(--primaryText);
  }

  .row-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }

  button {
    padding: 0.3rem 0.7rem;
    border-radius: 0.4rem;
    border: 1px solid var(--borderColor);
    background: var(--surfaceColor);
    color: var(--primaryText);
    cursor: pointer;
    font-size: 0.85rem;
  }

  button:hover {
    background: var(--backgroundColor);
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .row-slider {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }

  input[type='range'] {
    width: 100%;
  }

  .progress {
    opacity: 0.7;
    margin-left: 0.25rem;
    font-size: 0.8em;
    color: var(--secondaryText);
  }

  .status-pill {
    margin-top: 0.25rem;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    font-size: 0.75rem;
    background: var(--surfaceColor);
  }

  /* Keep the Ayat label on one line */
  .ayat-label {
    white-space: nowrap;
    font-size: 0.85rem;
  }

  /* NEW: keep the Surah / āyah line together */
  .surah-ayah-label {
    white-space: nowrap;
    word-break: normal;
    overflow-wrap: normal;
  }

  /* --- Small screens: make layout cleaner --- */
  @media (max-width: 640px) {
    /* Top row: stack nicely instead of weird wrapping */
    .row-top {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .group {
      justify-content: space-between;
    }

    .group.info {
      align-items: flex-start;
      text-align: left;
    }

    .surah-ayah-label {
      font-size: 0.85rem;
    }

    /* Buttons: force 2 x 2 grid instead of 3+1 */
    .row-buttons {
      justify-content: center;
    }

    .row-buttons button {
      flex: 1 1 calc(50% - 0.5rem);
      min-width: 8rem;
      text-align: center;
    }

    /* Slider row: label above slider, centered */
    .row-slider {
      align-items: stretch;
    }

    .ayat-label {
      text-align: center;
    }
  }
</style>
