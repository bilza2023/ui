<script>
    // Provided by +page.server.js
    import QuestionCard from "./QuestionCard.svelte";
    export let data;
  
    // Derive safely
    $: tcode    = data?.tcode ?? '';
    $: synopsis = data?.synopsis ?? null;
    $: items    = Array.isArray(data?.items) ? data.items : [];
  
    // Chapters (left panel)
    $: chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
  
    // Active chapter: prefer URL/SSR; else default to first chapter's filename/slug
    $: activeChapter =
      (data?.selected?.chapter) ||
      (chapters[0]?.filename ?? chapters[0]?.slug ?? '');
  
    // Exercises for the active chapter (display only)
    $: exercises =
      chapters.find(c =>
        c.filename === activeChapter ||
        c.slug === activeChapter
      )?.exercises ?? [];
  
    function pickChapter(filenameOrSlug) {
      activeChapter = filenameOrSlug;
    }
  
    // ── Tolerant filtering (handles different field names / filename parsing) ──
    const lc = (s) => (s ?? '').toString().trim().toLowerCase();
    const chapterFromQuestion = (q) => {
      // try direct fields first
      const direct =
        q.chapter ??
        q.chapterFilename ??
        q.chapter_slug ??
        q.chapterName ??
        '';
      if (direct) return direct;
  
      // fallback: parse 2nd segment from filename like "tcode__chapter__exercise__q001"
      const seg = (q.filename ?? '').split('__')[1] ?? '';
      return seg;
      };
  
    $: filteredQuestions = items.filter((q) => {
      if (!activeChapter) return true;
      const a = lc(activeChapter);
      const b = lc(chapterFromQuestion(q));
      return b === a || a.includes(b) || b.includes(a);
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
        <section>
          <h2>Exercises in: <span class="mono">{activeChapter || '—'}</span></h2>
          {#if exercises.length === 0}
            <p class="muted">No exercises found for this chapter.</p>
          {:else}
            <div class="grid">
              {#each exercises as ex}
                <div class="card">
                  <div class="title">{ex.name}</div>
                  <div class="slug">{ex.filename ?? ex.slug}</div>
                </div>
              {/each}
            </div>
          {/if}
        </section>
  
        <section class="qsec">
          <h2>
            Questions for <span class="mono">{activeChapter || '—'}</span>
            <span class="count">({filteredQuestions.length})</span>
          </h2>
  
          {#if filteredQuestions.length === 0}
            <p class="muted">No questions for this chapter.</p>
          {:else}        
                <div class="flex justify-center ">
                    <QuestionCard items={filteredQuestions} />
                </div>
 
          {/if}
        </section>
  
      </main>
    </div>
  {/if}
  
  <style>
    :global(body){ background:#0b1018; color:#e6ebf1; }
    .muted{ color:#9fb0c5; }
    .mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
  
    .top{ padding:16px 14px; border-bottom:1px solid #1e2a3a; }
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
    .grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:12px; }
    .card{ border:1px solid #223042; border-radius:12px; padding:12px; background:#0a121c; display:grid; gap:6px; }
    .card .title{ font-weight:600; }
    .card .slug{ color:#7a90a9; font-size:.9rem; }
  
    .qsec h2{ margin:12px 0; }
    .count{ color:#9fb0c5; margin-left:6px; }
   
    @media (max-width: 880px){
      .wrap{ grid-template-columns: 1fr; }
      .left{ border-right:0; border-bottom:1px solid #1e2a3a; }
    }
  </style>
  