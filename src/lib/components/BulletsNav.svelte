
<!-- /src/lib/appComps/IndexNav.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    // Array of distinct question types, e.g. ["note", "deck"]
    export let types = [];
  
    const dispatch = createEventDispatcher();
    let active = '';
  
    function pick(t) {
      active = t;
      dispatch('select', { type: t });
    }
  </script>
  
  <nav class="index-nav">
    {#each types as t}
      <button
        class:active={t === active}
        on:click={() => pick(t)}
      >
        {t}
      </button>
    {/each}
  </nav>
  
  <style>
    .index-nav {
      display: flex;
      justify-content: center;
      gap: var(--space-3, 0.75rem);
      padding: var(--space-2, 0.5rem) 0;
    }
  
    .index-nav button {
      position: relative;
      padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
      border: 2px solid var(--border-2, #555);
      border-radius: var(--radius-2, 0.4rem);
      background: transparent;
      color: var(--text-1, #eee);
      font-size: var(--font-size-2, 0.95rem);
      cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease;
    }
  
    /* bullet under text */
    .index-nav button::after {
      content: "•";
      position: absolute;
      left: 50%;
      bottom: -0.7rem;
      transform: translateX(-50%);
      font-size: var(--font-size-3, 1rem);
      color: transparent;
      transition: color 0.2s ease;
    }
  
    /* hover state */
    .index-nav button:hover {
      border-color: var(--accent-3, #888);
    }
    .index-nav button:hover::after {
      color: var(--accent-4, #bbb);
    }
  
    /* active state */
    .index-nav button.active {
      border-color: var(--accent-5, #007bff);
      color: var(--accent-5, #007bff);
      font-weight: 600;
    }
    .index-nav button.active::after {
      color: var(--accent-5, #007bff);
    }
  </style>
  