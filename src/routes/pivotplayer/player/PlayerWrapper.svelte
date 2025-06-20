<script>
    import { onMount, onDestroy } from 'svelte';
    import Player from './Player.js';
    export let deck;
  
    let container, player;
  
    onMount(() => {
      player = new Player(deck, { mountElement: container, soundUrl: null });
      player.play();
    });
  
    onDestroy(() => {
      player && player.destroy();
    });
  
    const prev = () => player.prev();
    const play = () => player.play();
    const pause = () => player.pause();
    const next = () => player.next();
  </script>
  
  <div bind:this={container} style="width:100vw; height:100vh;"></div>
  
  <div class="controls" style="position:absolute; bottom:1rem; left:50%; transform:translateX(-50%);">
    <button on:click={prev}>Prev</button>
    <button on:click={play}>Play</button>
    <button on:click={pause}>Pause</button>
    <button on:click={next}>Next</button>
  </div>
  