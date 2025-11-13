<script>
    import { createEventDispatcher } from 'svelte';
    import SurahDropDown from '$lib/quran/SurahDropDown.svelte';
  
    // Props
    export let selectedNum = null;       // e.g. 2
    export let selectedName = '';        // current name (if known)
    export let currentSurahName = '';    // fallback name from quran.json
    export let placeholder = '';
  
    const dispatch = createEventDispatcher();
  
    function handlePick(num, name) {
      // Normalize to a clear event shape
      dispatch('pick', { surah: num, name });
    }
  
    function handleSelect(e) {
      const { surah, name } = e.detail || {};
      dispatch('select', { surah, name });
    }
  
    $: displayName = selectedName || currentSurahName || '';
  </script>
  
  <div class="surahBar">
    <div class="surahBar-left">
      <SurahDropDown
        {placeholder}
        onPick={handlePick}
        on:select={handleSelect}
      />
    </div>
  
    <div class="surahBar-right">
      {#if selectedNum && displayName}
        <p class="badge">
          <strong>{displayName}</strong>
          — Surah: <strong>{selectedNum}</strong>
        </p>
      {:else}
        <p class="muted">Select a Surah</p>
      {/if}
    </div>
  </div>
  
  <style>
    .surahBar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      width: 100%;
    }
  
    .surahBar-left {
      flex: 0 0 auto;
    }
  
    .surahBar-right {
      flex: 1 1 auto;
      display: flex;
      justify-content: flex-end;
    }
  
    .badge {
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: 0.5rem;
      padding: 0.4rem 0.7rem;
      color: var(--primaryText);
      font-size: 0.95rem;
      white-space: nowrap;
    }
  
    .muted {
      color: var(--secondaryText);
      font-size: 0.9rem;
    }
  </style>
  