<!-- TwoColumnTextSlide.svelte -->
<script>
  import SlideScaler from './SlideScaler.svelte';
  export let data;
  export let currentTime = 0;

  $: title = data.find(d => d.name === 'title' && d.showAt <= currentTime)?.content ?? '';
  $: left  = data.find(d => d.name === 'left'  && d.showAt <= currentTime)?.content ?? '';
  $: right = data.find(d => d.name === 'right' && d.showAt <= currentTime)?.content ?? '';
</script>

<SlideScaler>
<div class="container">
  <div class="two-col-slide">
    {#if title}
      <h1 class="slide-title">{title}</h1>
    {/if}

    <div class="columns">
      <div class="column">{left}</div>
      <div class="column">{right}</div>
    </div>
  </div>
</div>
</SlideScaler>

<style>

 .container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;     /* or any other fixed height */
 } 
.two-col-slide {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: clamp(1rem, 4vh, 3rem);
  padding: clamp(1rem, 4vw, 4rem);
  height: 100%;
  box-sizing: border-box;
}

.slide-title {
  font-size: clamp(2rem, 6vw, 4rem);
  text-align: center;
  font-weight: 700;
  margin: 0;
}

.columns {
  display: flex;
  gap: clamp(1rem, 4vw, 4rem);
  flex: 1;
}

.column {
  flex: 1;
  min-width: 0;
  font-size: clamp(1rem, 4vw, 2.5rem);
  white-space: pre-line;
  line-height: 1.6;
}
</style>
