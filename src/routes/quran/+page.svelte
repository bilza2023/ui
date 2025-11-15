<!-- /home/bilal-tariq/00--TALEEM===>Project/ui/src/routes/hifz/+page.svelte -->
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
  // Start at 2:2 (hook 9) since that’s where your icons begin,
  // feel free to change to 1 if you want.
  let hookId = 9;

  // Toggle for Hifz panel visibility


  // Toggle for Translation visibility
  let showTranslation = true;

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
  // Hifz editable state
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
        // console.warn('No Hifz found for', key);
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

      // console.log('📥 Loaded Hifz from DB:', key, hifz);
    } catch (err) {
      // console.error('Error loading Hifz:', err);
    }
  }

  // Reactive load whenever the current ayah changes (via hookId)
  $: if (currentSurahNumber && currentAyahNumber) {
    loadHifzForCurrentAyah();
  }

  // ------------------------------------------
  // Save Hifz field to DB
  // ------------------------------------------
  async function handleHifzSave(e) {
    const { field, value } = e.detail || {};
    if (!field || !currentSurahNumber || !currentAyahNumber) return;

    // Update UI immediately
    hifz = { ...hifz, [field]: value };
    // console.log('📝 Local Hifz update:', field, value);

    // Save to DB
    try {
      const res = await fetch('/api/hifz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surah: currentSurahNumber,
          ayah: currentAyahNumber,
          field,
          value
        })
      });

      const data = await res.json();
      if (!res.ok) {
        // console.error('❌ DB save failed:', data);
        return;
      }

      // console.log('✅ Saved to DB:', data.hifz);
    } catch (err) {
      // console.error('❌ Error saving to DB:', err);
    }
  }

  // ============================
  // Surah bar events (jump via hooks)
  // ============================
  function onSurahPick(e) {
    const { surah } = e.detail || {};
    if (!surah) return;
    const start = getSurahStartHook(surah);
    if (start) {
      hookId = start;
      lastLoadedKey = ''; // force reload
    }
  }

  function onSurahSelect(e) {
    const { surah } = e.detail || {};
    if (!surah) return;
    const start = getSurahStartHook(surah);
    if (start) {
      hookId = start;
      lastLoadedKey = ''; // force reload
    }
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
      if (hookId > 1) hookId = hookId - 1;
    }
    if (e.key === 'ArrowRight') {
      if (hookId < MAX_HOOK) hookId = hookId + 1;
    }
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

  <!-- Row 3: Reader area (driven by hookId) -->
  {#if currentSurah && currentAyahNumber}
    <div class="row">
      <QuranAyahReader
        ayahNumber={currentAyahNumber}
        totalAyahs={totalAyahs(currentSurah)}
        arabic={
          ayahAt(currentSurah, currentAyahNumber - 1)
            ? getAyahText(ayahAt(currentSurah, currentAyahNumber - 1))
            : ''
        }
        translation={showTranslation ? trText : ''}
      />
    </div>
  {/if}

  <!-- Row 4: Toggles -->
  <div class="row hifzToggleRow" dir="ltr">
   
    <button type="button" on:click={() => (showTranslation = !showTranslation)}>
      {showTranslation ? 'Hide Translation' : 'Show Translation'}
    </button>

    <span class="hookRef">
      Current: {currentRefString}
    </span>
  </div>

 
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

  .hifzToggleRow {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .hifzToggleRow button {
    padding: 0.25rem 0.75rem;
    font-size: 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    background: var(--surfaceColor);
    cursor: pointer;
  }

  .hifzToggleRow button:hover {
    filter: brightness(1.05);
  }

  .hookRef {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .hifzRow {
    margin-top: 0.75rem;
    padding: 0.75rem 0;
    border-top: 1px dashed var(--borderColor);
  }

  .hifzRow h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
</style>
