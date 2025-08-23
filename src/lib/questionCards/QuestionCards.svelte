
<script>
  import QCard from './QCard.svelte';
    // Accept either `data` (like old HomeIndex) or direct `questions`
    export let questions = [];
    export let loading = false;
  console.log("questions",questions);
    // Reuse your existing card list
    // adjust the import path if QCard lives elsewhere
  </script>
  
  <div class="questions-panel">
    {#if loading}
      <p class="status">Loading…</p>
    {:else if questions.length}
      <QCard {questions} />
    {:else}
      <p class="status">No items yet.</p>
    {/if}
  </div>
  
  <style>
    /* Token-only panel, same vibe as your HomeIndex/Tcode panel */
    .questions-panel {
      border: 4px solid var(--backgroundColor);
      border-radius: 16px;
      padding: clamp(12px, 2vw, 24px);
      box-shadow:
        0 1px 1px rgba(0,0,0,.04),
        0 4px 14px rgba(0,0,0,.08);
  
      /* fill space nicely without stretching children */
      min-height: 60vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
  
      /* subtle tint so it stands apart from the page */
      background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
      color: var(--primaryText);
    }
  
    .status {
      color: var(--secondaryText);
      font-size: 0.95rem;
    }
  </style>
  