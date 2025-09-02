<script>
    // Provided by +page.server.js
    import QuestionCard from "./QuestionCard.svelte";
    import ExNavBar from "./ExNavBar.svelte";
    export let data;
  
    // Base derivations (robust fallbacks)
    $: tcode    = data?.tcode ?? '';
    $: synopsis = data?.synopsis ?? null;
    $: items    = Array.isArray(data?.items)
      ? data.items
      : (Array.isArray(data?.questions) ? data.questions : []);
  
    // Helpers (define before use)
    const lc = (s) => (s ?? '').toString().trim().toLowerCase();
  
    const chapterFromQuestion = (q) => {
      const direct =
        q?.chapter ??
        q?.chapterFilename ??
        q?.chapter_slug ??
        q?.chapterName ?? '';
      if (direct) return direct;
      // fallback from filename pattern: tcode__chapter__exercise__q001
      return (q?.filename ?? '').split('__')[1] ?? '';
    };
  
    const exerciseFromQuestion = (q) =>
      q?.exercise ??
      q?.exerciseSlug ??
      ((q?.filename ?? '').split('__')[2] ?? '');
  
    // Chapters (left panel)
    $: chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
  
    // Active chapter (SSR/URL first, else first chapter)
    $: activeChapter =
      data?.selected?.chapter ??
      (chapters[0]?.filename ?? chapters[0]?.slug ?? '');
  
    // Exercise selection state
    let activeExercise = 'all';
  
    // Chapter change handler (also reset exercise)
    function pickChapter(filenameOrSlug) {
      activeChapter  = filenameOrSlug;
      activeExercise = 'all';
    }
  
    // Exercises for the active chapter
    $: exercises =
      chapters.find((c) =>
        [c.filename, c.slug].map(lc).includes(lc(activeChapter))
      )?.exercises ?? [];
  
    // ExNavBar inputs
    $: exButtons = [{ name: 'All', filename: 'all' }, ...exercises];
  
    $: exCounts = (() => {
      const by = {};
      // per-exercise counts
      for (const ex of exercises) {
        const slug = ex?.filename ?? ex?.slug ?? '';
        const L = lc(slug);
        by[slug || ''] = {
          total: items.filter(
            (q) =>
              lc(chapterFromQuestion(q)).includes(lc(activeChapter)) &&
              lc(exerciseFromQuestion(q)) === L
          ).length
        };
      }
      // All = total in active chapter
      by['all'] = {
        total: items.filter(
          (q) => lc(chapterFromQuestion(q)).includes(lc(activeChapter))
        ).length
      };
      return by;
    })();
  
    // Final questions filter
    $: filteredQuestions = items.filter((q) => {
      const A = lc(activeChapter);
      const C = lc(chapterFromQuestion(q));
      const inChapter = !A || A === C || A.includes(C) || C.includes(A);
      if (!inChapter) return false;
  
      if (activeExercise === 'all') return true;
      return lc(exerciseFromQuestion(q)) === lc(activeExercise);
    });
  </script>
  
  <!-- Top -->
  <div class="top">
    <h1>Syllabus</h1>
    <div class="meta">
      <div><strong>tcode:</strong> {tcode || '—'}</div>
      {#if synopsis?.name}<div><strong>name:</strong> {synopsis.name}</div>{/if}
      {#if synopsis?.description}<div><strong>desc:</strong> {synopsis.description}</div>{/if}
    </div>
  </div>
  
  {#if !synopsis}
    <p class="muted">No synopsis received. Provide <code>?tcode=...</code> or check the API.</p>
  {:else}
    <div class="wrap">
      <!-- Left: Chapters -->
      <aside class="left">
        <h2>Chapters ({chapters.length})</h2>
        <ul class="list">
          {#each chapters as ch, i (ch.filename ?? ch.slug ?? i)}
            <li>
              <button
                class:active={(activeChapter === (ch.filename ?? ch.slug))}
                on:click={() => pickChapter(ch.filename ?? ch.slug)}
                title={ch.name}
              >
                <span class="idx">{i + 1}</span>
                <span class="title">{ch.name}</span>
              </button>
            </li>
          {/each}
        </ul>
      </aside>
  
      <!-- Main: Exercises + Questions -->
      <main class="main">
        {#key `${activeChapter}`}
          <div class="exwrap">
            <ExNavBar
              exercises={exButtons}
              activeSlug={activeExercise}
              counts={exCounts}
              on:pick={(e) => (activeExercise = e.detail.slug)}
            />
          </div>
      
          <section class="qsec">
            <h2>
              Questions for <span class="mono">{activeChapter || '—'}</span>
              <span class="count">({filteredQuestions.length})</span>
            </h2>
      
            {#if filteredQuestions.length === 0}
              <p class="muted">No questions for this chapter.</p>
            {:else}
              <div class="flex justify-center">
                <QuestionCard items={filteredQuestions} />
              </div>
            {/if}
          </section>
        {/key}
      </main>
      
    </div>
  {/if}
  
  <style>
    :global(body){ background:#0b1018; color:#e6ebf1; }
    .muted{ color:#9fb0c5; }
    .mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
  
    .top{ padding:16px 14px; border-bottom:1px solid #1e2a3a;background-color: #1e2a3a; }
    .top h1{ margin:0 0 6px 0; font-size:1.35rem; }
    .meta{ display:flex; gap:16px; flex-wrap:wrap; color:#9fb0c5; }
  
    .wrap{ display:grid; grid-template-columns: 260px 1fr; min-height: calc(100vh - 70px); }
    .left{ border-right:1px solid #1e2a3a; padding:12px; background:#0a121c; }
    .left h2{ margin:0 0 10px 0; font-size:1rem; color:#9fb0c5; }
    .list{ list-style:none; padding:0; margin:0; display:grid; gap:6px; }
    .list button{ width:100%; text-align:left; display:grid; grid-template-columns: 28px 1fr; gap:8px;
      padding:8px 10px; border:1px solid #223042; background:#0a121c; color:#e6ebf1; border-radius:10px; }
    .list button.active{ border-color:#3b82f6; background:#0b1530; }
    .idx{ opacity:.7; }
    .title{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  
    .main{ padding:16px 18px; display:grid; gap:20px; }
   
    .qsec h2{ margin:12px 0; }
    .count{ color:#9fb0c5; margin-left:6px; }
   
    @media (max-width: 880px){
      .wrap{ grid-template-columns: 1fr; }
      .left{ border-right:0; border-bottom:1px solid #1e2a3a; }
    }
  </style>
  