<script>
    import Quote from "./slides/Quote.svelte";
    import CornerWords from "./slides/CornerWords.svelte";
    import Title from "./slides/Title.svelte";
    import ImageLeftBulletsRight from "./slides/ImageLeftBulletsRight.svelte";
    import Image from "./slides/Image.svelte";
    import StaticBackground from "./background/StaticBackground.svelte";
    import SlideWrapper from "./slides/SlideWrapper.svelte";
 

    export let deck;
  
    let themeClass = "theme-neonDark";
  
    // 🔒 Default Background Layer Values
    let backgroundColor = "#b3d8b4";
    let backgroundImage = "/pivot/defaultBg.png";
    let backgroundImageOpacity = 1;
  
    let currentSlideIndex = 0;
    $: currentSlide = deck[currentSlideIndex];
  
    function next() {
      if (currentSlideIndex < deck.length - 1) currentSlideIndex++;
    }
  
    function prev() {
      if (currentSlideIndex > 0) currentSlideIndex--;
    }
  </script>
  
  <div class={`stage ${themeClass}`}>
  
    <StaticBackground
      {backgroundColor}
      {backgroundImage}
      {backgroundImageOpacity}
    />
  
    <SlideWrapper key={currentSlideIndex}>
      {#if currentSlide.type === "quoteSlide"}
        <Quote data={currentSlide.data} />
      {:else if currentSlide.type === "cornerWordsSlide"}
        <CornerWords data={currentSlide.data} />
      {:else if currentSlide.type === "titleSlide"}
        <Title data={currentSlide.data} />
      {:else if currentSlide.type === "imageSlide"}
        <Image data={currentSlide.data} />
      {:else if currentSlide.type === "imageLeftBulletsRight"}
        <ImageLeftBulletsRight data={currentSlide.data} />
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
  