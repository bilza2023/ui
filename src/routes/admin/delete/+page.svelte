<!-- src/routes/admin/delete/+page.svelte -->
<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/appComps/AdminNav.svelte";
  import { onMount } from 'svelte';
  import '$lib/styles/forms.css';  // ✅ shared form styles

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

    const res = await fetch('', { method: 'POST', body: formData });
    const result = await res.json().catch(() => ({}));

    if (result?.success) {
      message = 'Deck deleted.';
    } else {
      message = result?.error || 'Deletion failed.';
    }

    busy = false;
  }
</script>

<Nav />
<AdminNav />

<div class="page">
  <div class="form confirm">
    <h2>Are you sure you want to delete:</h2>
    <p class="filename"><strong>{filename}</strong></p>

    <div class="actions">
      <button class="danger" on:click={handleDelete} disabled={busy} aria-busy={busy}>
        {#if busy}Deleting…{/if}{#if !busy}Delete This Deck{/if}
      </button>
    </div>
  </div>

  {#if message}
    <div class="form message-card">
      <p class="message">{message}</p>
    </div>
  {/if}
</div>

<style>
  .page {
    max-width: 700px;
    min-height: 100vh;
    margin: 24px auto;
    padding: 0 16px;
    color: var(--primaryText);
  }

  /* Panel tweaks (forms.css gives the base look) */
  .form.confirm {
    text-align: center;
    background: color-mix(in oklab, var(--accentColor) 6%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--accentColor) 35%, var(--borderColor));
  }

  .filename {
    font-size: 1.1rem;
    color: var(--secondaryText);
    margin: 0.25rem 0 1rem;
  }

  /* Danger button variant (scoped to .form to avoid global impact) */
  .form .danger {
    background: var(--accentColor);
    border-color: var(--accentColor);
    color: var(--backgroundColor);
  }
  .form .danger:hover {
    background: color-mix(in oklab, var(--backgroundColor) 12%, var(--accentColor));
  }
  .form button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  /* Result message card */
  .message-card {
    text-align: center;
    background: color-mix(in oklab, var(--accentColor) 6%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--accentColor) 35%, var(--borderColor));
  }
  .message-card .message {
    margin: 0;
    font-size: 1.4rem;
    color: var(--accentColor);
  }
</style>
