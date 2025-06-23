<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import { getSyllabus, getChapters } from "$lib/syllabus";
  import Nav from "$lib/appComps/Nav.svelte";
  import NavBar from "../components/NavBar.svelte";
  import Card from "../components/Card.svelte";
  import QuestionCard from "../components/QuestionCard.svelte";
  import BetaWarning from "$lib/appComps/BetaWarning.svelte"

  let syllabus = null;
  let selectedChapter = null;
  let selectedExercise = null;
  let questions = null;

  onMount(() => {
    const { pathname } = get(page).url;
    const segments = pathname.split("/").filter(Boolean);
    const tcodeName = segments[1] || "";
    syllabus = getSyllabus(tcodeName) || null;
    questions = syllabus.questions;
    // if(!syllabus || !questions) {}
    console.log("✅ syllabus loaded:", syllabus);
  });

  $: chapters = syllabus ? getChapters(syllabus.tcodeName) : [];
  $: exercises = selectedChapter
    ? syllabus.chapters.find((ch) => ch.filename === selectedChapter.filename)
        ?.exercises || []
    : [];

  function chooseChapter(ch) {
    selectedChapter = ch;
    selectedExercise = null;
  }

  function chooseExercise(ex) {
    selectedExercise = ex;
  }

  function resetAll() {
    selectedChapter = null;
    selectedExercise = null;
  }
  function unSelectEx() {
    selectedExercise = null;
  }

  // Clears both chapter and exercise selections
  function unSelectCh() {
    selectedChapter = null;
    selectedExercise = null;
  }
</script>

<Nav />
<BetaWarning />

{#if syllabus}
  <NavBar {syllabus} {selectedChapter} {selectedExercise} on:reset={resetAll} {unSelectCh} {unSelectEx} />
{/if}

<div class="view-container">
  {#if !selectedChapter}
    {#each chapters as ch}
      <button on:click={() => chooseChapter(ch)}>
        <Card title={ch.name} description="" icon="📁" />
      </button>
    {/each}
  {/if}

  {#if selectedChapter && !selectedExercise}
    {#each exercises as ex}
      <button on:click={() => chooseExercise(ex)}>
        <Card title={ex.name} description="" icon="📂" />
      </button>
    {/each}
  {/if}

  {#if selectedChapter && selectedExercise}
    <!-- {#each questions as q}
      <QuestionCard {q} />
      {/each} -->
      <QuestionCard {questions} {selectedChapter} {selectedExercise}  />
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
