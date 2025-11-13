<script>
  import { createEventDispatcher } from 'svelte';

  // Props: page owns the logic, nav bar just emits events
  export let atStart = false;
  export let atEnd = false;

  const dispatch = createEventDispatcher();

  function goFirst() {
    if (!atStart) dispatch('first');
  }

  function goPrev() {
    if (!atStart) dispatch('prev');
  }

  function goNext() {
    if (!atEnd) dispatch('next');
  }

  function goLast() {
    if (!atEnd) dispatch('last');
  }
</script>

<div class="navBar" dir="ltr" role="toolbar" aria-label="Verse navigation">
  <button on:click={goFirst} disabled={atStart} title="First">⏮️ First</button>
  <button on:click={goNext}  disabled={atEnd}   title="Next">Next ▶️</button>
  <button on:click={goPrev}  disabled={atStart} title="Previous">◀️ Prev</button>
  <button on:click={goLast}  disabled={atEnd}   title="Last">⏭️ Last</button>
</div>

<style>
  .navBar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0.5rem 0;
    background: var(--backgroundColor);
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px dashed var(--borderColor);
  }

  .navBar button {
    border: 1px solid var(--primaryColor);
    padding: 0.5rem 0.9rem;
    border-radius: 0.6rem;
    background: transparent;
    color: var(--primaryColor);
    cursor: pointer;
  }

  .navBar button:hover:not(:disabled) {
    background: var(--primaryColor);
    color: #fff;
  }

  .navBar button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
</style>
