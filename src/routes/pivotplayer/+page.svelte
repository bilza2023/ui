<script>
  import { onMount, onDestroy } from 'svelte';
  import { deck } from './deck.js';
  import Player from "./player/Player.js";

  // Slide components
  import Quote from './slides/Quote.svelte';
  import CornerWords from './slides/CornerWords.svelte';
  import Title from './slides/Title.svelte';
  import Image from './slides/Image.svelte';
  import ImageLeftBulletsRight from './slides/ImageLeftBulletsRight.svelte';
  import ImageRightBulletsLeft from './slides/ImageRightBulletsLeft.svelte';
  import ImageWithCaption from './slides/ImageWithCaption.svelte';
  import ImageWithTitle from './slides/ImageWithTitle.svelte';
  import Table from './slides/Table.svelte';
  import StatisticSlide from './slides/StatisticSlide.svelte';
  import BarChartSlide from './slides/BarChartSlide.svelte';
  import TwoColumnTextSlide from './slides/TwoColumnTextSlide.svelte';
  import DonutChartSlide from './slides/DonutChartSlide.svelte';
  import TitleAndSubtitle from './slides/TitleAndSubtitle.svelte';
  import BulletList from './slides/BulletList.svelte';
  import BigNumber from './slides/BigNumber.svelte';
  import QuoteWithImage from './slides/QuoteWithImage.svelte';
  import ContactSlide from './slides/ContactSlide.svelte';
  import StaticBackground from './background/StaticBackground.svelte';

  let player;
  let currentTime = 0;
  let currentSlideIndex = 0;
  $: console.log("currentTime" ,currentTime);

  onMount(() => {
    player = new Player('/sounds/music.opus');
    player.onTick(time => {
      // const ms = time * 1000;
      const ms = time;
      currentTime = ms;
      for (let i = deck.length - 1; i >= 0; i--) {
        if ((deck[i].start || 0) <= ms) {
          currentSlideIndex = i;
          break;
        }
      }
    });
  });

  onDestroy(() => {
    player.destroy();
  });

  function play() {
    player.play();
  }

  function pause() {
    player.pause();
  }

</script>


<div class="stage">
  {#if deck[currentSlideIndex].type === 'quoteSlide'}
    <Quote data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'cornerWordsSlide'}
    <CornerWords data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'titleSlide'}
    <Title data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'imageSlide'}
    <Image data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'imageLeftBulletsRight'}
    <ImageLeftBulletsRight data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'imageRightBulletsLeft'}
    <ImageRightBulletsLeft data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'imageWithCaption'}
    <ImageWithCaption data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'imageWithTitle'}
    <ImageWithTitle data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'table'}
    <Table data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'statistic'}
    <StatisticSlide data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'barChart'}
    <BarChartSlide data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'twoColumnText'}
    <TwoColumnTextSlide data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'donutChart'}
    <DonutChartSlide data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'titleAndSubtitle'}
    <TitleAndSubtitle data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'bulletList'}
    <BulletList data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'bigNumber'}
    <BigNumber data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'quoteWithImage'}
    <QuoteWithImage data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else if deck[currentSlideIndex].type === 'contactSlide'}
    <ContactSlide data={deck[currentSlideIndex].data} currentTime={currentTime} />
  {:else}
    <p>Unknown slide type: {deck[currentSlideIndex].type}</p>
  {/if}
</div>


{#if player}
<div class="controls">
  <!-- <button on:click={prev}>Prev</button> -->
  <button on:click={play}>Play</button>
  <button on:click={pause}>Pause</button>
  <!-- <button on:click={next}>Next</button> -->
</div>
{/if}


<style>
  .controls {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
  }
  .controls button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  .stage {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
