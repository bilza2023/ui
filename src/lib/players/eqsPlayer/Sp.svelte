<script>
  import MathBlock from './MathBlock.svelte';
  export let sp = [];
</script>

{#each sp as item}
  {#if item.type === 'title'}
    <div class="sp-title">{item.data.text}</div>
  {:else if item.type === 'text'}
    <div class="sp-text">{item.data.text}</div>
  {:else if item.type === 'math'}
    <div class="sp-math"><MathBlock latex={item.data.latex} /></div>
  {:else if item.type === 'table'}
    <table class="sp-table">
      {#each item.data.rows as row}
        <tr>
          {#each row as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    </table>
  {:else if item.type === 'tableCode'}
    <table class="sp-table code">
      {#each item.data.rows as row}
        <tr>
          {#each row as cell}
            <td><code>{cell}</code></td>
          {/each}
        </tr>
      {/each}
    </table>
  {:else if item.type === 'image'}
    <img class="sp-image" src={item.data.src} alt={item.data.alt || 'image'} />
  {:else if item.type === 'code'}
    <pre><code>{item.data.code}</code></pre>
  {:else}
    <p>Unsupported SP type: {item.type}</p>
  {/if}
{/each}

<style>
  .sp-title {
    background-color: #3a250f;
    border: 1px solid #a47000;
    padding: 8px;
    text-align: center;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .sp-text {
    background-color: #2a1a00;
    border: 1px solid #bb8800;
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .sp-math {
    background-color: #1b1b1b;
    border: 1px dashed #888;
    padding: 8px;
    margin-bottom: 10px;
  }

  .sp-image {
    display: block;
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    margin-bottom: 10px;
    border: 2px solid #333;
    background-color: #000;
  }
</style>
