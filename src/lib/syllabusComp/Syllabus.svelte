<script>
  
    // Import child components (already working)
    import LeftChaptersBar from "./LeftChaptersBar.svelte";
    import ExNavBar from "./ExNavBar.svelte";
    import QuestionCard from "./QuestionCard.svelte";
    import SyllabusTitle from "./SyllabusTitle.svelte";

    // Incoming props from +page.svelte
    export let tcode = "";
    export let synopsis = null;      // syllabus tree with chapters/exercises
    export let selected = { chapter: "", exercise: "" };
    export let items = [];           // flat question list

    // Local reactive state (drives navigation without reloads)
    let activeChapter = selected.chapter || (synopsis?.chapters?.[0]?.slug ?? "");
    let activeExercise = selected.exercise || "";
  
    // Derive exercises for the current chapter
    $: exercises =
      synopsis?.chapters?.find(c => c.slug === activeChapter)?.exercises ?? [];
  
    // Filter items for the current selection
    $: filteredItems = items.filter(q =>
      q.chapter === Number(activeChapter) &&
      (!activeExercise || q.exercise === activeExercise)
    );
  
    // Event handlers from children
    function onPickChapter(e) {
      activeChapter = e.detail.slug;
      activeExercise = ""; // reset when chapter changes
    }
  
    function onPickExercise(e) {
      activeExercise = e.detail.slug;
    }
  </script>
  
  <!-- Title bar -->
  <SyllabusTitle
    {tcode}
    name={synopsis?.name}
    description={synopsis?.description}
    image={synopsis?.image}
  />
  
  <div class="syllabus-layout">
    <!-- Left sidebar: chapters -->
    <LeftChaptersBar
      chapters={synopsis?.chapters ?? []}
      activeSlug={activeChapter}
      on:pick={onPickChapter}
    />
  
    <div class="syllabus-main">
      <!-- Exercise navigation for current chapter -->
      <ExNavBar
        exercises={exercises}
        activeSlug={activeExercise}
        on:pick={onPickExercise}
      />
  
      <!-- Question cards -->
      <div class="questions">
        {#each filteredItems as q (q.slug)}
          <QuestionCard {q} />
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    /* Basic layout (inherits all styles/tokens from existing components) */
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
    .questions {
      display: grid;
      gap: 1rem;
    }
  </style>
  