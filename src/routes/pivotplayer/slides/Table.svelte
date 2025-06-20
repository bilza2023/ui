
<script>
    export let data;
  
    // Assume the table is a 2D array: [ [row1], [row2], ... ]
    const tableData = data.find(d => d.name === "table")?.content ?? [];
  </script>
  
  <div class="table-slide">
    <table>
      {#each tableData as row, i}
        <tr>
          {#each row as cell}
            {#if i === 0}
              <th>{cell}</th>
            {:else}
              <td>{cell}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </table>
  </div>
  
  <style>
  .table-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
  }
  
  table {
    width: 90%;
    border-collapse: collapse;
    font-size: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
  
  th, td {
    padding: 1rem 1.5rem;
    text-align: left;
    border: 1px solid #ccc;
  }
  
  th {
    background-color: #f0f0f0;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    table {
      font-size: 1.4rem;
    }
  }
  </style>
  