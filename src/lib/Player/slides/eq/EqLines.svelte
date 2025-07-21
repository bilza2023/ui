<!-- EqLines.svelte -->
<script>
  import Katex from 'svelte-katex';
  export let lines = [];
  export let currentTime;

  // Compute which line is currently active
  $: activeIndex = lines.findIndex(
    (line, idx) =>
      line.showAt <= currentTime &&
      (idx === lines.length - 1 || lines[idx + 1].showAt > currentTime)
  );
  $: activeLine = lines[activeIndex];

  // Always remove items from top so that active line is third from top
  const topOffset = 2;
  $: visibleBlocks = lines.slice(Math.max(0, activeIndex - topOffset));
</script>

<div class="eq-lines">
  {#each visibleBlocks as line}
    <div
      class="eq-line"
      class:active={line === activeLine}
      class:inactive={line !== activeLine}
    >
      {#if line.type === 'math'}
        <Katex displayMode>{line.content}</Katex>
      {:else if line.type === 'text'}
        {line.content}
      {:else if line.type === 'heading'}
        <span class="eq-heading">{line.content}</span>
      {:else}
        {@html line.content}
      {/if}
    </div>
  {/each}
</div>

<style>
  .eq-heading{
    display: block;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  background-color: #f5ebe0;
  border-left: 4px solid #d18b5a;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  }
  .eq-lines {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .eq-line {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    background-color: white;
    transition: background-color 0.3s ease, opacity 0.3s ease;
  }

  .eq-line.active {
    background-color: #9dec96;
    border-left: 4px solid #444;
    font-size: 1.75rem;
    opacity: 1;
  }

  .eq-line.inactive {
    opacity: 0.6;
    font-size: 1.25rem;
  }
</style>
