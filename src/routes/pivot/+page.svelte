<script>
  import Quote from "./slides/Quote.svelte";
  import CornerWords from "./slides/CornerWords.svelte";
  import Title from "./slides/Title.svelte";
  import Image from "./slides/Image.svelte";
  import StaticBackground from "./background/StaticBackground.svelte";
  import SlideWrapper from "./slides/SlideWrapper.svelte";
  import { deck } from "./deck.js";
  import { setup } from "./background/setupPresentation.js";

  const { theme, background: defaultBackground } = setup("neonDark", "default");
  let themeClass = "theme-neonDark";

  let currentSlideIndex = 0;
  $: currentSlide = deck[currentSlideIndex];

  // ✅ Unified Background
  let globalBackground = { ...defaultBackground };
  $: {
    if (currentSlide?.background) {
      globalBackground = {
        ...defaultBackground,
        ...currentSlide.background
      };
    } else {
      globalBackground = defaultBackground;
    }
  }

  function next() {
    if (currentSlideIndex < deck.length - 1) currentSlideIndex++;
  }

  function prev() {
    if (currentSlideIndex > 0) currentSlideIndex--;
  }

$: backgroundColor = globalBackground.backgroundColor;
$: backgroundImage = globalBackground.backgroundImage;
$: backgroundImageOpacity = globalBackground.backgroundImageOpacity ?? 0.25;
$: patternOpacity = globalBackground.patternOpacity ?? 0.25;
$: patternSize = globalBackground.patternSize ?? 28;

</script>


<div class={`stage ${themeClass}`}>

  <StaticBackground
  {backgroundColor}
  {backgroundImage}
  {backgroundImageOpacity}
  {patternOpacity}
  {patternSize}
/>


  <SlideWrapper background={globalBackground} key={currentSlideIndex}>
    {#if currentSlide.type === "quoteSlide"}
      <Quote data={currentSlide.data} />
    {:else if currentSlide.type === "cornerWordsSlide"}
      <CornerWords data={currentSlide.data} />
    {:else if currentSlide.type === "titleSlide"}
      <Title data={currentSlide.data} />
    {:else if currentSlide.type === "imageSlide"}
      <Image data={currentSlide.data} />
    {:else}
      <p>Unknown slide type</p>
    {/if}
  </SlideWrapper>

  <div class="nav-overlay">
    <button on:click={prev} disabled={currentSlideIndex === 0}>⬅ Prev</button>
    <span>Slide {currentSlideIndex + 1} of {deck.length}</span>
    <button on:click={next} disabled={currentSlideIndex === deck.length - 1}>Next ➡</button>
  </div>
</div>

<style>
  .stage {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .nav-overlay {
    position: absolute;
    top: 0;
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
    z-index: 10;
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
</style>
