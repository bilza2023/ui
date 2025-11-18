<!-- /home/bilal-tariq/00--TALEEM===>Project/ui/src/routes/daur/+page.svelte -->
<script>
  import { onMount } from 'svelte';

  import QuranSurahBar from '$lib/quran/components/QuranSurahBar.svelte';
  import QuranAyahReader from '$lib/quran/components/QuranAyahReader.svelte';
  import HifzNavBar from '$lib/quran/components/HifzNavBar.svelte';

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

  import {
    hookToRef,
    getSurahStartHook,
    MAX_HOOK
  } from '$lib/quran/hookIndex';

  // ============================
  // Global hook-based position
  // ============================
  // Start at 2:2 (hook 9) since that’s where your icons begin
  let hookId = 9;

  // Flip state: false = visualization side, true = ayah+translation side
  let isRevealed = false;

  // Image size state: false = normal, true = large/full
  let isImageLarge = false;

  // Derived ref from hook
  $: currentRef = hookToRef(hookId);
  $: currentSurahNumber = currentRef?.surah ?? null;
  $: currentAyahNumber = currentRef?.ayah ?? null;
  $: currentRefString = currentRef?.ref ?? '';

  // Current surah object (from quran.json)
  $: currentSurah = currentSurahNumber
    ? findSurahByNumber(quran, currentSurahNumber)
    : null;

  // Surah names for UI
  $: currentSurahName = currentSurah ? getSurahName(currentSurah) : '';
  $: selectedNum = currentSurahNumber ?? 2;
  $: selectedName = currentSurahName ?? '';

  // ============================
  // Translation index
  // ============================
  const trIndex = buildTranslationIndex(maudidi);

  $: trText =
    currentSurahNumber && currentAyahNumber
      ? trIndex.get(`${currentSurahNumber}:${currentAyahNumber}`) ?? ''
      : '';

  // ============================
  // Hifz state (read-only for this page)
  // ============================
  let hifz = {
    hookDescription: '',
    hookImageUrl: '',
    ayatIcon: '',
    ayatIconDescription: ''
  };

  let lastLoadedKey = '';

  // ------------------------------------------
  // Load Hifz from DB when hook (ayah) changes
  // ------------------------------------------
  async function loadHifzForCurrentAyah() {
    if (!currentSurahNumber || !currentAyahNumber) return;

    const key = `${currentSurahNumber}:${currentAyahNumber}`;
    if (key === lastLoadedKey) return; // avoid double loads on same ayah
    lastLoadedKey = key;

    try {
      const res = await fetch(
        `/api/hifz?surah=${currentSurahNumber}&ayah=${currentAyahNumber}`
      );

      if (!res.ok) {
        console.warn('No Hifz found for', key);
        hifz = {
          hookDescription: '',
          hookImageUrl: '',
          ayatIcon: '',
          ayatIconDescription: ''
        };
        return;
      }

      const data = await res.json();
      const row = data.hifz;

      hifz = {
        hookDescription: row?.hookDescription ?? '',
        hookImageUrl: row?.hookImageUrl ?? '',
        ayatIcon: row?.ayatIcon ?? '',
        ayatIconDescription: row?.ayatIconDescription ?? ''
      };

      console.log('📥 Loaded Hifz from DB:', key, hifz);
    } catch (err) {
      console.error('Error loading Hifz:', err);
    }
  }

  // Reactive load whenever the current ayah changes (via hookId)
  $: if (currentSurahNumber && currentAyahNumber) {
    loadHifzForCurrentAyah();
  }

  // When hook changes (via any navigation), reset flip + image size
  let lastHookId = hookId;
  $: if (hookId !== lastHookId) {
    lastHookId = hookId;
    isRevealed = false;
    isImageLarge = false;
  }

  // ============================
  // Surah bar events (jump via hooks)
  // ============================
  function jumpToSurahStart(surah) {
    if (!surah) return;
    const start = getSurahStartHook(surah);
    if (start) {
      hookId = start;
      lastLoadedKey = ''; // force reload
      isRevealed = false;
      isImageLarge = false;
    }
  }

  function onSurahPick(e) {
    const { surah } = e.detail || {};
    jumpToSurahStart(surah);
  }

  function onSurahSelect(e) {
    const { surah } = e.detail || {};
    jumpToSurahStart(surah);
  }

  onMount(() => {
    // ensure initial load happens for initial hookId
    lastLoadedKey = '';
  });

  // ============================
  // Keyboard navigation (hook-based)
  // ============================
  function onKeydown(e) {
    if (e.key === 'ArrowLeft') {
      // Previous āyah (previous hook)
      if (hookId > 1) {
        hookId = hookId - 1;
        isRevealed = false;
        isImageLarge = false;
      }
    } else if (e.key === 'ArrowRight') {
      // Next āyah (next hook)
      if (hookId < MAX_HOOK) {
        hookId = hookId + 1;
        isRevealed = false;
        isImageLarge = false;
      }
    }
  }

  // Flip handler
  function toggleReveal() {
    isRevealed = !isRevealed;
  }

  // Image size toggle
  function toggleImageSize() {
    isImageLarge = !isImageLarge;
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="page" dir="rtl" on:keydown={onKeydown} tabindex="0">
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

  <!-- Row 2: Hook-based Hifz nav bar -->
  <div class="row">
    <HifzNavBar bind:hookId />
  </div>

  <!-- Row 3: Revision Card (visualization OR ayah, never both) -->
  {#if currentSurah && currentAyahNumber}
    <div class="row cardRow" dir="ltr">
      <div class="revisionCard">
        <header class="cardHeader">
          <div class="cardTitle">
            <span class="surahName">{currentSurahName}</span>
            <span class="ayahRef">({currentSurahNumber}:{currentAyahNumber})</span>
          </div>
          <div class="hookInfo">
            Hook ID: {hookId}
            {#if currentRefString}
              <span class="hookRef">· Ref: {currentRefString}</span>
            {/if}
          </div>
        </header>

        <!-- Flip controls -->
        <div class="flipControls">
          <button type="button" on:click={toggleReveal}>
            {#if isRevealed}
              Show visualization
            {:else}
              Show āyah & translation
            {/if}
          </button>
        </div>

        {#if !isRevealed}
          <!-- FRONT: Visualization / Icon slide -->
          <div class="visualSection">

            <div class="visualText">
              {#if hifz.ayatIcon || hifz.hookDescription}
                <!-- {#if hifz.hookDescription}
                  <div class="hookDescriptionText">
                    {hifz.hookDescription}
                  </div>
                {/if} -->

                {#if hifz.ayatIcon}
                  <!-- Short caption / icon line -->
                  <div class="ayatIconText">
                    {hifz.ayatIcon}
                  </div>
                  <div class="ayatIconText">
                    {hifz.ayatIconDescription}
                  </div>
                {/if}
              {:else}
                <span class="placeholder">
                  No hook text saved for this āyah yet.
                </span>
              {/if}
            </div>

            <!-- //////////////////// -->
            {#if hifz.hookImageUrl}
              <div class="imageControls">
                <button
                  type="button"
                  class="imageToggle"
                  on:click={toggleImageSize}
                >
                  {#if isImageLarge}
                    Reduce image
                  {:else}
                    Enlarge image
                  {/if}
                </button>
              </div>

              <div class="imageWrapper" class:imageWrapperLarge={isImageLarge}>
                <!-- svelte-ignore a11y_img_redundant_alt -->
                <img
                  src={`quran/memorypalace/${hifz.hookImageUrl}`}
                  alt="Hook visualization image"
                />
              </div>
            {/if}

          </div>
        {:else}
          <!-- BACK: Ayah + translation only -->
          <div class="ayahSection" dir="rtl">
            <QuranAyahReader
              ayahNumber={currentAyahNumber}
              totalAyahs={totalAyahs(currentSurah)}
              arabic={
                ayahAt(currentSurah, currentAyahNumber - 1)
                  ? getAyahText(ayahAt(currentSurah, currentAyahNumber - 1))
                  : ''
              }
              translation={trText}
            />
          </div>
        {/if}
      </div>
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

  .cardRow {
    margin-top: 0.75rem;
  }

  .revisionCard {
    width: 100%;
    background: var(--surfaceColor);
    border-radius: 8px;
    border: 1px solid var(--borderColor);
    padding: 0.9rem 1rem 1rem 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .cardHeader {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-bottom: 1px dashed var(--borderColor);
    padding-bottom: 0.4rem;
  }

  .cardTitle {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
    font-size: 0.96rem;
  }

  .surahName {
    font-weight: 600;
  }

  .ayahRef {
    opacity: 0.8;
    font-size: 0.9rem;
  }

  .hookInfo {
    font-size: 0.82rem;
    opacity: 0.8;
  }

  .hookRef {
    margin-left: 0.35rem;
  }

  .flipControls {
    display: flex;
    justify-content: flex-start;
    margin-top: 0.35rem;
  }

  .flipControls button {
    padding: 0.35rem 0.9rem;
    font-size: 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    background: var(--backgroundColor);
    cursor: pointer;
  }

  .flipControls button:hover {
    filter: brightness(1.05);
  }

  .visualSection {
    margin-top: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .imageControls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.25rem;
  }

  .imageToggle {
    font-size: 0.8rem;
    border: none;
    background: none;
    color: var(--linkColor, #8ab4f8);
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
  }

  .imageToggle:hover {
    opacity: 0.85;
  }

  .imageWrapper {
    width: 100%;
    max-width: 420px;          /* normal/default size */
    margin: 0 auto;
    border-radius: 6px;
    border: 1px solid var(--borderColor);
    background: rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
  }

  /* Large/full-size mode: let it fill the card width */
  .imageWrapperLarge {
    max-width: none;
  }

  .imageWrapper img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .visualText {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .ayatIconText {
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .hookDescriptionText {
    font-size: 0.95rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .placeholder {
    opacity: 0.6;
    font-style: italic;
    font-size: 0.92rem;
  }

  .ayahSection {
    margin-top: 0.6rem;
    border-top: 1px dashed var(--borderColor);
    padding-top: 0.5rem;
  }
</style>
