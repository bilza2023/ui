<script>
    import Nav from "$lib/Nav.svelte";
    export let data;
  
    // 2) destructure decks so it's never undefined
    const { decks = [] } = data;
  </script>
  
  <style>
    :global(body) {
      background-color: #1e1e1e;
      color: #f0f0f0;
      font-family: sans-serif;
    }
  
    h1 {
      margin-bottom: 1rem;
      color: #ffffff;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      background-color: #2c2c2c;
      border: 1px solid #444;
    }
  
    th, td {
      border: 1px solid #444;
      padding: 0.75rem;
      text-align: left;
    }
  
    th {
      background-color: #3a3a3a;
      color: #ddd;
    }
  
    td {
      color: #eee;
    }
  
    a button {
      padding: 0.35rem 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      color: #fff;
    }
  
    .actions a {
      margin-right: 0.5rem;
    }
    .table-wrapper {
  padding-left: 4rem;
  padding-right: 4rem;
}

    /* Color-coded buttons */
    .btn-clone { background-color: #2f855a; }   /* green */
    .btn-edit  { background-color: #3182ce; }   /* blue */
    .btn-delete{ background-color: #e53e3e; }   /* red */
    .btn-play  { background-color: #718096; }   /* gray */
  </style>

<Nav />

<h1 style="
width: 100%;
border: 2px solid #facc15;
border-radius: 0.375rem;
text-align: center;
font-size: 1.875rem;
padding: 6px;
padding-top: 10px;
margin: 2px;
margin-top: 10px;
margin-bottom: 25px;
background-color: #0f4502;
">
💡 Taleem.Help Decks
</h1>

  {#if decks.length === 0}
    <p>No decks found. <a href="/upload">Upload some!</a></p>
  {:else}
  <div class="table-wrapper">
    <table >
      <thead>
        <tr>
          <th>Filename</th>
          <th>Created At</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each decks as deck}
          <tr>
            <td>{deck.filename}</td>
            <td>{new Date(deck.createdAt).toLocaleString()}</td>
            <td class="actions">
              <a href={`/player/?filename=${deck.filename}`}><button class="btn-play">Player</button></a>
              <!-- <a href={`/clone`}><button class="btn-clone">Clone</button></a> -->
              <a href={`/admin/timings?filename=${deck.filename}`}><button class="btn-edit">Timings</button></a>
              <a href={`/admin/delete?filename=${deck.filename}`}><button class="btn-delete">Delete</button></a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    </div>
  {/if}
  