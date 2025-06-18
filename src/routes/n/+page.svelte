<script>
  import {fbise9physics} from "../../lib/syllabusData/fbise9physics/index";

  import Nav from "$lib/appComps/Nav.svelte";  
 import NavBar from "./NavBar.svelte";
  const nestedView = fbise9physics.getNestedView();
  // debugger;
  console.log("fbise9physics",nestedView);
  let view = "chapter";
  let selectedChapter = null;
  let selectedExercise = null;

  function setSelectChapter(chapter) {
  selectedChapter = chapter;
  console.log("selectedChapter" ,selectedChapter);
}
 function unSelectEx(){
  selectedExercise = null;
 }
 function unSelectCh(){
  selectedChapter = null;
 }
 function setSelectEx(ex){
  selectedExercise = ex;
  console.log("selectedExercise", selectedExercise);
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

<!-- <div class="button-container">
  <button on:click={() => {selectedChapter = null;selectedExercise=null}} class="btn chapter-btn">
    {fbise9physics.tcodeName}
  </button>


  {#if selectedChapter}
   <button on:click={() => selectedExercise = null} class="btn exercise-btn">
     {`Chapter >`}{selectedChapter.name} 
    </button>
    {/if}

  {#if selectedExercise}
   <button on:click={() => {}} class="btn exercise-btn">
     {`Exercise >`}{selectedExercise.name} 
    </button>
    {/if}

</div> -->


<div class="view-container">
  
  {#if selectedChapter == null }
  {#each nestedView as chapter}
  <button class="chapter-item" on:click={() => setSelectChapter(chapter)}>
    {chapter.name}
  </button>
  <br>
  {/each}
  {/if}

  {#if selectedChapter !==null && selectedExercise==null}
  <h4 class="w-full text-left text-black  ">Exercises</h4>
  {#each selectedChapter.exercises as exercise}
  <button class="chapter-item" on:click={() => setSelectEx(exercise)}>
   {exercise.name}
  </button>
  <br>
  {/each}
  {/if}

  <!-- Questions -->

  {#if selectedExercise && selectedChapter}
  <h4 class="w-full text-left text-black  ">Questions</h4>
  {#each selectedExercise.questions as question}
   <button class="chapter-item" on:click={() => {}}>
    {question.questionNo}
   </button>
   <br>
  {/each}
  {/if}
</div>

<style>
  .button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  font-family: sans-serif;
  font-size: 0.95rem;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  color: #333;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #e0e0e0;
}

.chapter-btn {
  color: #007BFF;
}

.exercise-btn {
  color: #28A745;
}

.question-btn {
  color: #FFC107;
}

.view-container {
  text-align: center;
  margin-top: 2rem;
  font-family: sans-serif;
}

.chapter-heading {
  color: #007BFF;
}

.exercise-heading {
  color: #28A745;
}

.question-heading {
  color: #FFC107;
}

</style>