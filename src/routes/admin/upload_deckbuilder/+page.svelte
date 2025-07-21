<script>
  import Nav from "$lib/Nav.svelte";
  let files = [];
  let message = '';

  async function upload() {
    if (!files.length) {
      message = 'Please select at least one deck file.';
      return;
    }

    const form = new FormData();
    files.forEach((f) => form.append('files', f));

    const res = await fetch('/admin/upload_deckbuilder', {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    if (res.ok) {
      message = '✅ Upload successful!';
      files = [];
    } else {
      message = `Error: ${data.error || 'Unknown error'}`;
    }
  }
</script>

<Nav />
<h1>Bulk Deck Upload</h1>

{#if message}
  <div class="message {message.startsWith('✅') ? 'ok' : 'error'}">
    {message}
  </div>
{/if}

<div class="form-container">
  <input
    type="file"
    multiple
     accept=".json,.js"
    on:change="{e => files = Array.from(e.target.files)}"
  />
  <button on:click|preventDefault={upload}>
    Upload {files.length > 0 ? `(${files.length})` : ''}
  </button>
</div>



<style>
  :global(body) {
    background-color: #1e1e1e;
    color: #f0f0f0;
    font-family: sans-serif;
  }

  h1 {
    width: 100%;
    border: 2px solid #facc15;
    border-radius: 0.375rem;
    text-align: center;
    font-size: 1.875rem;
    padding: 10px 6px;
    margin: 10px 2px 25px;
    background-color: #0f4502;
    color: #fff;
  }

  .message {
    margin: 1em 0;
    font-weight: bold;
    text-align: center;
  }

  .ok {
    color: #38a169;
  }

  .error {
    color: #e53e3e;
  }

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  input[type="file"] {
    padding: 0.5rem;
    background-color: #2c2c2c;
    border: 1px solid #444;
    border-radius: 4px;
    color: #eee;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #2b6cb0;
  }
</style>