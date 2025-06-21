<script>
  import MathBlock from './MathBlock.svelte';
  export let eq;
</script>

{#if eq.type === 'math'}
  <MathBlock latex={eq.content} />
{:else if eq.type === 'title'}
  <h1>{eq.content}</h1>
{:else if eq.type === 'heading'}
  <h2>{eq.content}</h2>
{:else if eq.type === 'text'}
  <p>{eq.content}</p>
{:else}
  <p>Unsupported EQ type: {eq.type}</p>
{/if}
