<!-- src/routes/admin/delete/+page.svelte -->
<script>
   import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "../../../lib/AdminNav.svelte";
  import { onMount } from 'svelte';

  let filename = '';
  let message = '';
  let busy = false;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    filename = params.get('filename') || '';
  });

  async function handleDelete() {
    busy = true;
    message = '';

    const formData = new FormData();
    formData.append('filename', filename);

    const res = await fetch('', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    if (result.success) {
      message = 'Deck deleted.';
    } else {
      message = result.error || 'Deletion failed.';
    }

    busy = false;
  }
</script>

<Nav />
<AdminNav />

<div class="container">
  <div class="confirm-card">
    <h2>Are you sure you want to delete:</h2>
    <p class="filename"><strong>{filename}</strong></p>
    <button on:click={handleDelete} disabled={busy}>
      Delete This Deck
    </button>
  </div>

  {#if message}
    <div class="message-card">
      <p class="message">{message}</p>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    background-color: #1e1e1e;
    color: #f0f0f0;
    font-family: sans-serif;
  }

  .container {
    max-width: 600px;
    margin: 2rem auto;
    text-align: center;
  }

  .confirm-card,
  .message-card {
    margin: 3rem auto;
    background-color: #2c2c2c;
    padding: 2rem;
    max-width: 500px;
    border: 2px solid #facc15;
    border-radius: 1rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .confirm-card h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .filename {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #e53e3e;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .message-card .message {
    font-size: 2.5rem;
    color: #facc15;
    margin: 0;
  }
</style>
