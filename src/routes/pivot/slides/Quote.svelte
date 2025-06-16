<script>
  export let data;
</script>

<div class="quote-slide">
  <h1 class="quote">{data.quote}</h1>
  <p class="author">— {data.author}</p>
</div>

<style>
  .quote-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
    color: white;
    padding: 60px;
    text-align: center;
  }

  .quote {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .author {
    font-size: 1.5rem;
    opacity: 0.8;
  }
</style>
