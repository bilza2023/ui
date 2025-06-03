<script>

  import { onMount } from 'svelte';
  import Eq from './Eq.svelte';
  import SP from './Sp.svelte';

  export let slide = [];
  export let currentTime = 0;

  let eqs = [];
  let defaultSp = [];

  onMount(() => {
    if (slide.slide && Array.isArray(slide.slide)) {
      eqs = slide.slide;
      defaultSp = slide.defaultSp || [];
    } else {
      eqs = slide;
    }
  });

  $: currentEq = eqs.find(eq => currentTime >= eq.startTime && currentTime < eq.endTime) || null;
</script>

<div class="eq-player-wrapper">
  <div class="eq-player-main">
    <div class="eq-panel">
      {#each eqs as eq (eq.startTime)}
        <div class={eq === currentEq ? 'focused' : 'nonFocused'}>
          <Eq eq={eq} />
        </div>
      {/each}
    </div>

    <div class="side-panel">
      {#if currentEq && currentEq.sp && currentEq.sp.length > 0}
        <SP sp={currentEq.sp} />
      {:else if defaultSp.length > 0}
        <SP sp={defaultSp} />
      {:else}
        <p>No side panel</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .focused {
    background-color: rgb(2, 63, 2);
    color: white;
    border: 2px solid red;
    padding: 5px;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.5em;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .nonFocused {
    background-color: grey;
    padding: 2px;
    margin: 2px;
    font-size: 1.25em;
    transition: all 0.3s ease;
  }

  .eq-player {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .eq-player-wrapper {
    background-color: #2d2d2d;
    color: white;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
    line-height: 1.6;
  }

  .eq-player-main {
    display: flex;
    padding: 0.5rem;
    border-radius: 0.375rem;
    background-color: #1a1a1a;
  }

  .eq-panel {
    width: 66.6667%;
    min-height: 100vh;
    max-height: 100vh;
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
  }

  .side-panel {
    width: 33.3333%;
    min-height: 100vh;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #1b1601;
    color: #f3c978;
  }
</style>
