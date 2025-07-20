<script>
  export let questions = [];
  export let selectedChapter;
  export let selectedExercise;
  import Card from './Card.svelte';

  function shortFilename(q){
    return q.filename.length > 15
      ? q.filename.slice(0, 15) + '…'
      : q.filename.slice(0, 15);
  } 

</script>

<main class="questions">
<h5 class="text-left   text-red-800   ">Questions</h5>  
  {#if selectedExercise}

    {#if questions.length}
      <div class="question-cards">
        {#each questions as q}

      <a
        href={`/player?filename=${q.filename}`}
        class="card-link"
        target="_blank"
        rel="noopener"
      >
          <Card title={q.name} 
          description={shortFilename(q)}
          icon="❓" />
      </a>

        {/each}
      </div>
    {:else}
      <p>No questions available.</p>
    {/if}
  {:else}
    <p>Please select an exercise to view questions.</p>
  {/if}
</main>

<style>
.questions {
  padding: 1rem;
  text-align: center;
}
.question-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.question-cards :global(button) {
  margin: 0.5rem;
}
</style>
