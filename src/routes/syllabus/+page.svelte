<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import Nav from '$lib/appComps/Nav.svelte';
  import BetaWarning from '$lib/appComps/BetaWarning.svelte';
  import NavBar from './components/NavBar.svelte';
  import Card from './components/Card.svelte';
  import CardChapters from './components/CardChapters.svelte';
  import QuestionCard from './components/QuestionCard.svelte';
  // import { syllabusMap } from '../../lib/syllabus/syllabus_json';
  // import { syllabus as syllabusArray } from '../../lib/syllabus/syllabus';
  // console.log("syllabusArray", syllabusArray);
  // will hold the current syllabus once we read the URL
  // let syllabus;
  let syllabus = [];
  // local UI state
  let selectedChapter  = null;
  let selectedExercise = null;

  	/* ──────────────────────────────────────────────
	   ▼ 1-2.  reactive aliases used by markup
	─────────────────────────────────────────────── */
	$: selChapter  = selectedChapter;
	$: selExercise = selectedExercise;

	/* ──────────────────────────────────────────────
	   ▼ 3-4.  event handlers wired to on:select
	─────────────────────────────────────────────── */
	function onChapter(e) {
		/* LeftChaptersBar emits either the chapter object itself
		   or e.detail.chapter — support both: */
		selectedChapter  = e.detail?.chapter ?? e.detail;
		selectedExercise = null;        // reset exercise when chapter changes
	}

	function onExercise(e) {
		/* ExNavBar emits either the exercise object or e.detail.exercise */
		selectedExercise = e.detail?.exercise ?? e.detail;
	}
  
  onMount(async() => {
    const slug = get(page).url.searchParams.get('tcode') ?? 'fbise9physics';
    const res = await fetch('/data/syllabus.json');
    const res2 = await res.json();
    syllabus = res2.find(s => s.tcodeName === slug);
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
        <CardChapters title={ch.name} description="" icon="📁" />
      </button>
    {/each}

  {:else if selectedChapter && !selectedExercise}
    {#each exercises as ex}
      <button on:click={() => chooseExercise(ex)}>
        <!-- <h5 class="text-left   text-red-800   ">Exercises</h5> -->
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
