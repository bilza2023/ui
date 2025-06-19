
<script>
  export let question;
  export let baseUrl = "/content";

  const filename = `${question.chapterFilename}_${question.exerciseFilename}_${question.filename}`;
  const url = `${baseUrl}?tcode=${question.tcodeName}&filename=${filename}`;
</script>

<a class="qcard" href={url}>
  <div class="q-icon">❓</div>
  <div class="q-title">
    Q{question?.questionNo ?? "?"}: {question?.name?.slice(0, 60) ?? "Unnamed"}
    {#if question?.name?.length > 60}…{/if}
  </div>
</a>


<style>
  .qcard {
    display: block;
    text-decoration: none;
    width: 100%;
    max-width: 320px;
    min-height: 120px;
    background-color: #fffbea;
    border: 2px solid #ffc107;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    text-align: center;
    font-family: sans-serif;
    color: inherit;
  }

  .qcard:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  .q-icon {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    color: #d39e00;
  }

  .q-title {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    max-width: 100%;
  }
</style>
