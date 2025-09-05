<script>
    import {
      getExercisesForChapter,
      makeExerciseSet,
      chapterDisplayName,
      filterItems,
      countTcodeTotal,
      countChapterTotal,
      countExerciseTotal
    } from "./syllabusUtils";
  
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
  
    // Derive exercises + sets via utils
    $: exercises = getExercisesForChapter(synopsis, activeChapter);
    $: exSet = makeExerciseSet(exercises);
  
    // Filter questions via utils
    $: filteredItems = filterItems(items, activeExercise, exSet);
  
    // Handlers for child events
    function onPickChapter(e) {
      activeChapter = e.detail.slug;
      activeExercise = ""; // reset when chapter changes
    }
    function onPickExercise(e) {
      activeExercise = e.detail.slug;
    }
  
    // Title-bar derivations via utils
    $: activeChapterName = chapterDisplayName(synopsis, activeChapter);
  
    // Totals (init + reactives so they never log as "undefined")
    let tcodeTotal = 0;
    let chapterCount = 0;
    let exerciseCount = 0;
  
    $: tcodeTotal    = countTcodeTotal(items);
    $: chapterCount  = countChapterTotal(items, exSet);
    $: exerciseCount = countExerciseTotal(items, activeExercise);
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
  