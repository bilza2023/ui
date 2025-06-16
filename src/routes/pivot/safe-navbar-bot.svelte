<script>
  import Quote from "./slides/Quote.svelte";
  import CornerWords from "./slides/CornerWords.svelte";
  import SlideWrapper from "./slides/SlideWrapper.svelte";

  // === Deck of Slides ===
  const deck = [
    {
      type: "quoteSlide",
      data: [
        {
          name: "quote",
          content: "Imagination is more important than knowledge.",
        },
        { name: "author", content: "Albert Einstein" },
      ],
    },
    {
      type: "cornerWordsSlide",
      data: [
        { name: "word1", content: "Explore" },
        { name: "word2", content: "Build" },
        { name: "word3", content: "Learn" },
        { name: "word4", content: "Share" },
      ],
    },
  ];

  let currentSlideIndex = 0;
  $: currentSlide = deck[currentSlideIndex];

  function next() {
    if (currentSlideIndex < deck.length - 1) currentSlideIndex++;
  }

  function prev() {
    if (currentSlideIndex > 0) currentSlideIndex--;
  }
</script>

<div class="stage">
  <div class="slide-frame">
    <SlideWrapper>
      {#if currentSlide.type === "quoteSlide"}
        <Quote data={currentSlide.data} />
      {:else if currentSlide.type === "cornerWordsSlide"}
        <CornerWords data={currentSlide.data} />
      {:else}
        <p>Unknown slide type: {currentSlide.type}</p>
      {/if}
    </SlideWrapper>

    <div class="nav-overlay">
      <button on:click={prev} disabled={currentSlideIndex === 0}>⬅ Prev</button
      >
      <span>Slide {currentSlideIndex + 1} of {deck.length}</span>
      <button on:click={next} disabled={currentSlideIndex === deck.length - 1}
        >Next ➡</button
      >
    </div>
  </div>
</div>

<style>
  .stage {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
  }

  .slide-frame {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .nav-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.8rem 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    color: white;
    font-family: sans-serif;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    background: #222;
    color: white;
    border: none;
    border-radius: 5px;
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  span {
    opacity: 0.6;
  }
</style>
