<script>
  import SyllabusTitle from "./SyllabusTitle.svelte";
  import UCard from '$lib/components/UCard.svelte';
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
    export let synopsis;
    export let items;
    export let selected = { chapter: "", exercise: "" }; // { chapter?: string, exercise?: string }
    import ExNavBar from "./ExNavBar.svelte";
  
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

    //////////
    $: exNavExercises = [
  { slug: "", label: "All", total: chapterCount },
  ...exercises.map((ex) => ({
    slug: ex.slug,
    label: ex.name ?? ex.slug,
    total: items.filter((q) => q.exercise === ex.slug).length
  }))
];


  </script>
  
  
  <!-- Title/Header -->
  <SyllabusTitle
  chapter={activeChapterName}
  chapterCount={chapterCount}
  tcodeTotal={tcodeTotal}
  exerciseCount={exerciseCount}
  exercise={activeExercise}
/>

    <!-- Main column -->
    <div class="syllabus-main">
      <!-- Exercise Navbar for the active chapter -->
      <ExNavBar
      exercises={exNavExercises}
      activeSlug={activeExercise}
      on:pick={onPickExercise}
    />
   
    <div class="syllabus-layout">
      {#each filteredItems as row (row.id)}
        <UCard
          title={row.title || row.name || row.id}
          href={
            row.href
            || (row.type === 'note'   ? `/notes?id=${row.id}`
            :  row.type === 'deck'    ? `/player?id=${row.id}`
            :  undefined)
          }
          thumbnail={row.thumbnail || '/media/images/taleem.webp'}
        >
          {#if row.type || row.chapter || row.exercise || row.status}
            <small>
              {#if row.type}Type: {row.type}{/if}
              {#if row.chapter && row.exercise} · Ch {row.chapter} · {row.exercise}{/if}
              {#if row.status} · {row.status}{/if}
            </small>
          {/if}
        </UCard>
      {/each}
    </div>
    


    </div>
  <!-- </div> -->
  
  <style>
    /* Minimal wrapper; keep or replace with your old page styles if needed */
    .syllabus-layout { 
      padding-left: 2%;
    padding-right: 2%;
    display: flex;
    flex-wrap: wrap;          /* NEW: allow wrapping */
    gap: 1rem;
    align-items: flex-start;  /* keeps row heights tidy */
    }

    .syllabus-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  </style>
  