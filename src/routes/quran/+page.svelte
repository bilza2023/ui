<!-- /home/bilal-tariq/00--TALEEM===>Project/ui/src/routes/quran/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import QuranSurahBar from '$lib/quran/components/QuranSurahBar.svelte';
  import QuranAyahNavBar from '$lib/quran/components/QuranAyahNavBar.svelte';
  import QuranAyahReader from '$lib/quran/components/QuranAyahReader.svelte';
  import quran from '$lib/quran/quran.json';
  import maudidi from '$lib/quran/translation/maudidi.json';

  import {
    getSurahName,
    getAyahText,
    totalAyahs,
    ayahAt,
    findSurahByNumber,
    buildTranslationIndex
  } from '$lib/quran/quranHelpers';

  // Selection state
  let selectedNum = 2;
  let selectedName = 'البقرة';

  // Current sūrah & verse index
  let currentSurah = null;
  let ayahIdx = 0;

  // ===== Translation index (flat array: {surah, ayah, text}) =====
  // key: "surah:ayah" -> text
  const trIndex = buildTranslationIndex(maudidi);

  $: trText =
    currentSurah && selectedNum
      ? trIndex.get(`${Number(selectedNum)}:${ayahIdx + 1}`) ?? ''
      : '';

  // ===== surah bar events =====
  function onSurahPick(e) {
    const { surah, name } = e.detail || {};
    if (!surah) return;
    selectedNum = surah;
    selectedName = name ?? '';
    loadSurah();
  }

  function onSurahSelect(e) {
    const { surah, name } = e.detail || {};
    selectedNum = surah ?? null;
    selectedName = name ?? '';
    loadSurah();
  }

  function loadSurah() {
    currentSurah = selectedNum ? findSurahByNumber(quran, selectedNum) : null;
    ayahIdx = 0;
  }

  onMount(loadSurah);

  // ===== navigation =====
  function goFirst() {
    if (currentSurah) ayahIdx = 0;
  }
  function goLast() {
    if (currentSurah) ayahIdx = Math.max(0, totalAyahs(currentSurah) - 1);
  }
  function goPrev() {
    if (currentSurah) ayahIdx = Math.max(0, ayahIdx - 1);
  }
  function goNext() {
    if (currentSurah) ayahIdx = Math.min(totalAyahs(currentSurah) - 1, ayahIdx + 1);
  }

  $: atStart = !currentSurah || ayahIdx === 0;
  $: atEnd = !currentSurah || ayahIdx >= totalAyahs(currentSurah) - 1;

  // Optional: keyboard arrows
  function onKeydown(e) {
    if (!currentSurah) return;
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  }

  // For QuranSurahBar
  $: currentSurahName = currentSurah ? getSurahName(currentSurah) : '';
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="page" dir="rtl" on:keydown={onKeydown} tabindex="0">
  <!-- Row 1: Surah bar (dropdown + badge in one line) -->
  <div class="row pickerRow">
    <QuranSurahBar
      {selectedNum}
      {selectedName}
      {currentSurahName}
      placeholder=""
      on:pick={onSurahPick}
      on:select={onSurahSelect}
    />
  </div>

  <!-- Row 2: Nav bar -->
  {#if currentSurah}
    <div class="row">
      <QuranAyahNavBar
        {atStart}
        {atEnd}
        on:first={goFirst}
        on:prev={goPrev}
        on:next={goNext}
        on:last={goLast}
      />
    </div>
  {/if}

  <!-- Row 3: Reader area -->
  {#if currentSurah}
    <div class="row">
      <QuranAyahReader
        ayahNumber={ayahIdx + 1}
        totalAyahs={totalAyahs(currentSurah)}
        arabic={ayahAt(currentSurah, ayahIdx) ? getAyahText(ayahAt(currentSurah, ayahIdx)) : ''}
        translation={trText}
      />
    </div>
  {/if}
</section>

<style>
  :root {
    --pageW: 820px;
  }

  /* Top-level page wrapper */
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    color: var(--primaryText);
    background: var(--backgroundColor);
  }

  /* Generic content row wrapper */
  .row {
    width: min(100%, var(--pageW));
  }

  /* Surah bar spacing */
  .pickerRow {
    margin-top: 0.5rem;
  }
</style>
