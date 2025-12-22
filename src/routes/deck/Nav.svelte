<script>
  export let stripCount = 0;
  export let active = 0;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function select(i) {
    dispatch("select", i);
  }
</script>

<nav class="nav">
  {#each Array(stripCount) as _, i}
    <button
      class:active={i === active}
      on:click={() => select(i)}
    >
      Strip {i + 1}
    </button>
  {/each}
</nav>

<style>
  .nav {
    display: flex;
    gap: 8px;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    background: #fafafa;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
  }

  button.active {
    background: #222;
    color: white;
    border-color: #222;
  }
</style>
