<!-- /src/routes/admin/home-index/+page.svelte -->
<script>
  import { invalidateAll } from '$app/navigation';
  import { enhance } from '$app/forms';
  import FormUi from '$lib/formUi/FormUi.svelte';

  export let data;

  // Selected category (from server if URL had ?category=...; else empty)
  let selectedCategory = data?.category ?? '';

  // Server data
  const items = Array.isArray(data?.items) ? data.items : [];

  // Fixed categories only (edit this list as needed)
  const FIXED_CATEGORIES = ['videos', 'blog', 'featured'];

  // Initial category for the create form (fallback to first fixed)
  const initialCategory =
    FIXED_CATEGORIES.includes(selectedCategory) ? selectedCategory : (FIXED_CATEGORIES[0] ?? '');

  // Create form config — posts to SAME page (?/create)
  const addConfig = {
    id: 'addIndexItem',
    title: 'Add Item',
    action: '?/create',          // same-page action
    layout: 'grid-2',
    initial: {
      category: initialCategory,
      questionSlug: '',
      pinned: false
    },
    items: [
      {
        type: 'select',
        name: 'category',
        label: 'Category',
        options: FIXED_CATEGORIES.map(c => ({ value: c, label: c }))
      },
      {
        type: 'text',
        name: 'questionSlug',
        label: 'Question Slug',
        placeholder: 'what-is-algebra',
        required: true
      },
      { type: 'checkbox', name: 'pinned', label: 'Pinned' }
    ],
    submit: { label: 'Add', disabledWhen: (v) => !v.questionSlug?.trim() },
    clearOnSuccess: () => ({
      category: initialCategory,
      questionSlug: '',
      pinned: false
    }),
    showErrorsList: true
  };

  // Refresh page data after successful add/delete
  async function onCreateSuccess() { await invalidateAll(); }
  const onDeleteEnhance = () => ({ result }) => {
    if (result.type === 'success') invalidateAll();
  };

  const fmt = (ts) => {
    try { return new Date(ts).toLocaleString(); } catch { return ''; }
  };
</script>

<svelte:head>
  <title>Home Index — Admin</title>
</svelte:head>

<div class="wrap">
  <h1>Home Index</h1>

  <!-- Create (same-page action + invalidateAll on success) -->
  <div class="card">
    <FormUi config={addConfig} on:success={onCreateSuccess} />
  </div>

  <!-- List -->
  <div class="card">
    <h2>Items {selectedCategory ? `(${selectedCategory})` : ''}</h2>

    {#if items.length === 0}
      <p class="muted">No items found.</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pinned</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Edited</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each items as it, i}
            <tr>
              <td>{i + 1}</td>
              <td>{it.pinned ? 'Yes' : ''}</td>
              <td class="mono">{it.questionSlug}</td>
              <td>{it.question?.name ?? ''}</td>
              <td>{it.question?.editedAt ? fmt(it.question.editedAt) : ''}</td>
              <td class="actions">
                <form method="post" action="?/delete" use:enhance={onDeleteEnhance}>
                  <input type="hidden" name="id" value={it.id} />
                  <input type="hidden" name="category" value={selectedCategory} />
                  <button type="submit" onclick="return confirm('Delete this item?')">Delete</button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .wrap { max-width: 920px; margin: 1.5rem auto; padding: 0 1rem; }
  .card { border:1px solid #334155; border-radius:10px; padding:1rem; margin-bottom:1rem; }
  table { width:100%; border-collapse:collapse; }
  thead th { text-align:left; border-bottom:1px solid #334155; padding:.5rem; }
  tbody td { border-bottom:1px solid #1f2937; padding:.5rem; vertical-align: top; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .muted { opacity:.8; }
  .actions button { background:#b91c1c; border:1px solid #b91c1c; color:#fff; border-radius:8px; padding:.35rem .6rem; }
</style>
