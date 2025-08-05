<script lang="ts">
    /* Incoming props */
    export let current  : number = 0;   // zero-based index
    export let total    : number = 1;   // total slide count
  
    export let goFirst  : () => void = () => {};
    export let goPrev   : () => void = () => {};
    export let goNext   : () => void = () => {};
    export let goLast   : () => void = () => {};
  </script>
  
  <nav class="browser-nav">
    <button on:click={goFirst} disabled={current === 0}  title="First slide">⏮</button>
    <button on:click={goPrev}  disabled={current === 0}  title="Previous slide">‹</button>
  
    <span class="counter">{current + 1} / {total}</span>
  
    <button on:click={goNext}  disabled={current === total - 1} title="Next slide">›</button>
    <button on:click={goLast}  disabled={current === total - 1} title="Last slide">⏭</button>
  </nav>
  
  <style>
    /* Same height / feel as the timed player bar */
    .browser-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(6px);
      z-index: 50;
      color: #fff;
    }
  
    button {
      padding: 0.35rem 0.75rem;
      font-size: 1.05rem;
      font-weight: 600;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.15);
      transition: background 0.15s ease;
    }
    button:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.25);
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    .counter {
      min-width: 4rem;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 500;
    }
  </style>
  