<script>
    /* content: { header?: string[], rows: string[][] } */
    export let content = { rows: [] };
  </script>
  
  <table class="note-table">
    {#if content.header}
      <thead>
        <tr>{#each content.header as h}<th>{h}</th>{/each}</tr>
      </thead>
    {/if}
  
    <tbody>
      {#each content.rows as row}
        <tr>{#each row as cell}<td>{@html cell}</td>{/each}</tr>
      {/each}
    </tbody>
  </table>
  
  <style>
    .note-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.2rem 0;
      color: white;
    }
    .note-table th,
    .note-table td {
      border: 1px solid #444;
      padding: .4rem .6rem;
      text-align: left;
    }
  </style>
  