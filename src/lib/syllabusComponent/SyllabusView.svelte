
<script>
    import Nav from "../appComps/Nav.svelte";
    import Footer from "../appComps/Footer.svelte";
    import NavBar from "../syllabusComponent/NavBar.svelte";
    import ChaptersPage from "./ChaptersPage.svelte";
    import ExercisePage from "./ExercisePage.svelte";
    import QuestionCard from "./QuestionCard.svelte";
  
    export let syllabus;
    export let user = null;
    export let isSubscribed = false;
  
    const chapters = Array.from(syllabus.chaptersMap.values());
  
    let selectedChapter = null;
    let selectedExercise = null;
  
    $: currentHero = selectedExercise
      ? selectedExercise
      : selectedChapter
        ? selectedChapter
        : syllabus;

  </script>
  
  <Nav />
  
  <NavBar
    tcode={syllabus.tcodeName}
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
        {selectedChapter}
        {isSubscribed}
        onSelectChapter={(ch) => (selectedChapter = ch)}
      />
    {:else if selectedChapter && !selectedExercise}
      <ExercisePage
        chapter={selectedChapter}
        {selectedExercise}
        {isSubscribed}
        onSelectExercise={(ex) => {
          selectedExercise = ex;
          selectedChapter = selectedChapter;
        }}
      />
    {:else if selectedExercise}
      <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
        {#each selectedExercise.questions as q (q.tcodeUrl())}
          <QuestionCard question={q} {isSubscribed} />
        {/each}
      </div>
    {/if}
  </div>
  
  <Footer />
  