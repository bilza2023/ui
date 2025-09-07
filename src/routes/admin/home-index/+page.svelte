<script>
  // Provided by +page.server.js
  export let data;

  import FormUi from '$lib/formUi/FormUi.svelte';
  import { invalidateAll } from '$app/navigation';

  const categories = Array.isArray(data?.categories) ? data.categories : ['featured','videos','blog','courses'];

  // --- FormUi config (ultra minimal) ---
  const addConfig = {
    id: 'homeIndexAdd',
    title: 'Add Home Index Entry',
    action: '?/add',
    layout: 'grid-2',
    initial: {
      category: data?.category || categories[0] || 'featured',
      type: 'link',
      title: '',
      url: '',
      description: '',
      thumbnail: '',
      pinned: false,
      sortOrder: ''
    },
    items: [
      { type: 'select', name: 'category', label: 'Category',
        options: () => categories.map(c => ({ value: c, label: c }))
      },
      { type: 'select', name: 'type', label: 'Type',
        options: () => [
          { value: 'link', label: 'link' },
          { value: 'deck', label: 'deck' },
          { value: 'note', label: 'note' },
          { value: 'blog', label: 'blog' },
          { value: 'course', label: 'course' }
        ]
      },
      { type: 'text', name: 'title', label: 'Title', placeholder: 'Display title', required: true },
      { type: 'text', name: 'url', label: 'URL', placeholder: '/player?slug=...' , required: true },
      { type: 'textarea', name: 'description', label: 'Description', rows: 3 },
      { type: 'text', name: 'thumbnail', label: 'Thumbnail', placeholder: 'e.g. /media/images/taleem.webp' },
      { type: 'checkbox', name: 'pinned', label: 'Pinned?' },
      { type: 'number', name: 'sortOrder', label: 'Sort Order (optional)', min: 0, step: 1 }
    ],
    submit: {
      label: 'Add',
      disabledWhen: (v) => !(v?.category?.trim() && v?.title?.trim() && v?.url?.trim())
    },
    // After success, keep category/type/pinned sticky; clear content fields
    clearOnSuccess: (v) => ({
      category: v.category,
      type: v.type,
      pinned: v.pinned,
      sortOrder: '',
      title: '',
      url: '',
      description: '',
      thumbnail: ''
    }),
    showErrorsList: true
  };

  function onSuccess() {
    // Re-load list below
    invalidateAll();
  }
</script>

<div class="wrap">
  <FormUi {addConfig} config={addConfig} on:success={onSuccess} />

  <div class="list">
    <h2>All Items</h2>

    {#if (data?.entries ?? []).length === 0}
      <div class="empty">No items yet.</div>
    {:else}
      <table class="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Pinned</th>
            <th>Sort</th>
            <th>Title</th>
            <th>Type</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {#each data.entries as it (it.id)}
            <tr>
              <td>{it.category}</td>
              <td>{it.pinned ? 'Yes' : 'No'}</td>
              <td>{it.sortOrder}</td>
              <td>{it.title}</td>
              <td>{it.type}</td>
              <td class="url">{it.url}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .wrap {
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
    color: var(--primaryText);
  }

  h2 {
    margin: 24px 0 12px;
    color: var(--primaryText);
  }

  .list {
    margin-top: 20px;
    background: var(--panelBg, rgba(255,255,255,0.02));
    border: 1px solid var(--panelBorder, rgba(255,255,255,0.08));
    border-radius: 12px;
    padding: 12px;
  }

  .empty {
    padding: 12px;
    color: var(--mutedText, #9aa4af);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .table th, .table td {
    text-align: left;
    padding: 10px 8px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    vertical-align: top;
  }
  .table th {
    color: var(--secondaryText);
    font-weight: 600;
  }
  .url {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    word-break: break-all;
  }
</style>
