<script>
  // Page data from +page.server.js
  import SimpleTable from './SimpleTable.svelte';
  export let data;
  // Form action result (sticky values, messages)
  export let form;

  // Local model (keeps form sticky values if action failed)
  let v = {
    category: data?.category ?? '',
    type: '',
    title: '',
    slug: '',
    description: '',
    thumbnail: '',
    pinned: '',
    sortOrder: ''
  };

  // Merge sticky values after action responses
  $: if (form?.values) v = { ...v, ...form.values };

  // Mirror of server mapper for live preview
  const hrefFor = (row) => {
    if (!row?.slug) return '';
    if (row?.type === 'note')   return `/notes?filename=${row.slug}`;
    if (row?.type === 'deck')   return `/player?filename=${row.slug}`;
    if (row?.type === 'course') return `/syllabus?tcode=${row.slug}`;
    return '';
  };

  $: computedHref = hrefFor(v);
  $: canSubmit = !!v.category && !!v.type && !!v.title?.trim() && !!v.slug?.trim() && !!computedHref;
</script>

<section class="wrap">
  <h1>Create Home Index Entry</h1>

  {#if form?.message}
    <div class:ok={form?.ok} class="flash">
      {form.message}
    </div>
  {/if}

  <form method="POST" action="?/add" class="form">
    <!-- Slug first (your request) -->
    <div class="field">
      <label for="slug">Slug *</label>
      <input id="slug" name="slug" type="text" bind:value={v.slug} required />
      <small>Short id used to build the link</small>
    </div>

    <div class="row">
      <div class="field">
        <label for="category">Category *</label>
        <select id="category" name="category" bind:value={v.category} required>
          <option value="" disabled>Select…</option>
          {#each data.categories as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>

      <div class="field">
        <label for="type">Type *</label>
        <select id="type" name="type" bind:value={v.type} required>
          <option value="" disabled>Select…</option>
          {#each data.types as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="field">
      <label for="title">Title *</label>
      <input id="title" name="title" type="text" bind:value={v.title} required />
    </div>

    <!-- Auto Href: read-only preview + hidden input -->
    <div class="field">
      <label>Href (auto)</label>
      <input type="text" value={computedHref} readonly />
      <input type="hidden" name="href" value={computedHref} />
      <small>Computed from Type + Slug</small>
    </div>

    <div class="row">
      <div class="field">
        <label for="thumbnail">Thumbnail</label>
        <input id="thumbnail" name="thumbnail" type="text" placeholder="/media/images/taleem.webp" bind:value={v.thumbnail} />
      </div>
      <div class="field">
        <label for="sortOrder">Sort</label>
        <input id="sortOrder" name="sortOrder" type="number" min="0" bind:value={v.sortOrder} />
      </div>
    </div>

    <div class="field">
      <label for="description">Description</label>
      <textarea id="description" name="description" rows="3" bind:value={v.description} />
    </div>

    <div class="field inline">
      <label class="checkbox">
        <input type="checkbox" name="pinned" checked={v.pinned === 'on'} />
        <span>Pinned</span>
      </label>
    </div>

    <div class="actions">
      <button type="submit" disabled={!canSubmit}>Add Entry</button>
    </div>
  </form>

  <!-- Simple list so you can see results immediately -->
 <SimpleTable {data} />

</section>

<style>
  .wrap { max-width: 980px; margin: 0 auto; padding: 16px; }
  h1 { margin: 8px 0 16px; }
  .flash { padding: 10px 12px; border-radius: 8px; margin: 8px 0 16px; }
  .flash.ok { background: #103; color: #9fd; border: 1px solid #2af; }
  .flash:not(.ok) { background: #301; color: #fbb; border: 1px solid #f66; }

  .form { display: grid; gap: 12px; }
  .row { display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
  .field { display: grid; gap: 6px; }
  .field.inline { align-items: center; }
  label { font-weight: 600; }
  input[type="text"], input[type="number"], textarea, select {
    padding: 8px 10px; border: 1px solid #333; border-radius: 8px; background: #111; color: #eee;
  }
  input[readonly] { opacity: 0.8; }
  small { color: #aaa; }

  .actions { margin-top: 6px; }
  button {
    padding: 10px 14px; border-radius: 10px; border: 1px solid #2af; background: #041627; color: #cfe9ff;
    cursor: pointer;
  }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
 
  @media (max-width: 720px) {
    .row { grid-template-columns: 1fr; }
  }
</style>
