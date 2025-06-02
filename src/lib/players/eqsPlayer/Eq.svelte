
<script>
  export let eq;
</script>

{#if eq.type === 'title'}
  <h1>{eq.content}</h1>
{:else if eq.type === 'heading'}
  <h2>{eq.content}</h2>
{:else if eq.type === 'text'}
  <p>{eq.content}</p>
{:else if eq.type === 'math'}
  <div class="math">{eq.content}</div> <!-- Replace with MathJax or KaTeX later -->
{:else}
  <p>Unsupported eq type</p>
{/if}
