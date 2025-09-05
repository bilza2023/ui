<!-- /src/lib/syllabusComp/Syllabus.svelte -->
<script>
    // Props from +page.svelte (loader data)
    export let tcode = "";
    export let synopsis = null;                 // { slug, name, description?, image?, chapters:[{ slug, name, exercises:[{ slug, name }] }] }
    export let selected = { chapter: "", exercise: "" }; // { chapter?: string, exercise?: string }
    export let items = [];                      // [{ slug, tcode, chapter, exercise, type:'deck'|'note', title, status, editedAt? }]
  
    // Child components (already working; NO changes)
    import LeftChaptersBar from "./LeftChaptersBar.svelte";
    import ExNavBar from "./ExNavBar.svelte";
    import QuestionCard from "./QuestionCard.svelte";
    import SyllabusTitle from "./SyllabusTitle.svelte";
  
    // Local state (slug-based navigation; no reloads within a tcode)
    let activeChapter  = selected.chapter || (synopsis?.chapters?.[0]?.slug ?? "");
    let activeExercise = selected.exercise || "";
  
    // Derive exercises for current chapter
    $: exercises =
      synopsis?.chapters?.find((c) => c.slug === activeChapter)?.exercises ?? [];
  
    // Fast lookup for current-chapter exercise slugs
    $: exSet = new Set(exercises.map((e) => e.slug));
  
    // Filter questions:
    // - If an exercise is picked → match that exercise
    // - Else → show all questions whose exercise belongs to the active chapter
    $: filteredItems = items.filter((q) =>
      activeExercise ? q.exercise === activeExercise : exSet.has(q.exercise)
    );
  
    // Handlers for child events
    function onPickChapter(e) {
      activeChapter = e.detail.slug;
      activeExercise = ""; // reset when chapter changes
    }
    function onPickExercise(e) {
      activeExercise = e.detail.slug;
    }
  
    // ---- title-bar derivations ----
    const N = (v) => (v == null ? "" : String(v).trim());
  
    // chapter display name (for passing to SyllabusTitle as activeChapterName)
    $: activeChapterName = (() => {
      const key = N(activeChapter);
      const chapters = Array.isArray(synopsis?.chapters) ? synopsis.chapters : [];
      const c = chapters.find((x) => N(x.slug) === key || N(x.filename) === key);
      return c?.name || key;
    })();
  
    // totals (init + reactives so they never log as "undefined")
    let tcodeTotal = 0;
    let chapterCount = 0;
    let exerciseCount = 0;
  
    $: tcodeTotal = Array.isArray(items) ? items.length : 0;
  
    // count all questions whose exercise belongs to the selected chapter
    $: chapterCount = Array.isArray(items) ? items.filter((q) => exSet.has(q.exercise)).length : 0;
  
    // count all questions in the selected exercise (0 if none selected)
    $: exerciseCount = activeExercise
      ? (Array.isArray(items) ? items.filter((q) => q.exercise === activeExercise).length : 0)
      : 0;
  
    // (debug)
    // console.log("chapterCount", chapterCount);
    // console.log("exerciseCount", exerciseCount);
  </script>
  
  <!-- Title/Header -->
  <SyllabusTitle
  chapter={activeChapterName}
  chapterCount={chapterCount}
  tcodeTotal={tcodeTotal}
  exerciseCount={exerciseCount}
  exercise={activeExercise}
/>

  <!-- Layout shell (keeps your existing token-based styles intact if class names match your old page) -->
  <div class="syllabus-layout">
    <!-- Chapter Sidebar -->
    <LeftChaptersBar
      chapters={synopsis?.chapters ?? []}
      activeSlug={activeChapter}
      on:pick={onPickChapter}
    />
  
    <!-- Main column -->
    <div class="syllabus-main">
      <!-- Exercise Navbar for the active chapter -->
      <ExNavBar
        exercises={exercises}
        activeSlug={activeExercise}
        on:pick={onPickExercise}
      />
  
      <!-- Question list (PASS ARRAY, not item-by-item) -->
      <QuestionCard items={filteredItems} />
    </div>
  </div>
  
  <style>
    /* Minimal wrapper; keep or replace with your old page styles if needed */
    .syllabus-layout {
      display: flex;
      gap: 1rem;
    }
    .syllabus-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  </style>
  