<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import TaleemBanner from "../TaleemBanner.svelte";
  import Footer from "../../../lib/appComps/Footer.svelte";
  import NavBar from "../../../lib/syllabusComponent/NavBar.svelte";
  import ChaptersPage from "../../../lib/syllabusComponent/ChaptersPage.svelte";
  import ExercisePage from "../../../lib/syllabusComponent/ExercisePage.svelte";
  import QuestionCard from "../../../lib/syllabusComponent/QuestionCard.svelte";

  import fbise9physics from "../../../lib/syllabusData/fbise9physics";
  
  console.log("fbise9physics" ,fbise9physics);
  
  const syllabus = fbise9physics;
  const chapters = Array.from(syllabus.chaptersMap.values());

  let selectedChapter = null;
  let selectedExercise = null;
  let user = null;
  let isSubscribed = false; // mocked

  // Dynamically choose correct hero content
  $: currentHero = selectedExercise
    ? selectedExercise
    : selectedChapter
    ? selectedChapter
    : syllabus;
</script>

<Nav />

<NavBar
  tcode={syllabus.tcodeName}
  selectedChapter={selectedChapter}
  selectedExercise={selectedExercise}
  onBackToChapters={() => {
    selectedChapter = null;
    selectedExercise = null;
  }}
  onBackToExercises={() => {
    selectedExercise = null;
  }}
/>

<TaleemBanner {...currentHero.heroData()} />

<div class="min-h-[500px]">
  {#if !selectedChapter}
    <ChaptersPage
      {chapters}
      {selectedChapter}
      {isSubscribed}
      onSelectChapter={ch => selectedChapter = ch}
    />
  {:else if selectedChapter && !selectedExercise}
    <ExercisePage
      chapter={selectedChapter}
      selectedExercise={selectedExercise}
      isSubscribed={isSubscribed}
      onSelectExercise={ex => {
        selectedExercise = ex;
        // ensure chapter is preserved for breadcrumb
        selectedChapter = selectedChapter;
      }}
    />
  {:else if selectedExercise}
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each selectedExercise.questions as q (q.tcodeUrl())}
        <QuestionCard question={q} isSubscribed={isSubscribed} />
      {/each}
    </div>
  {/if}
</div>

<Footer />
