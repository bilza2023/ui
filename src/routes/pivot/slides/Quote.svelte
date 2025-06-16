<script>
  export let data;

  const quoteLines = data.filter(d => d.name === "quoteLine");
  const author = data.find(d => d.name === "author")?.content ?? "";
</script>

<div class="quote-slide">
  {#each quoteLines as line}
    <h1 class="heading">{line.content}</h1>
  {/each}

  <p class="text-primary author-text">{author}</p>
</div>

<style>
  .quote-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    padding: 40px;
  }

  .heading {
    font-size: 68px;
    margin-bottom: 0.8rem;
  }

  .author-text {
    font-size: 28px;
    opacity: 0.85;
    margin-top: 1.6rem;
  }
</style>
