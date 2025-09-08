<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { invalidateAll } from '$app/navigation';

  export let data;

  // Show a success banner after a save, without leaving the page
  let lastSuccess = null;
  let lastFailure = null;

  const addConfig = {
    id: 'homeIndexAdd',
    title: 'Add to Home Index',
    description: 'Curate a link for the home page feed. `href` is the final URL used on the public site.',
    action: '?/add',
    method: 'post',
    layout: 'grid-2',           // nice two-column compact layout
    labelPosition: 'top',
    initial: {
      category: data.category || '',
      type: '',
      title: '',
      href: '',
      description: '',
      thumbnail: '',
      pinned: '',
      sortOrder: ''
    },
    items: [
      {
        type: 'select',
        name: 'category',
        label: 'Category',
        required: true,
        options: () => (data.categories || []).map(c => ({ value: c, label: c }))
      },
      {
        type: 'select',
        name: 'type',
        label: 'Type',
        required: true,
        options: () => (data.types || []).map(t => ({ value: t, label: t }))
      },
      { type: 'text',     name: 'title',       label: 'Title',       required: true, placeholder: 'Algebra – What is a Variable?' },
      { type: 'text',     name: 'href',        label: 'Href',        required: true, placeholder: '/player?filename=what_is_algebra' },
      { type: 'text',     name: 'description', label: 'Description', placeholder: 'Optional short description' },
      { type: 'text',     name: 'thumbnail',   label: 'Thumbnail',   placeholder: '/media/images/taleem.webp' },
      { type: 'checkbox', name: 'pinned',      label: 'Pinned?' },
      { type: 'number',   name: 'sortOrder',   label: 'Sort Order',  min: 0, step: 1, placeholder: 'Auto if blank' }
    ],
    submit: {
      label: 'Add Entry',
      disabledWhen: (v) => !v?.category || !v?.type || !v?.title?.trim() || !v?.href?.trim()
    },
    clearOnSuccess: false,     // we’ll accept returned values from action.success
    showErrorsList: true
  };

  function handleSuccess(ev) {
    lastFailure = null;
    lastSuccess = ev.detail;     // { ok:true, message, saved, values }
    // Re-fetch the list so the table below updates
    invalidateAll();
  }

  function handleFailure(ev) {
    lastSuccess = null;
    lastFailure = ev.detail;     // { ok:false, message, values, errors? }
  }

  // Simple mapper for fallback thumbnails
  const imageSrc = (row) => {
    const t = (row?.thumbnail || '').trim();
    if (!t) return '/media/images/taleem.webp';
    return (t.startsWith('/') || t.startsWith('http')) ? t : `/media/images/${t}`;
  };
</script>

<div class="wrap">
  <h1 class="h1">Home Index — Create</h1>

  {#if lastSuccess?.message}
    <div class="alert success">{lastSuccess.message}</div>
  {/if}
  {#if lastFailure?.message}
    <div class="alert error">{lastFailure.message}</div>
  {/if}

  <FormUi
    config={addConfig}
    on:success={handleSuccess}
    on:failure={handleFailure}
  />

  <hr class="sep" />

  <h2 class="h2">Existing Entries{#if data.category} — {data.category}{/if}</h2>

  {#if (data.entries || []).length === 0}
    <div class="empty">No entries yet.</div>
  {:else}
    <table class="grid">
      <thead>
        <tr>
          <th>Thumb</th>
          <th>Title</th>
          <th>Category</th>
          <th>Type</th>
          <th>Href</th>
          <th>Pinned</th>
          <th>Sort</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {#each data.entries as row}
          <tr>
            <td class="thumb">
              <img src={imageSrc(row)} alt="thumb" />
            </td>
            <td class="title">{row.title}</td>
            <td>{row.category}</td>
            <td class="badge">{row.type}</td>
            <td class="mono small">{row.href}</td>
            <td>{row.pinned ? 'Yes' : '—'}</td>
            <td class="num">{row.sortOrder ?? '—'}</td>
            <td class="badge">{row.status ?? 'active'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .wrap { max-width: 1000px; margin: 0 auto; padding: 1rem; }
  .h1 { margin: 0 0 .5rem; font-size: 1.4rem; }
  .h2 { margin: 1.5rem 0 .5rem; font-size: 1.1rem; }

  .alert { margin: .5rem 0 1rem; padding: .6rem .8rem; border-radius: .5rem; }
  .alert.success {
    background: color-mix(in srgb, lime 12%, transparent);
    border: 1px solid color-mix(in srgb, lime 35%, transparent);
    color: color-mix(in srgb, lime 85%, white);
  }
  .alert.error {
    background: color-mix(in srgb, crimson 10%, transparent);
    border: 1px solid color-mix(in srgb, crimson 35%, transparent);
    color: color-mix(in srgb, crimson 90%, white);
  }

  .sep { margin: 1.25rem 0; border: none; height: 1px; background: color-mix(in srgb, white 10%, transparent); }

  .grid { width: 100%; border-collapse: collapse; }
  .grid th, .grid td { padding: .5rem .6rem; border-bottom: 1px solid color-mix(in srgb, white 10%, transparent); }
  .grid thead th { text-align: left; font-weight: 600; opacity: .8; }
  .grid .badge { text-transform: capitalize; opacity: .9; }
  .grid .num { text-align: right; }
  .grid .thumb { width: 64px; }
  .grid .thumb img { width: 48px; height: 48px; object-fit: cover; border-radius: .4rem; }
  .grid .title { font-weight: 600; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
  .small { font-size: .84rem; opacity: .9; word-break: break-all; }
  .empty { opacity: .7; padding: .5rem 0; }
</style>
