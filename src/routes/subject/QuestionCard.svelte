<script>
  export let questions = [];
  // export let selectedChapter = null;
  // export let selectedExercise = null;
  function getThumb(q) {
    return q.thumbnail
      ?? (q.type === 'slide' ? '/images/slide.webp' : '/images/beakers2.webp');
  }
</script>

<div class="question-grid">
  {#if questions.length > 0}
    {#each questions as question}
      {#if question.type == "slide"}
        <a class="card" href={`/player?filename=${question.filename}`}>
      
          <img class="thumb" src={getThumb(question)} alt={question.name} />


          <div class="title">{question.name}</div>
        </a>
      {:else if question.type == "note"}
        <a class="card" href={`/notes/${question.filename}`}>
          <img class="thumb" src={getThumb(question)} alt={question.name} />

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

 
  .card:hover {
    transform: translateY(2px);
    box-shadow: 0 10px 10px rgba(21, 42, 0, 0.9);
  }

  .card {
    display: flex;
  flex-direction: column;
  border-radius: 0.75rem;  /* rounded corners */
  overflow: hidden;   
  border: 4px solid #2E1C02;
  box-shadow: 0 8px 8px rgba(45, 44, 44, 0.8);
}

.thumb {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background-color: #f0f0f0;
  flex-shrink: 0;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}

.title {
  margin-top: auto;       /* stick title to bottom of the card */
  color: #d5bd9b;
    background-color: #2E1C02;
    padding: 0.6rem;
    font-size: 0.9rem;;
}


  .no-questions {
    color: #331f04;
    font-size: 1rem;
    text-align: center;
  }
</style>
