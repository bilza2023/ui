<!-- /home/bilal-tariq/00--TALEEM===>Project/ui/src/routes/palace/+page.svelte -->
<script>
  import QuranSurahBar from '$lib/quran/components/QuranSurahBar.svelte';

  import quran from '$lib/quran/quran.json';
  import maudidi from '$lib/quran/translation/maudidi.json';

  import {
    getSurahName,
    findSurahByNumber,
    buildTranslationIndex
  } from '$lib/quran/quranHelpers';

  // =======================================
  // Translation index (same pattern as /quran)
  // =======================================
  const trIndex = buildTranslationIndex(maudidi);

  // =======================================
  // AyatIcon + AyatIconDescription cache (DB-backed via /api/hifz)
  // =======================================
  let iconCache = {}; // key: "surah:ayah" → ayatIcon text
  let descCache = {}; // key: "surah:ayah" → ayatIconDescription text

  function getAyatIconFor(surahNumber, ayahNumber) {
    const key = `${surahNumber}:${ayahNumber}`;
    return iconCache[key] ?? '';
  }

  function getAyatIconDescriptionFor(surahNumber, ayahNumber) {
    const key = `${surahNumber}:${ayahNumber}`;
    return descCache[key] ?? '';
  }

  async function loadIconsForCurrentRange() {
    if (!currentSurah || !currentSurahTotalAyahs) return;
    if (!fromAyah || !toAyah || fromAyah > toAyah) return;

    const max = currentSurahTotalAyahs;
    const start = Math.max(1, fromAyah);
    const end = Math.min(toAyah, max);

    const newIconCache = { ...iconCache };
    const newDescCache = { ...descCache };

    const fetches = [];

    for (let n = start; n <= end; n += 1) {
      const key = `${currentSurahNumber}:${n}`;
      // If we already have it in cache, skip
      if (newIconCache[key] !== undefined && newDescCache[key] !== undefined) continue;

      fetches.push(
        (async () => {
          try {
            const res = await fetch(
              `/api/hifz?surah=${currentSurahNumber}&ayah=${n}`
            );

            if (!res.ok) {
              newIconCache[key] = '';
              newDescCache[key] = '';
              return;
            }

            const data = await res.json();
            const row = data.hifz;

            newIconCache[key] = row?.ayatIcon ?? '';
            newDescCache[key] = row?.ayatIconDescription ?? '';
          } catch (err) {
            console.error('Error loading Hifz for', key, err);
            newIconCache[key] = '';
            newDescCache[key] = '';
          }
        })()
      );
    }

    if (fetches.length) {
      await Promise.all(fetches);
      iconCache = newIconCache; // trigger reactivity
      descCache = newDescCache; // trigger reactivity
    }
  }

  // =======================================
  // Page state
  // =======================================

  // Start from Baqarah by default (change to 1 if you prefer)
  let currentSurahNumber = 2;

  let fromAyah = 1;
  let toAyah = 10;

  let showArabic = true;
  let showTranslation = true;
  let showAyatIcon = true;
  let showAyatIconDescription = true;

  // Current surah object
  $: currentSurah = currentSurahNumber
    ? findSurahByNumber(quran, currentSurahNumber)
    : null;

  // Surah names for UI
  $: currentSurahName = currentSurah ? getSurahName(currentSurah) : '';
  $: selectedNum = currentSurahNumber ?? 2;
  $: selectedName = currentSurahName ?? '';

  // Total āyāt in current sūrah
  $: currentSurahTotalAyahs = currentSurah
    ? currentSurah.total_verses ?? (currentSurah.verses?.length ?? 0)
    : 0;

  // =======================================
  // Build table rows for selected range
  // =======================================
  let ayahRows = [];
  let tableColspan = 0;

  function recomputeAyahRows() {
    ayahRows = [];

    if (!currentSurah || !currentSurahTotalAyahs) {
      return;
    }

    if (!fromAyah || !toAyah || fromAyah > toAyah) {
      return;
    }

    const max = currentSurahTotalAyahs;
    const start = Math.max(1, fromAyah);
    const end = Math.min(toAyah, max);

    for (let n = start; n <= end; n += 1) {
      const verse = currentSurah.verses.find((v) => v.id === n);
      const arabic = verse?.text ?? '';
      const translation = trIndex.get(`${currentSurahNumber}:${n}`) ?? '';
      const iconText = getAyatIconFor(currentSurahNumber, n);
      const iconDescription = getAyatIconDescriptionFor(currentSurahNumber, n);

      ayahRows.push({
        surahNumber: currentSurahNumber,
        ayahNumber: n,
        // TEMP: hookNumber == ayahNumber (just to avoid duplicate look)
        hook: `${currentSurahNumber}:${n}`, // later: replace with real hook index
        ref: `${currentSurahNumber}:${n}`,
        arabic,
        translation,
        iconText,
        ayatIconDescription: iconDescription
      });
    }
  }

  // Reactive: rebuild rows whenever *any* key dependencies change
  $: {
    currentSurah;
    currentSurahTotalAyahs;
    fromAyah;
    toAyah;
    iconCache; // when icons arrive, rows update
    descCache; // when descriptions arrive, rows update
    recomputeAyahRows();
  }

  // Reactive: compute colspan for description row
  $: tableColspan =
    2 +
    (showArabic ? 1 : 0) +
    (showTranslation ? 1 : 0) +
    (showAyatIcon ? 1 : 0);

  // Reactive: load icons when range or surah changes
  $: if (
    currentSurah &&
    currentSurahTotalAyahs &&
    fromAyah &&
    toAyah &&
    fromAyah <= toAyah
  ) {
    loadIconsForCurrentRange();
  }

  // =======================================
  // Handlers
  // =======================================
  function jumpToSurah(surahNum) {
    if (!surahNum) return;
    const surah = findSurahByNumber(quran, surahNum);
    if (!surah) return;

    currentSurahNumber = surahNum;
    const max = surah.total_verses ?? (surah.verses?.length ?? 1);

    fromAyah = 1;
    toAyah = max;
  }

  function onSurahPick(event) {
    const { surah } = event.detail || {};
    jumpToSurah(surah);
  }

  function onSurahSelect(event) {
    const { surah } = event.detail || {};
    jumpToSurah(surah);
  }

  function handleFromChange(event) {
    if (!currentSurahTotalAyahs) return;

    let value = parseInt(event.target.value, 10);
    if (Number.isNaN(value)) value = 1;

    value = Math.max(1, Math.min(currentSurahTotalAyahs, value));
    fromAyah = value;

    if (toAyah < fromAyah) {
      toAyah = fromAyah;
    }
  }

  function handleToChange(event) {
    if (!currentSurahTotalAyahs) return;

    let value = parseInt(event.target.value, 10);
    if (Number.isNaN(value)) value = currentSurahTotalAyahs;

    value = Math.max(1, Math.min(currentSurahTotalAyahs, value));
    toAyah = value;

    if (toAyah < fromAyah) {
      fromAyah = toAyah;
    }
  }

  const toggleArabic = () => {
    showArabic = !showArabic;
  };

  const toggleTranslation = () => {
    showTranslation = !showTranslation;
  };

  const toggleAyatIcon = () => {
    showAyatIcon = !showAyatIcon;
  };

  const toggleAyatIconDescription = () => {
    showAyatIconDescription = !showAyatIconDescription;
  };
