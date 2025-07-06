<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import Nav from '$lib/appComps/Nav.svelte';
  import BetaWarning from '$lib/appComps/BetaWarning.svelte';
  import NavBar from './components/NavBar.svelte';
  import Card from './components/Card.svelte';
  import QuestionCard from './components/QuestionCard.svelte';
  import { syllabusMap } from '../../lib/syllabus/syllabus_json';

  // will hold the current syllabus once we read the URL
  let syllabus;

  // local UI state
  let selectedChapter  = null;
  let selectedExercise = null;

  // on mount, read ?slug= from the URL and pick the right syllabus
  onMount(() => {
    const slug = get(page).url.searchParams.get('slug') || 'fbise9physics';
    syllabus = syllabusMap[slug];
  });

  // derive lists only after syllabus is set
  $: chapters  = syllabus?.chapters  || [];
  $: exercises = selectedChapter
    ? chapters.find(ch => ch.filename === selectedChapter.filename)?.exercises || []
    : [];
  $: questions = selectedExercise?.questions || [];

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
