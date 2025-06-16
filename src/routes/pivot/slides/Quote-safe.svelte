<script>
  export let data;
  const quote = data.find((d) => d.name === "quote")?.content ?? "";
  const author = data.find((d) => d.name === "author")?.content ?? "";
</script>

<div class="quote-slide">
  <h1 class="heading">{quote}</h1>
  <p class="text-primary">— {author}</p>
</div>

<style>
  .quote-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 60px;
    text-align: center;
  }
</style>
