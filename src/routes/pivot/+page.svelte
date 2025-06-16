<script>
  import Quote from "./slides/Quote.svelte";
  import CornerWords from "./slides/CornerWords.svelte";
  
  const slideTypeToRender = "cornerWordsSlide";

const slide = {
  type: "cornerWordsSlide",
  data: {
    words: ["Explore", "Build", "Share", "Learn"]
  }
};

  const theme = {
    textColor: "#ffffff",
    fontFamily: "Inter"
  };

  const currentTime = 1000; // Hardcoded for now — all showAt hit
</script>

{#if slideTypeToRender === "quoteSlide"}
  <Quote data={slide.data} />
{:else if slideTypeToRender === "cornerWordsSlide"}
  <CornerWords data={slide.data} />
{:else}
  <p>Unknown slide type</p>
{/if}
