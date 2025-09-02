<script>
    import QuestionCard from "./QuestionCard.svelte";
    import ExNavBar from "./ExNavBar.svelte";
    export let data;
  
    // ————— Utils —————
    const lc = (s) => (s ?? '').toString().trim().toLowerCase();
    const getChapterSlug = (q) =>
      q?.chapter ?? q?.chapterFilename ?? q?.chapter_slug ?? q?.chapterName ??
      (q?.filename ?? '').split('__')[1] ?? '';
    const getExerciseSlug = (q) =>
      q?.exercise ?? q?.exerciseSlug ?? (q?.filename ?? '').split('__')[2] ?? '';
  
    // ————— Base derivations —————
    $: tcode    = data?.tcode ?? '';
    $: synopsis = data?.synopsis ?? null;
    $: items    = Array.isArray(data?.items)
      ? data.items
      : (Array.isArray(data?.questions) ? data.questions : []);
  
    // Normalize once (cache lowercase slugs for fast filters/counts)
    $: normalized = items.map((q) => ({
      ...q,
      _ch: lc(getChapterSlug(q)),
      _ex: lc(getExerciseSlug(q))
    }));
  
    // Chapters + active chapter
    $: chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
    $: activeChapter =
      data?.selected?.chapter ??
      (chapters[0]?.filename ?? chapters[0]?.slug ?? '');
    $: activeChapterL = lc(activeChapter);
  
    // Exercise selection
    let activeExercise = 'all';
    $: activeExerciseL = lc(activeExercise);
  
    function pickChapter(filenameOrSlug) {
      activeChapter  = filenameOrSlug;
      activeExercise = 'all';
    }
  
    // Exercises for the active chapter
    $: exercises =
      chapters.find((c) =>
        [c?.filename, c?.slug].map(lc).includes(activeChapterL)
      )?.exercises ?? [];
  
    // ExNavBar inputs
    $: exButtons = [{ name: 'All', filename: 'all' }, ...exercises];
  
    // Counts (by exercise, scoped to active chapter)
    $: exCounts = (() => {
      const inChapter = normalized.filter((q) => {
        // tolerant chapter match
        return !activeChapterL ||
               q._ch === activeChapterL ||
               activeChapterL.includes(q._ch) ||
               q._ch.includes(activeChapterL);
      });
  
      const by = inChapter.reduce((acc, q) => {
        acc[q._ex] = (acc[q._ex] ?? 0) + 1;
        return acc;
      }, {});
  
      const out = { all: { total: inChapter.length } };
      for (const ex of exercises) {
        const slug = lc(ex?.filename ?? ex?.slug ?? '');
        out[slug || ''] = { total: by[slug] ?? 0 };
      }
      return out;
    })();
  
    // Final questions (chapter + exercise)
    $: filteredQuestions = normalized.filter((q) => {
      const inChapter =
        !activeChapterL ||
        q._ch === activeChapterL ||
        activeChapterL.includes(q._ch) ||
        q._ch.includes(activeChapterL);
  
      if (!inChapter) return false;
      if (activeExerciseL === 'all') return true;
      return q._ex === activeExerciseL;
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

.top{ padding:16px 14px; border-bottom:1px solid #1e2a3a; background-color:#1e2a3a; }
.top h1{ margin:0 0 6px 0; font-size:1.35rem; }
.meta{ display:flex; gap:16px; flex-wrap:wrap; color:#9fb0c5; align-items:center; }

/* Page-level layout: keep grid here only */
.wrap{ display:grid; grid-template-columns:260px 1fr; min-height:calc(100vh - 70px); }

/* Sidebar (flex lists) */
.left{ border-right:1px solid #1e2a3a; padding:12px; background:#0a121c; }
.left h2{ margin:0 0 10px 0; font-size:1rem; color:#9fb0c5; }
.list{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
.list button{
  width:100%; text-align:left;
  display:flex; align-items:center; gap:8px;
  padding:8px 10px; border:1px solid #223042; background:#0a121c; color:#e6ebf1; border-radius:10px;
}
.list button.active{ border-color:#3b82f6; background:#0b1530; }
.idx{ width:28px; flex:0 0 28px; text-align:right; opacity:.7; }
.title{ flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

/* Main column (flex stack) */
.main{
  padding:16px 18px;
  display:flex; flex-direction:column; gap:12px; align-items:stretch;
}

/* ExNavBar wrapper: no extra spacing */
.exwrap{ display:flex; margin:0; padding:0; align-items:center; }
.exwrap > :first-child{ margin:0; } /* neutralize any default margins from ExNavBar root */

/* Questions section: tight vertical rhythm */
.qsec{ display:flex; flex-direction:column; gap:8px; margin:0; padding:0; }
.qsec > h2{ margin:4px 0 6px; }
.count{ color:#9fb0c5; margin-left:6px; }

/* Card area */
.qwrap{ display:flex; justify-content:center; margin:0; padding:0; }
/* If QuestionCard applies min-heights or outer margins, clamp them here */
.qwrap :global(.question-card-root){ margin:0 !important; min-height:unset !important; }

@media (max-width:880px){
  .wrap{ grid-template-columns:1fr; }
  .left{ border-right:0; border-bottom:1px solid #1e2a3a; }
}
</style>