
<script>
  export let sp = [];
</script>

{#each sp as item}
  {#if item.type === 'title'}
    <h3>{item.data.text}</h3>
  {:else if item.type === 'text'}
    <p>{item.data.text}</p>
  {:else if item.type === 'math'}
    <div class="math">{item.data.latex}</div>
  {:else if item.type === 'table'}
    <table>
      {#each item.data.rows as row}
        <tr>
          {#each row as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    </table>
  {:else if item.type === 'tableCode'}
    <table class="code">
      {#each item.data.rows as row}
        <tr>
          {#each row as cell}
            <td><code>{cell}</code></td>
          {/each}
        </tr>
      {/each}
    </table>
  {:else if item.type === 'image'}
    <img src={item.data.src} alt={item.data.alt || 'image'} />
  {:else if item.type === 'code'}
    <pre><code>{item.data.code}</code></pre>
  {:else}
    <p>Unsupported SP type: {item.type}</p>
  {/if}
{/each}
