<script>
  export let data;

  const quoteLines = data.filter((d) => d.name === "quoteLine");
  const author = data.find((d) => d.name === "author")?.content ?? "";
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

/* Default desktop baseline */
.heading {
  font-size: 68px;
  margin-bottom: 0.8rem;
}

.author-text {
  font-size: 28px;
  opacity: 0.85;
  margin-top: 1.6rem;
}

/* === Breakpoints === */

/* xs: <480px */
@media (max-width: 480px) {
  .heading { font-size: 32px; }
  .author-text { font-size: 18px; }
}

/* sm: 481–767px */
@media (min-width: 481px) and (max-width: 767px) {
  .heading { font-size: 40px; }
  .author-text { font-size: 20px; }
}

/* md: 768–1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .heading { font-size: 52px; }
  .author-text { font-size: 24px; }
}

/* lg: 1025–1440px */
@media (min-width: 1025px) and (max-width: 1440px) {
  .heading { font-size: 60px; }
  .author-text { font-size: 26px; }
}

/* xl: >1440px */
@media (min-width: 1441px) {
  .heading { font-size: 120px; }
  .author-text { font-size: 35px; }
}

</style>
