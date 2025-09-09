<script>
    import { createEventDispatcher } from 'svelte';
  
    // Props
    export let tcode = '';
    export let synopsis = null;                 // { name, chapters: [{ name, sortOrder? }] }
    export let selectedChapter = '';            // number | ''  (numeric chapter used by services)
    export let selectedExercise = '';           // string | ''
    export let counts = null;                   // { byChapter?: Record<number, number> } (optional)
    export let sticky = true;                   // stick to top on scroll (mobile-friendly)
  
    const dispatch = createEventDispatcher();
  
    // Derive chapter list and numeric mapping
    $: chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
  
    // Build options: number = (sortOrder ?? index) + 1
    $: chapterOptions = chapters.map((c, idx) => {
      const number = (typeof c.sortOrder === 'number' ? c.sortOrder : idx) + 1;
      const baseName = (c?.name?.trim?.() || `Chapter ${number}`);
      const count = counts?.byChapter?.[number];
      const label = count ? `${number}. ${baseName} (${count})` : `${number}. ${baseName}`;
      return { number, label };
    });
  
    // Title & subtitle
    $: titleText = (synopsis?.name?.trim?.() || tcode || 'Syllabus');
    $: chapterText = selectedChapter ? `Chapter ${selectedChapter}` : 'All chapters';
  
    // Controlled select value as string
    let localChapterStr = '';
    $: localChapterStr = selectedChapter === '' ? '' : String(selectedChapter);
  
    function onChangeChapter() {
      const ch = localChapterStr === '' ? null : Number(localChapterStr);
      dispatch('chapterChange', { chapter: ch }); // number | null (null = All)
    }
  </script>
  
  <div class="titlebar" class:sticky={sticky} role="region" aria-label="Syllabus title and chapter selector">
    <div class="left">
      <div class="title" title={titleText}>{titleText}</div>
      <div class="subtitle">{chapterText}</div>
    </div>
  
    <div class="right">
      <label for="chapterSelect" class="sr-only">Chapter</label>
      <select id="chapterSelect" class="select" bind:value={localChapterStr} on:change={onChangeChapter} aria-label="Choose chapter">
        <option value="">All chapters</option>
        {#each chapterOptions as opt}
          <option value={String(opt.number)}>{opt.label}</option>
        {/each}
      </select>
      <slot name="right" />
    </div>
  </div>
  
  <style>
    .titlebar {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.75rem;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--backgroundElevated, rgba(20, 26, 35, 0.6));
      backdrop-filter: blur(6px);
      border-bottom: 1px solid color-mix(in oklab, var(--primaryText, #fff) 16%, transparent);
    }
    .sticky {
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .left .title {
      font-size: clamp(1rem, 2.2vw, 1.25rem);
      font-weight: 700;
      color: var(--primaryText, #fff);
      line-height: 1.2;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .left .subtitle {
      font-size: 0.85rem;
      opacity: 0.8;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .select {
      appearance: none;
      background: var(--surface, #0f172a);
      color: var(--primaryText, #fff);
      border: 1px solid color-mix(in oklab, var(--primaryText, #fff) 22%, transparent);
      border-radius: 0.625rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.95rem;
      min-width: min(60vw, 18rem);
    }
    @media (max-width: 640px) {
      .titlebar {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .right {
        justify-content: stretch;
      }
      .select {
        width: 100%;
        min-width: 0;
      }
    }
    /* a11y utility */
    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap; border: 0;
    }
  </style>
  