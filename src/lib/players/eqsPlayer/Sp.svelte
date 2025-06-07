<script>
  import MathBlock from './MathBlock.svelte';
  export let sp = [];
  export let images = {};
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
    <img
      class="sp-image"
      src={images[item.data.src] || images.default}
      alt={item.data.alt || 'image'}
    />
  {:else if item.type === 'code'}
    <pre><code>{item.data.code}</code></pre>
  {:else}
    <p>Unsupported SP type: {item.type}</p>
  {/if}
{/each}
<style>
  .sp-title {
    background-color: #221100;
    border: 1px solid #a47000;
    padding: 8px;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .sp-text {
    background-color: #2a1a00;
    border: 1px solid #bb8800;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 1rem;
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

  .sp-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    background-color: #1f1f1f;
    border: 1px solid #666;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
  }

  .sp-table td,
  .sp-table th {
    border: 1px solid #444;
    padding: 10px 14px;
    text-align: left;
    font-size: 1rem;
    color: #eee;
  }

  .sp-table.code td {
    background-color: #121212;
    font-family: "Fira Code", monospace;
    color: #96ff96;
  }
</style>
