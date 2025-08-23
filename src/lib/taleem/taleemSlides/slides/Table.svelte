<script>
  export let data;

  // Extract headers and rows from slide data
  const headers = data.find(d => d.name === "headers")?.content ?? [];
  const rows = data.find(d => d.name === "rows")?.content ?? [];
</script>

<div class="table-slide">
  <table>
    <thead>
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each row as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
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
