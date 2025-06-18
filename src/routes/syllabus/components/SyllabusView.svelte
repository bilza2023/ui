
<script>
    import Nav from "$lib/appComps/Nav.svelte";
    import Footer from "$lib/appComps/Footer.svelte";
    import NavBar from "$lib/syllabusComponent/NavBar.svelte";
    import ChaptersPage from "./ChaptersPage.svelte";
    import ExercisePage from "./ExercisePage.svelte";
    import QuestionCard from "./QuestionCard.svelte";
  
  export let syllabus; // full Tcode object
  export let user = null;
  export let isSubscribed = false;

  const chapters = syllabus.getNestedView();
   
  // console.log("chapters" ,chapters);

  let selectedChapter = null;
  let selectedExercise = null;

  $: console.log("selectedChapter", selectedChapter);
  $: console.log("selectedExercise", selectedExercise);
</script>

<Nav />

<NavBar
  tcode={syllabus.tcodeName || "Unknown"}
  {selectedChapter}
  {selectedExercise}
  onBackToChapters={() => {
    selectedChapter = null;
    selectedExercise = null;
  }}
  onBackToExercises={() => {
    selectedExercise = null;
  }}
/>

<div class="min-h-screen bg-[#160c00] pl-8">
  {#if !selectedChapter}
    <ChaptersPage
      {chapters}
      {isSubscribed}
      on:selectChapter={(e) => (selectedChapter = { ...e.detail })}
    />
  {:else if selectedChapter && !selectedExercise}
    <ExercisePage
      chapter={selectedChapter}
      {isSubscribed}
      on:selectExercise={(e) => (selectedExercise = { ...e.detail })}
    />
  {:else if selectedExercise}
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
      {#each selectedExercise.questions as q (q.id)}
        <QuestionCard question={q} {isSubscribed} />
      {/each}
    </div>
  {/if}
</div>

<Footer />
