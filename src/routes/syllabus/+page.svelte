<script>
  export let data;
  import   Nav          from '$lib/appComps/Nav.svelte';
  import   BetaWarning  from '$lib/appComps/BetaWarning.svelte';
  import   NavBar       from './components/NavBar.svelte';
  import   Card         from './components/Card.svelte';
  import   QuestionCard from './components/QuestionCard.svelte';

  // pulled in from load()
  const { tcodes, syllabus } = data;

  // local UI state
  let selectedChapter  = null;
  let selectedExercise = null;

  // derive lists
  $: chapters  = syllabus?.chapters  || [];
  $: exercises = selectedChapter 
    ? chapters.find(ch => ch.filename === selectedChapter.filename)?.exercises || []
    : [];
  $: questions = syllabus?.questions.filter(
    q =>
      (!selectedChapter  || q.chapterFilename  === selectedChapter.filename) &&
      (!selectedExercise || q.exerciseFilename === selectedExercise.filename)
  ) || [];

  function chooseChapter(ch) {
    selectedChapter  = ch;
    selectedExercise = null;
  }
  function chooseExercise(ex) {
    selectedExercise = ex;
  }
  function resetAll() {
    selectedChapter  = null;
    selectedExercise = null;
  }
  function unSelectCh() {
    selectedChapter  = null;
    selectedExercise = null;
  }
  function unSelectEx() {
    selectedExercise = null;
  }
</script>

<Nav />
<BetaWarning />

{#if syllabus}
  <NavBar
    {syllabus}
    {selectedChapter}
    {selectedExercise}
    on:reset={resetAll}
    {unSelectCh}
    {unSelectEx}
  />
{/if}

<div class="view-container">
  {#if !selectedChapter}
    {#each chapters as ch}
      <button on:click={() => chooseChapter(ch)}>
        <Card title={ch.name} description="" icon="📁" />
      </button>
    {/each}

  {:else if selectedChapter && !selectedExercise}
    {#each exercises as ex}
      <button on:click={() => chooseExercise(ex)}>
        <Card title={ex.name} description="" icon="📂" />
      </button>
    {/each}

  {:else if selectedChapter && selectedExercise}
      <QuestionCard
        {questions}
        {selectedChapter}
        {selectedExercise}
      />
  {/if}
</div>

<style>
  .view-container {
    text-align: center;
    margin-top: 2rem;
  }
  button {
    margin: 0.5rem;
  }
</style>
