<script>
  import QuestionCard from "./QuestionCard.svelte";
  import ExNavBar from "./ExNavBar.svelte";
  import Nav from "../../lib/appComps/Nav.svelte";
  export let data;

  const lc = (s) => (s ?? "").toString().trim().toLowerCase();

  // Base inputs
  $: tcode    = data?.tcode ?? "";
  $: synopsis = data?.synopsis ?? null;
  $: items    = Array.isArray(data?.items)
    ? data.items
    : (Array.isArray(data?.questions) ? data.questions : []);

  // Chapters, plus a lookup from numeric chapter index (1-based) → slug
  $: chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
  $: chIndexToSlug = chapters.map((c) => lc(c?.slug ?? ""));

  // Normalize questions: chapter numbers → slugs; exercise already uses slugs
  $: normalized = items.map((q) => {
    const ch = q?.chapter;
    const chSlug = typeof ch === "number"
      ? (chIndexToSlug[ch - 1] ?? "")
      : lc(ch ?? "");
    return {
      ...q,
      _ch: chSlug,
      _ex: lc(q?.exercise ?? "")
    };
  });

  // Active chapter (slug)
  let activeChapter = (data?.selected?.chapter && String(data.selected.chapter)) || "";
  $: { if (!activeChapter && chapters[0]?.slug) activeChapter = chapters[0].slug; }
  $: activeChapterL = lc(activeChapter);

  function pickChapter(slug) {
    activeChapter  = slug;
    activeExercise = "all";
  }

  // Current chapter's exercises
  $: activeChapterObj =
    chapters.find((c) => lc(c?.slug) === activeChapterL) || null;

  $: exercises = Array.isArray(activeChapterObj?.exercises)
    ? activeChapterObj.exercises
    : [];

  // Exercise filter
  let activeExercise = "all";
  $: activeExerciseL = lc(activeExercise);

  // ExNavBar inputs
  $: exButtons = [{ name: "All", slug: "all" }, ...exercises];

  // Counts per exercise for the active chapter
  $: exCounts = (() => {
    const inChapter = normalized.filter((q) => q._ch === activeChapterL);
    const by = inChapter.reduce((acc, q) => {
      acc[q._ex] = (acc[q._ex] ?? 0) + 1;
      return acc;
    }, {});
    const out = { all: { total: inChapter.length } };
    for (const ex of exercises) {
      const key = lc(ex?.slug ?? "");
      out[key] = { total: by[key] ?? 0 };
    }
    return out;
  })();

  // Final filtered list
  $: filteredQuestions = normalized.filter((q) => {
    if (q._ch !== activeChapterL) return false;
    if (activeExerciseL === "all") return true;
    return q._ex === activeExerciseL;
  });
</script>

<Nav />

<div class="top">
  <h1>Syllabus</h1>
  <div class="meta">
    <div><strong>tcode:</strong> {tcode || "—"}</div>
    {#if synopsis?.name}<div><strong>name:</strong> {synopsis.name}</div>{/if}
    {#if synopsis?.description}<div><strong>desc:</strong> {synopsis.description}</div>{/if}
  </div>
</div>

{#if !synopsis}
  <p class="muted">No synopsis received. Provide <code>?tcode=...</code>.</p>
{:else}
  <div class="wrap">
    <aside class="left">
      <h2>Chapters ({chapters.length})</h2>
      <ul class="list">
        {#each chapters as ch, i (ch.slug)}
          <li>
            <button
              class:active={activeChapter === ch.slug}
              on:click={() => pickChapter(ch.slug)}
              title={ch.name}
            >
              <span class="idx">{i + 1}</span>
              <span class="title">{ch.name}</span>
            </button>
          </li>
        {/each}
      </ul>
    </aside>

    <main class="main">
      {#key activeChapter}
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
            Questions for <span class="mono">{activeChapter || "—"}</span>
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
  :global(body){
    background: var(--backgroundColor);
    color: var(--primaryText);
  }
  .muted{ color: var(--secondaryText); }
  .mono{
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  }

  .top{
    padding:16px 14px;
    border-bottom:1px solid var(--borderColor);
    background-color: var(--surfaceColor);
  }
  .top h1{ margin:0 0 6px 0; font-size:1.35rem; }
  .meta{
    display:flex; gap:16px; flex-wrap:wrap;
    color: var(--secondaryText); align-items:center;
  }

  .wrap{
    display:grid; grid-template-columns:260px 1fr;
    min-height:calc(100vh - 70px);
  }

  .left{
    border-right:1px solid var(--borderColor);
    padding:12px; background: var(--surfaceColor);
  }
  .left h2{
    margin:0 0 10px 0; font-size:1rem; color: var(--secondaryText);
  }
  .list{
    list-style:none; padding:0; margin:0;
    display:flex; flex-direction:column; gap:6px;
  }
  .list button{
    width:100%; text-align:left;
    display:flex; align-items:center; gap:8px;
    padding:8px 10px;
    border:1px solid var(--borderColor);
    background: var(--surfaceColor);
    color: var(--primaryText);
    border-radius:10px;
  }
  .list button.active{
    border-color: var(--primaryColor);
    background: var(--backgroundColor);
  }
  .idx{
    width:28px; flex:0 0 28px; text-align:right; opacity:.7;
  }
  .title{
    flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }

  .main{
    padding:16px 18px;
    display:flex; flex-direction:column; gap:12px; align-items:stretch;
  }

  .exwrap{
    display:flex; margin:0; padding:0; align-items:center;
  }

  .qsec{
    display:flex; flex-direction:column; gap:8px; margin:0; padding:0;
  }
  .qsec > h2{ margin:4px 0 6px; }
  .count{ color: var(--secondaryText); margin-left:6px; }

  @media (max-width:880px){
    .wrap{ grid-template-columns:1fr; }
    .left{ border-right:0; border-bottom:1px solid var(--borderColor); }
  }
</style>
