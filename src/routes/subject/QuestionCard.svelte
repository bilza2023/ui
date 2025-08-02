<script>
  export let questions = [];
  export let selectedChapter = null;
  export let selectedExercise = null;
</script>

<div class="question-grid">
  {#if questions.length > 0}
    {#each questions as question}
      {#if question.type == "slide"}
        <a class="card" href={`/player?filename=${question.filename}`}>
          <img class="thumb" src="/images/box.webp" alt={question.name} />
          <div class="title">{question.name}</div>
        </a>
      {:else if question.type == "note"}
        <a class="card" href={`/notes?filename=${question.filename}`}>
          <img class="thumb" src="/images/taleem.webp" alt={question.name} />
          <div class="title">{question.name}</div>
        </a>
      {/if}
    {/each}
  {:else}
    <p class="no-questions">No questions available for this selection.</p>
  {/if}
</div>

<style>
  .question-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center cards horizontally */
    gap: 1rem;
    padding: 1rem;
    width: 100%;
  }

  .card {
    background-color: #c4a77f;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    text-align: center;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;
    width: 180px; /* Fixed width for consistency */
  }

  .card:hover {
    transform: translateY(-2px);
  }

  .thumb {
    width: 100%;
    height: 100px;
    object-fit: cover;

    /* background: #2e2e2e; */
  }

  .title {
    color: #291701;
    /* background-color: #C4A77F; */
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .no-questions {
    color: #331f04;
    font-size: 1rem;
    text-align: center;
  }
</style>