</script>

<section class="page" dir="ltr">
  <!-- Row 1: Surah picker -->
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

  <!-- Row 2: Range + panel toggles -->
  <div class="row controlsRow">
    <div class="rangeInputs">
      <label>
        From āyah
        <input
          type="number"
          min="1"
          max={currentSurahTotalAyahs || 1}
          value={fromAyah}
          on:change={handleFromChange}
        />
      </label>

      <label>
        To āyah
        <input
          type="number"
          min="1"
          max={currentSurahTotalAyahs || 1}
          value={toAyah}
          on:change={handleToChange}
        />
      </label>

      {#if currentSurahTotalAyahs}
        <span class="rangeMeta">
          of {currentSurahTotalAyahs} āyāt
        </span>
      {/if}
    </div>

    <div class="panelToggles">
      <span class="toggleLabel">Show:</span>
      <button type="button" class:active={showArabic} on:click={toggleArabic}>
        Arabic
      </button>
      <button
        type="button"
        class:active={showTranslation}
        on:click={toggleTranslation}
      >
        Translation
      </button>
      <button
        type="button"
        class:active={showAyatIcon}
        on:click={toggleAyatIcon}
      >
        AyatIcon
      </button>
      <button
        type="button"
        class:active={showAyatIconDescription}
        on:click={toggleAyatIconDescription}
      >
        Icon Desc
      </button>
    </div>
  </div>

  <!-- Row 3: Table view -->
  <div class="row tableRow">
    {#if !ayahRows.length}
      <p class="placeholder">No āyāt in this range.</p>
    {:else}
      <div class="tableWrapper">
        <table class="palaceTable">
          <thead>
            <tr>
              <th class="colRef">Ref</th>
              <th class="colHook">Hook</th>
              {#if showArabic}
                <th class="colArabic">Arabic</th>
              {/if}
              {#if showTranslation}
                <th class="colTranslation">Translation</th>
              {/if}
              {#if showAyatIcon}
                <th class="colIcon">AyatIcon</th>
              {/if}
            </tr>
          </thead>
          <tbody>
            {#each ayahRows as row}
              <!-- Main row -->
              <tr>
                <td class="colRef">
                  {row.ref}
                </td>
                <td class="colHook">
                  <!-- TEMP: just show ayah number inside surah so it isn't a duplicate -->
                  {row.ayahNumber}
                </td>

                {#if showArabic}
                  <td class="colArabic">
                    <span class="ayahArabic" dir="rtl">
                      {row.arabic}
                    </span>
                  </td>
                {/if}

                {#if showTranslation}
                  <td class="colTranslation">
                    <span class="ayahTranslation">
                      {row.translation}
                    </span>
                  </td>
                {/if}

                {#if showAyatIcon}
                  <td class="colIcon">
                    <span class="ayatIconText">
                      {row.iconText}
                    </span>
                  </td>
                {/if}
              </tr>

              <!-- Second row: AyatIconDescription (full width) -->
              {#if showAyatIconDescription && row.ayatIconDescription}
                <tr class="descRow">
                  <td class="descCell" colspan={tableColspan}>
                    <div class="ayatIconDescription">
                      {row.ayatIconDescription}
                    </div>
                  </td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</section>

<style>
  :root {
    --pageW: 820px;
  }

  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    color: var(--primaryText);
    background: var(--backgroundColor);
  }

  .row {
    width: min(100%, var(--pageW));
  }

  .pickerRow {
    margin-top: 0.5rem;
  }

  .controlsRow {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: flex-end;
  }

  .rangeInputs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: flex-end;
  }

  .rangeInputs label {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
  }

  .rangeInputs input {
    margin-top: 0.15rem;
    width: 5rem;
    padding: 0.25rem 0.4rem;
    border-radius: 4px;
    border: 1px solid var(--borderColor);
    background: var(--surfaceColor);
    color: inherit;
    font-size: 0.9rem;
  }

  .rangeMeta {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .panelToggles {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    align-items: center;
  }

  .toggleLabel {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-right: 0.25rem;
  }

  .panelToggles button {
    padding: 0.3rem 0.75rem;
    font-size: 0.8rem;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    background: var(--backgroundColor);
    cursor: pointer;
  }

  .panelToggles button.active {
    background: var(--accentColor, #1e88e5);
    border-color: var(--accentColor, #1e88e5);
    color: #fff;
  }

  .panelToggles button:hover {
    filter: brightness(1.05);
  }

  .tableRow {
    margin-top: 0.75rem;
  }

  .tableWrapper {
    width: 100%;
    overflow-x: auto;
    background: var(--surfaceColor);
    border-radius: 8px;
    border: 1px solid var(--borderColor);
  }

  .palaceTable {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  .palaceTable th,
  .palaceTable td {
    padding: 0.45rem 0.6rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    vertical-align: top;
  }

  .palaceTable th {
    text-align: left;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.02);
    position: sticky;
    top: 0;
    backdrop-filter: blur(6px);
    z-index: 1;
  }

  .colRef {
    white-space: nowrap;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .colHook {
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .colArabic {
    min-width: 220px;
  }

  .colTranslation {
    min-width: 260px;
  }

  .colIcon {
    min-width: 220px;
  }

  .ayahArabic {
    font-size: 1rem;
    line-height: 1.6;
  }

  .ayahTranslation {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .ayatIconText {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .placeholder {
    opacity: 0.6;
    font-style: italic;
    font-size: 0.92rem;
    padding: 0.5rem 0.25rem;
  }

  /* Second-row (description) styling */
  .descRow td.descCell {
    padding-top: 0;
    padding-bottom: 0.6rem;
    border-top: none;
    font-size: 0.85rem;
  }

  .ayatIconDescription {
    font-size: 0.85rem;
    line-height: 1.5;
    opacity: 0.9;
  }
</style>
