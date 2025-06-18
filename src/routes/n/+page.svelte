<script>
  import {fbise9physics} from "../../lib/syllabusData/fbise9physics/index";
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
 function setSelectEx(ex){
  selectedExercise = ex;
  console.log("selectedExercise", selectedExercise);
 }

</script>

<div class="button-container">
  <button on:click={() => {selectedChapter = null;selectedExercise=null}} class="btn chapter-btn">
    {fbise9physics.tcodeName}
  </button>


  {#if selectedChapter}
   <button on:click={() => view = 'exercise'} class="btn exercise-btn">
     {`Chapter >`}{selectedChapter.name} 
    </button>
    {/if}

  {#if selectedExercise}
   <button on:click={() => view = 'exercise'} class="btn exercise-btn">
     {`Exercise >`}{selectedExercise.name} 
    </button>
    {/if}

</div>

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
  {#each selectedChapter.exercises as exercise}
  <button class="chapter-item" on:click={() => setSelectEx(exercise)}>
   {exercise.name}
  </button>
  <br>
  {/each}
  {/if}

  <!-- Questions -->

  {#if selectedExercise && selectedChapter}
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
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.chapter-btn {
  background-color: #007BFF;
  color: white;
}

.exercise-btn {
  background-color: #28A745;
  color: white;
}

.question-btn {
  background-color: #FFC107;
  color: black;
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