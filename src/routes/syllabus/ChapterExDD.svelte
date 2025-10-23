<script>
  import '$lib/styles/tokens.css';
  import { createEventDispatcher } from 'svelte';

  // Props
  export let synopsis;                           // { chapters: [{ slug, name, exercises: [{ slug, name }] }] }
  export let selected = { chapter: '', exercise: '' };
  export let allLabel = 'All';

  const dispatch = createEventDispatcher();

  // Local (controlled-init)
  let chapter  = selected.chapter  || '';
  let exercise = selected.exercise || '';

  // Derived lists
  $: chapters  = synopsis?.chapters ?? [];
  $: current   = chapters.find((c) => c.slug === chapter);
  $: exercises = current?.exercises ?? [];

  // Handlers
  function onChapterChange(e) {
    chapter  = e.target.value;
    exercise = '';                   // reset when chapter changes
    dispatch('change', { chapter, exercise });
  }
  function onExerciseChange(e) {
    exercise = e.target.value;
    dispatch('change', { chapter, exercise });
  }
</script>

<!-- Panel wrapper (tokens-aligned) -->
<section class="panel">
  <div class="dualdd">
    <label class="field">
      <span class="lbl">Chapter</span>
      <select on:change={onChapterChange} bind:value={chapter} class="ctrl">
        <option value="">Select chapter…</option>
        {#each chapters as c}
          <option value={c.slug}>{c.name ?? c.slug}</option>
        {/each}
      </select>
    </label>

    <label class="field">
      <span class="lbl">Exercise</span>
      <select on:change={onExerciseChange} bind:value={exercise} class="ctrl" disabled={!chapter}>
        <option value="">{allLabel}</option>
        {#each exercises as ex}
          <option value={ex.slug}>{ex.name ?? ex.slug}</option>
        {/each}
      </select>
    </label>
  </div>
</section>

<style>
  /* outer surface panel */
  .panel {
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    border-radius: 14px;
    padding: 0.75rem;
    color: var(--primaryText);
  }

  /* layout */
  .dualdd {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  @media (max-width: 640px) {
    .dualdd { grid-template-columns: 1fr; }
  }

  /* fields */
  .field {
    display: grid;
    gap: 0.35rem;
  }
  .lbl {
    font-size: 0.85rem;
    line-height: 1.2;
    color: var(--secondaryText);
  }

  /* controls */
  .ctrl {
    width: 100%;
    appearance: none;
    background: var(--backgroundColor);
    color: var(--primaryText);
    border: 1px solid var(--borderColor);
    border-radius: 12px;
    padding: 0.55rem 0.75rem;
    line-height: 1.25;
  }
  .ctrl:hover {
    border-color: var(--primaryColor);
  }
  .ctrl:focus {
    outline: none;
    border-color: var(--primaryColor);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primaryColor) 22%, transparent);
  }
  .ctrl:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    background: var(--surfaceColor);
  }
</style>
