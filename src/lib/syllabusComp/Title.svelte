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
</script>

<header class="titlebar">
  <!-- Left: big title -->
  <div class="title-left">
    <div class="eyebrow">Syllabus</div>
    <h1 class="hero">{displayTitle}</h1>

    <div class="sub">
      <span class="k">Chapter</span>
      <span class="v">{chapter || "—"}</span>
      <span class="dot">•</span>
      <span class="k">Exercise</span>
      <span class="badge">{displayExercise}</span>
    </div>
  </div>

  <!-- Right: compact stats “table” -->
  <div class="title-right">
    <div class="stat">
      <div class="stat-k">Chapter total</div>
      <div class="stat-v">{chapterCount}</div>
    </div>
    <div class="stat">
      <div class="stat-k">Exercise total</div>
      <div class="stat-v">{exerciseCount}</div>
    </div>
    <div class="stat">
      <div class="stat-k">Tcode total</div>
      <div class="stat-v">{tcodeTotal}</div>
    </div>
  </div>
</header>

<style>
  .titlebar{
    display:grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items:end;
    padding: 12px 0 16px 0;
    border-bottom: 1px solid var(--borderColor);
  }

  /* Left side */
  .eyebrow{
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--primaryText) 65%, var(--surfaceColor));
    margin-bottom: 2px;
  }
  .hero{
    font-size: clamp(24px, 4vw, 40px); /* ≈ 4xl at desktop */
    line-height: 1.1;
    margin: 0 0 6px 0;
    color: var(--primaryText);
  }
  .sub{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:8px;
    color: color-mix(in oklab, var(--primaryText) 85%, var(--surfaceColor));
  }
  .k{ opacity:.8; }
  .v{ font-weight:600; }
  .dot{ opacity:.5; }

  .badge{
    display:inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    background: color-mix(in oklab, var(--accentColor) 16%, var(--surfaceColor));
    color: var(--primaryText);
    font-size: 12px;
    line-height: 1.2;
  }

  /* Right side: stats table */
  .title-right{
    display:grid;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    gap: 8px;
  }
  .stat{
    display:grid;
    grid-template-rows: auto auto;
    gap: 4px;
    padding: 10px 12px;
    border: 1px solid var(--borderColor);
    border-radius: 12px;
    background: color-mix(in oklab, var(--surfaceColor) 92%, var(--backgroundColor));
    min-width: 120px;
  }
  .stat-k{
    font-size:12px;
    opacity:.75;
  }
  .stat-v{
    font-size: 22px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--primaryText);
  }

  /* Responsive: stack stats under title on small widths */
  @media (max-width: 900px){
    .titlebar{
      grid-template-columns: 1fr;
      align-items: start;
    }
    .title-right{
      grid-template-columns: repeat(3, minmax(90px, 1fr));
    }
  }
  @media (max-width: 600px){
    .title-right{
      grid-template-columns: repeat(2, minmax(110px, 1fr));
    }
  }
</style>
