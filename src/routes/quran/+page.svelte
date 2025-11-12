<!-- /home/bilal-tariq/00--TALEEM===>Project/ui/src/routes/quran/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import SurahDropDown from './SurahDropDown.svelte';
    import quran from '$lib/quran/quran.json';
    import maudidi from '$lib/quran/translation/maudidi.json';
  
    // Selection state
    let selectedNum = 2;
    let selectedName = 'البقرة';
  
    // Current sūrah & verse index
    let currentSurah = null;
    let ayahIdx = 0;
  
    // ===== helpers (Arabic, unchanged) =====
    const toNum = (v) => (v == null ? null : Number(v));
    function getAllSurahs() { return Array.isArray(quran) ? quran : (quran?.surahs || quran?.data || []); }
    function getSurahNumber(s) { return toNum(s?.number ?? s?.id ?? s?.surah_number ?? s?.surah); }
    function getSurahName(s) { return s?.name ?? s?.arabicName ?? s?.title ?? ''; }
    function getAyahsArray(s) { return s?.ayahs ?? s?.verses ?? s?.ayah ?? []; }
    function getAyahText(v) { return (v?.text ?? v?.arabic ?? v?.ar ?? v?.content ?? ''); }
    function totalAyahs(s) { const arr = getAyahsArray(s); return Array.isArray(arr) ? arr.length : 0; }
    function ayahAt(s, idx) { const arr = getAyahsArray(s); return Array.isArray(arr) && arr[idx] ? arr[idx] : null; }
    function findSurahByNumber(num) { const all = getAllSurahs(); return all.find((s) => getSurahNumber(s) === toNum(num)) || null; }
  
    // ===== Translation index (flat array: {surah, ayah, text}) =====
    const trIndex = new Map(); // key: "surah:ayah" -> text
    if (Array.isArray(maudidi)) {
      for (const row of maudidi) {
        const s = Number(row.surah ?? row.Surah);
        const a = Number(row.ayah  ?? row.aya ?? row.verse ?? row.id);
        if (!Number.isFinite(s) || !Number.isFinite(a)) continue;
        const text = row.text ?? row.translation ?? row.en ?? row.ur ?? row.tr ?? row.content ?? '';
        trIndex.set(`${s}:${a}`, text);
      }
    }
    $: trText = (currentSurah && selectedNum)
      ? (trIndex.get(`${Number(selectedNum)}:${ayahIdx + 1}`) ?? '')
      : '';
  
    // ===== dropdown events =====
    function handlePick(num, name) { selectedNum = num; selectedName = name ?? ''; loadSurah(); }
    function handleSelect(e) { const { surah, name } = e.detail || {}; selectedNum = surah ?? null; selectedName = name ?? ''; loadSurah(); }
    function loadSurah() {
      currentSurah = selectedNum ? findSurahByNumber(selectedNum) : null;
      ayahIdx = 0;
    }
  
    onMount(loadSurah);
  
    // ===== navigation =====
    function goFirst() { if (currentSurah) ayahIdx = 0; }
    function goLast()  { if (currentSurah) ayahIdx = Math.max(0, totalAyahs(currentSurah) - 1); }
    function goPrev()  { if (currentSurah) ayahIdx = Math.max(0, ayahIdx - 1); }
    function goNext()  { if (currentSurah) ayahIdx = Math.min(totalAyahs(currentSurah) - 1, ayahIdx + 1); }
  
    $: atStart = !currentSurah || ayahIdx === 0;
    $: atEnd   = !currentSurah || ayahIdx >= totalAyahs(currentSurah) - 1;
  
    // Optional: keyboard arrows
    function onKeydown(e) {
      if (!currentSurah) return;
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
  </script>
  
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <section class="page" dir="rtl" on:keydown={onKeydown} tabindex="0">
    <!-- Row 1: Picker -->
    <div class="row pickerRow">
      <SurahDropDown placeholder="" onPick={handlePick} on:select={handleSelect} />
    </div>
  
    <!-- Row 2: Badge -->
    <div class="row badgeRow">
      {#if currentSurah}
        <p class="badge">
          <strong>{selectedName || getSurahName(currentSurah)}</strong>
          — Surah: <strong>{selectedNum}</strong>
        </p>
      {:else}
        <p class="muted">Select a Surah</p>
      {/if}
    </div>
  
    <!-- Row 3: Nav bar (separate fixed-width container) -->
    {#if currentSurah}
    <div class="row navBar" dir="ltr" role="toolbar" aria-label="Verse navigation">
      <button on:click={goFirst} disabled={atStart} title="First">⏮️ First</button>
      <button on:click={goNext}  disabled={atEnd}   title="Next">Next ▶️</button>
      <button on:click={goPrev}  disabled={atStart} title="Previous">◀️ Prev</button>
      <button on:click={goLast}  disabled={atEnd}   title="Last">⏭️ Last</button>
    </div>
  {/if}
  
    <!-- Row 4: Reader area (fixed width; content can grow vertically without moving nav) -->
    {#if currentSurah}
      <div class="row readerRow">
        <div class="ayahBox">
          <div class="ayahHeader">
            <span>آية {ayahIdx + 1} / {totalAyahs(currentSurah)}</span>
          </div>
  
          <!-- Arabic -->
          <p class="ayahText">
            {#if ayahAt(currentSurah, ayahIdx)}
              {getAyahText(ayahAt(currentSurah, ayahIdx))}
            {:else}
              —
            {/if}
          </p>
  
          <!-- Translation -->
          <p class="trText">
            {#if trText && trText.length}
              {trText}
            {:else}
              "Translation not found"
            {/if}
          </p>
        </div>
      </div>
    {/if}
  </section>
  
  <style>
    :root { --pageW: 820px; }
  
    /* Top-level page wrapper */
    .page {
      /* page-level stack */
      display: flex;
      flex-direction: column;
      align-items: center;             /* center rows */
      gap: 0.75rem;
      padding: 1rem;
      color: var(--primaryText);
      background: var(--backgroundColor);
    }
  
    /* Every stacked piece gets its own fixed-width row box */
    .row {
      width: min(100%, var(--pageW));
    }
  
    .pickerRow { margin-top: 0.5rem; }
  
    .badgeRow .badge {
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: 0.5rem;
      padding: 0.6rem 0.8rem;
      display: inline-block;
      color: var(--primaryText);
    }
    .muted { color: var(--secondaryText); }
  
    /* Navbar: isolated container so buttons don't shift when content height changes */
    .navBar {
  display: flex;
  flex-direction: row;   /* force normal LTR order */
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  background: var(--backgroundColor);
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px dashed var(--borderColor);
}

    .navBar button {
      border: 1px solid var(--primaryColor);
      padding: 0.5rem 0.9rem;
      border-radius: 0.6rem;
      background: transparent;
      color: var(--primaryColor);
      cursor: pointer;
    }
    .navBar button:hover:not(:disabled) { background: var(--primaryColor); color: #fff; }
    .navBar button:disabled { opacity: 0.55; cursor: not-allowed; }
  
    /* Reader row: fixed width, stable box; inner card uses full width */
    .readerRow { display: grid; }
    .ayahBox {
      width: 100%;                     /* stable width */
      min-height: 8rem;                /* prevents tiny verses from collapsing height too much */
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: 0.75rem;
      padding: 0.9rem 1rem;
    }
    .ayahHeader {
      font-size: 0.9rem;
      color: var(--secondaryText);
      margin-bottom: 0.5rem;
    }
    .ayahText {
      font-size: 1.35rem;
      line-height: 2.1;
      margin: 0;
      word-break: break-word;
      color: var(--primaryText);
    }
    .trText {
      margin-top: 0.5rem;
      font-size: 1.05rem;
      line-height: 1.9;
      color: var(--secondaryText);
      /* keep RTL for Urdu; switch to LTR for English if needed */
      /* direction: ltr; text-align: left; */
    }
  </style>
  