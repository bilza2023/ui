<!-- /src/lib/syllabusComp/SyllabusTitle.svelte -->
<script>
  // Keep existing API (no breaking)
  export let chapter = "";         // selected chapter display name
  export let chapterCount = 0;     // total questions in selected chapter
  export let tcodeTotal = 0;       // total questions in the whole tcode
  export let exerciseCount = 0;    // total questions in selected exercise
  export let exercise = "";        // selected exercise slug/name (may be "" = All)

  // Optional: if parent ever passes it, we’ll prefer it on the left
  export let tcodeName = "";       // (optional) big title; falls back to chapter

  const displayTitle = tcodeName || chapter || "Syllabus";
  const displayExercise = exercise?.trim() ? exercise : "All";

  // Compact stats (shown only on very small screens)
  $: statsCompact = `C ${chapterCount} • E ${exerciseCount} • T ${tcodeTotal}`;
</script>

<header class="titlebar">
  <!-- Left group -->
  <div class="title-left">
    <div class="chip chip-title" title={displayTitle}>
      <span class="title-text">{displayTitle}</span>
    </div>

    <div class="chip chip-meta chapter-chip">
      <span class="k">Chapter</span>
      <span class="v">{chapter || "—"}</span>
    </div>

    <div class="chip chip-meta exercise-chip">
      <span class="k">Exercise</span>
      <span class="badge">{displayExercise}</span>
    </div>
  </div>

  <!-- Right group: three stat cards (hidden on very small screens) -->
  <div class="title-right">
    <div class="chip chip-stat chapter-total">
      <div class="stat-k">Chapter total</div>
      <div class="stat-v">{chapterCount}</div>
    </div>
    <div class="chip chip-stat exercise-total">
      <div class="stat-k">Exercise total</div>
      <div class="stat-v">{exerciseCount}</div>
    </div>
    <div class="chip chip-stat tcode-total">
      <div class="stat-k">Tcode total</div>
      <div class="stat-v">{tcodeTotal}</div>
    </div>
  </div>

  <!-- Ultra-compact single stats chip (only for the smallest screens) -->
  <div class="chip chip-stat-compact" aria-label="Totals compact">
    {statsCompact}
  </div>
</header>

<style>
  /* === ONE-LINE STRIP WITH ITS OWN FULL-BLEED HORIZONTAL SCROLL === */
  .titlebar{
    display: flex;
    align-items: stretch;
    gap: 10px;
    /* Full-bleed so parent padding/overflow can't clip us */
    inline-size: 100vw;
    margin-inline: calc(50% - 50vw);
    padding-inline: min(24px, 4vw);

    padding-block: 10px 14px;
    border-bottom: 1px solid var(--borderColor);
    overflow-x: auto;                 /* our own horizontal scroll */
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-gutter: stable both-edges;

    /* Subtle fade at edges to hint scroll */
    -webkit-mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
            mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
  }
  .titlebar * { font-size: inherit; }

  .title-left,
  .title-right{
    display: inline-flex;
    align-items: stretch;
    gap: 10px;
    flex: 0 0 auto;
  }

  /* === CHIP / CARD BASE === */
  .chip{
    display: grid;
    align-content: center;
    gap: 4px;
    padding: 8px 12px;
    border: 1px solid var(--borderColor);
    border-radius: 12px;
    background: color-mix(in oklab, var(--surfaceColor) 92%, var(--backgroundColor));
    color: var(--primaryText);
  }

  /* Title chip */
  .chip-title{
    grid-auto-flow: column;
    align-items: center;
    font-weight: 800;
    letter-spacing: .2px;
    background: color-mix(in oklab, var(--accentColor) 8%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--accentColor) 35%, var(--borderColor));
  }
  .chip-title .title-text{
    font-size: clamp(16px, 2.4vw, 20px);
    max-width: min(52vw, 520px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.2;
  }

  /* Meta chips */
  .chip-meta{
    display: inline-grid;
    grid-auto-flow: column;
    gap: 8px;
    align-items: center;
    font-size: 13px;
  }
  .chapter-chip{
    background: color-mix(in oklab, var(--primaryColor) 10%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--primaryColor) 35%, var(--borderColor));
  }
  .exercise-chip{
    background: color-mix(in oklab, var(--secondaryColor) 10%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--secondaryColor) 35%, var(--borderColor));
  }
  .k{ opacity:.8; }
  .v{ font-weight:600; min-width: 0; }

  .badge{
    display:inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    background: color-mix(in oklab, var(--accentColor) 16%, var(--surfaceColor));
    color: var(--primaryText);
    font-size: 12px;
    line-height: 1.2;
    white-space: nowrap;
  }

  /* Stat chips (default) */
  .chip-stat{
    min-width: 120px;
    background: color-mix(in oklab, var(--surfaceColor) 92%, var(--backgroundColor));
    position: relative;
    padding-left: 12px;
    flex: 0 0 auto;
  }
  .chip-stat .stat-k{
    font-size: 12px;
    opacity: .75;
    white-space: nowrap;
  }
  .chip-stat .stat-v{
    font-size: clamp(18px, 3vw, 22px);
    font-weight: 800;
    line-height: 1.1;
  }
  .chapter-total{
    background: color-mix(in oklab, var(--primaryColor) 8%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--primaryColor) 35%, var(--borderColor));
    box-shadow: inset 3px 0 0 0 color-mix(in oklab, var(--primaryColor) 60%, transparent);
  }
  .exercise-total{
    background: color-mix(in oklab, var(--secondaryColor) 8%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--secondaryColor) 35%, var(--borderColor));
    box-shadow: inset 3px 0 0 0 color-mix(in oklab, var(--secondaryColor) 60%, transparent);
  }
  .tcode-total{
    background: color-mix(in oklab, var(--accentColor) 8%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--accentColor) 35%, var(--borderColor));
    box-shadow: inset 3px 0 0 0 color-mix(in oklab, var(--accentColor) 60%, transparent);
  }

  /* Compact single stats chip (hidden by default; shown on smallest screens) */
  .chip-stat-compact{
    display: none;
    font-weight: 700;
    font-size: 13px;
    background: color-mix(in oklab, var(--surfaceColor) 90%, var(--backgroundColor));
    border-color: color-mix(in oklab, var(--accentColor) 35%, var(--borderColor));
  }

  /* ===== RESPONSIVE REMOVALS (prioritize fitting without cut-off) ===== */

  /* 1) Tighten spacing and sizes a bit on small screens */
  @media (max-width: 720px){
    .title-left, .title-right{ gap: 8px; }
    .chip{ padding: 8px 10px; }
    .chip-stat{ min-width: 110px; }
    /* Shorten labels inside meta */
    .chapter-chip .k,
    .exercise-chip .k { display: none; }
  }

  /* 2) Remove the Chapter chip entirely if space is tight */
  @media (max-width: 640px){
    .chapter-chip{ display: none; }
  }

  /* 3) Remove the Exercise chip; replace 3 stats with 1 compact chip */
  @media (max-width: 560px){
    .exercise-chip{ display: none; }
    .title-right{ display: none; }      /* hide 3 stat cards */
    .chip-stat-compact{ display: grid; }/* show compact totals */
  }

  /* 4) Ultra-small phones: make title a bit narrower for safety */
  @media (max-width: 420px){
    .chip-title .title-text{ max-width: 58vw; }
  }

  /* Hide any legacy "sub" row if present */
  .sub{ display:none; }
</style>
