<script>
  //   import { fbise9physics } from "../../lib/syllabusData/fbise9physics/index";
  
  //   // View selector state
  //   let view = "chapter";
  // debugger;
  //   // Use the full syllabus object — retain class methods
  //   const syllabus = fbise9physics;
  
  //   // Access structured data directly
  //   const allChapters = syllabus.chapters;
  //   const allExercises = allChapters.flatMap(ch => ch.exercises);
  //   const allQuestions = allExercises.flatMap(ex => ex.questions);
  </script>

  <!-- View toggle buttons -->
  <div style="margin-bottom: 1rem;">
    <button on:click={() => view = "chapter"}>Chapters</button>
    <button on:click={() => view = "exercise"}>Exercises</button>
    <button on:click={() => view = "question"}>Questions</button>
  </div>
  
  <!-- Conditional rendering -->
  {#if view === "chapter"}
    {#each allChapters as ch}
      <div>{ch.name}</div>
    {/each}
  {:else if view === "exercise"}
    {#each allExercises as ex}
      <div>{ex.name}</div>
    {/each}
  {:else if view === "question"}
    {#each allQuestions as q}
      <div>{q.questionName || `Question ${q.questionNo}`}</div>
    {/each}
  {/if}
