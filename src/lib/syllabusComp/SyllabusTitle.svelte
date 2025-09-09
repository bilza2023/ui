
<script>
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    // ✅ Same props as your old <Title />
    export let chapter = "";         // human-readable active chapter name
    export let chapterCount = 0;     // questions in current chapter
    export let tcodeTotal = 0;       // total questions in tcode
    export let exerciseCount = 0;    // questions in current exercise
    export let exercise = "";        // active exercise slug/name ("" = All)
  
    const dispatch = createEventDispatcher();
  
    // Route/query state
    $: qp = $page.url.searchParams;
    $: tcode = qp.get('tcode') || '';
  
    // SSR data (provided by +page.server.js)
    $: synopsis = $page.data?.synopsis || null;
  
    // Build chapter options (human labels)
    $: chapters = Array.isArray(synopsis?.chapters)
      ? synopsis.chapters.slice().sort((a,b) => {
          const sa = typeof a.sortOrder === 'number' ? a.sortOrder : 0;
          const sb = typeof b.sortOrder === 'number' ? b.sortOrder : 0;
          return sa - sb;
        })
      : [];
  
    function numberFor(ch, idx) {
      // canonical numeric mapping
      return (typeof ch?.sortOrder === 'number' ? ch.sortOrder : idx) + 1;
    }
  
    $: chapterOptions = chapters.map((c, idx) => {
      const num = numberFor(c, idx);
      const name = (c?.name?.trim?.() || `Chapter ${num}`);
      return { value: String(num), label: `${num}. ${name}` };
    });
  
    // Current selection from URL (?chapter=)
    $: selectedChapterNum = (() => {
      const raw = qp.get('chapter');
      const n = raw ? Number(raw) : NaN;
      return Number.isFinite(n) && n > 0 ? n : null;   // null => All
    })();
  
    // 🔧 Reactive controlled value (was non-reactive before)
    $: localChapter = selectedChapterNum ? String(selectedChapterNum) : "";
  
    // Right-side info chips
    $: rightChapterText = selectedChapterNum ? `Chapter ${selectedChapterNum}` : 'All chapters';
    $: rightExerciseText = exercise?.trim?.() ? exercise.trim() : 'All';
  
    // 🔧 Define disabled state (fixes ReferenceError)
    $: isDisabled = !chapterOptions.length;
  
    function commitChapterChange(nextVal) {
      const nextNum = nextVal === "" ? null : Number(nextVal);
  
      // Optional event for observers
      dispatch('chapterChange', { chapter: nextNum });
  
      // Update URL (keeps your current flow)
      const q = new URLSearchParams();
      if (tcode) q.set('tcode', tcode);
      if (nextNum) q.set('chapter', String(nextNum)); // omit => All
      // drop stale exercise on chapter change
      goto(`/syllabus?${q.toString()}`, { keepfocus: true, noScroll: true });
    }
  
    function onSelectChange() {
      commitChapterChange(localChapter);
    }
  </script>
  
  <div class="bar" role="region" aria-label="Syllabus title and chapter selector">
    <!-- LEFT: labeled chapter dropdown -->
    <div class="left">
      <label class="label" for="chapterSelect">Chapter</label>
      <div class="selectWrap">
        <select
          id="chapterSelect"
          class="select"
          bind:value={localChapter}
          on:change={onSelectChange}
          aria-label="Choose chapter"
          disabled={isDisabled}
        >
          <option value="">All chapters</option>
          {#each chapterOptions as opt}
            <option value={opt.value}>{opt.label}</option>
          {/each}
        </select>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </div>
  
    <!-- RIGHT: compact, high-signal info -->
    <div class="right">
      <div class="pill" title="Selected chapter">
        <span class="pillLabel">Chapter</span>
        <span class="pillValue">{rightChapterText}</span>
        {#if chapterCount}
          <span class="sep">·</span>
          <span class="soft">{chapterCount}</span>
        {/if}
      </div>
  
      <div class="pill" title="Selected exercise">
        <span class="pillLabel">Exercise</span>
        <span class="pillValue">{rightExerciseText}</span>
        {#if exerciseCount}
          <span class="sep">·</span>
          <span class="soft">{exerciseCount}</span>
        {/if}
      </div>
  
      {#if tcodeTotal}
        <div class="pill" title="Total questions">
          <span class="pillLabel">Total</span>
          <span class="pillValue">{tcodeTotal}</span>
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .bar {
      position: sticky;
      top: 0;
      z-index: 20;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.75rem;
      align-items: center;
      padding: 0.8rem 1rem;
      background: var(--backgroundElevated, rgba(15,17,24,0.55));
      backdrop-filter: blur(6px);
      border-bottom: 1px solid color-mix(in oklab, var(--primaryText, #fff) 16%, transparent);
    }
  
    /* LEFT */
    .left {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.5rem 0.8rem;
      align-items: center;
    }
    .label {
      font-size: 0.8rem;
      opacity: 0.8;
      margin-right: 0.2rem;
      white-space: nowrap;
    }
    .selectWrap {
      position: relative;
      display: inline-block;
      min-width: min(64vw, 26rem);
    }
    .select {
      width: 100%;
      appearance: none;
      background: var(--surface, #0b1320);
      color: var(--primaryText, #fff);
      border: 1px solid color-mix(in oklab, var(--primaryText, #fff) 22%, transparent);
      border-radius: 0.65rem;
      padding: 0.55rem 2.2rem 0.55rem 0.75rem;
      font-size: 0.95rem;
      line-height: 1.25;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
    }
    .select:focus {
      outline: none;
      box-shadow: 0 0 0 2px color-mix(in oklab, var(--primaryText, #fff) 35%, transparent);
    }
    .chev {
      position: absolute;
      right: 0.7rem;
      top: 50%;
      width: 1.1rem;
      height: 1.1rem;
      transform: translateY(-50%);
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      opacity: 0.7;
      pointer-events: none;
    }
  
    /* RIGHT */
    .right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.6rem;
      border-radius: 999px;
      background: color-mix(in oklab, var(--primaryText, #fff) 10%, transparent);
      border: 1px solid color-mix(in oklab, var(--primaryText, #fff) 12%, transparent);
      font-size: 0.9rem;
    }
    .pillLabel { opacity: 0.7; }
    .pillValue { font-weight: 700; }
    .sep { opacity: 0.5; }
    .soft { opacity: 0.8; }
  
    /* Mobile */
    @media (max-width: 640px) {
      .bar {
        grid-template-columns: 1fr;
        gap: 0.6rem;
        padding: 0.7rem 0.8rem;
      }
      .left {
        grid-template-columns: 1fr;
        gap: 0.35rem;
      }
      .selectWrap { min-width: 0; }
      .right { justify-content: space-between; }
    }
  </style>
  