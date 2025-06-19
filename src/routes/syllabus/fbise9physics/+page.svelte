<script>
  import { fbise9physics } from "$lib/syllabusData/fbise9physics/index";
  import QuestionCard from "../components/QuestionCard.svelte";
  import Card from "../components/Card.svelte";
  import Nav from "$lib/appComps/Nav.svelte";  
  import NavBar from "../components/NavBar.svelte";

  let selectedChapter = null;
  let selectedExercise = null;

  function setSelectChapter(chapter) {
    selectedChapter = chapter;
  }

  function unSelectEx() {
    selectedExercise = null;
  }

  function unSelectCh() {
    selectedChapter = null;
  }

  function setSelectEx(ex) {
    selectedExercise = ex;
  }
</script>

<Nav />

<NavBar
  {fbise9physics}
  {selectedChapter}
  {selectedExercise}
  {unSelectEx}
  {unSelectCh}
/>

<div class="flex flex-wrap w-full justify-center gap-8 view-container">

  {#if !selectedChapter}
    {#each fbise9physics.chapters as chapter}
      <button class="chapter-item" on:click={() => setSelectChapter(chapter)}>
        <Card
          icon="🗃️"
          description={chapter.description}
          title={chapter.name}
          color="#007BFF"
        />
      </button>
      <br />
    {/each}
  {/if}

  {#if selectedChapter && !selectedExercise}
    {#each selectedChapter.exercises as exercise}
      <button class="chapter-item" on:click={() => setSelectEx(exercise)}>
        <Card
          icon="🏃"
          description={exercise.description}
          title={exercise.name}
          color="#007BFF"
        />
      </button>
      <br />
    {/each}
  {/if}

  {#if selectedChapter && selectedExercise}
    {#each fbise9physics.questions.filter(q =>
      q.chapterFilename === selectedChapter.filename &&
      q.exerciseFilename === selectedExercise.filename
    ) as question}
      <button class="chapter-item">
        <QuestionCard question={question} />
      </button>
      <br />
    {/each}
  {/if}
</div>
