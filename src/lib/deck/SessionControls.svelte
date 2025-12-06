<script>
    import { createEventDispatcher } from 'svelte';
  
    export let canPrev = false;
    export let canNext = true;
    export let showRevealHint = true;
  
    const dispatch = createEventDispatcher();
  
    function onNext() { dispatch('next'); }
    function onPrev() { dispatch('prev'); }
  </script>
  
  <nav class="session-controls" aria-label="Session controls">
    <div class="left-controls">
      <button on:click={onPrev} disabled={!canPrev} aria-label="Previous">←</button>
    </div>
  
    <div class="main-controls">
      {#if showRevealHint}
        <div class="hint">Tap card to reveal</div>
      {/if}
    </div>
  
    <div class="right-controls">
      <button on:click={onNext} disabled={!canNext} aria-label="Next">→</button>
    </div>
  </nav>
  
  <style>
    .session-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 12px;
    }
  
    .main-controls {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  
    button {
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
    }
  
    .hint {
      font-size: 0.85rem;
      opacity: 0.7;
    }
  </style>
  