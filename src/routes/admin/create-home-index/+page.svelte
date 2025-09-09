<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { invalidateAll } from '$app/navigation';

  export let data;

  // Option lists from server
  const categoryOptions = (data?.categories ?? []).map(c => ({ value: c, label: c }));
  const typeOptions = (data?.types ?? []).map(t => ({ value: t, label: t }));

  // FormUi config (server computes href; we just show a note)
  const addConfig = {
    id: 'addHomeIndex',
    title: 'Add Home Index Entry',
    description: 'Href/URL is auto-calculated on save from the Type + Slug you provide.',
    action: '?/add',
    layout: 'stack',
    initial: {
      category: data?.category || (categoryOptions[0]?.value ?? ''),
      type: typeOptions[0]?.value ?? 'note',
      title: '',
      slug: '',
      href: '',
      description: '',
      thumbnail: '',
      pinned: '',
      sortOrder: 0
    },
    items: [
      { type: 'select', name: 'category', label: 'Category', options: () => categoryOptions, required: true },
      { type: 'select', name: 'type',      label: 'Type',      options: () => typeOptions, required: true },
      { type: 'text',   name: 'title',     label: 'Title',     required: true, placeholder: 'Display title' },
      { type: 'text',   name: 'slug',      label: 'Slug',      required: true, placeholder: 'e.g. what-is-algebra' },

      // Optional preview field (not required; server overwrites anyway)
      { type: 'text',   name: 'href',      label: 'URL (auto on save)', placeholder: 'Will be computed from Type + Slug' },

      { type: 'textarea', name: 'description', label: 'Description', rows: 3 },
      { type: 'text',     name: 'thumbnail',   label: 'Thumbnail (URL or filename)' },
      { type: 'checkbox', name: 'pinned',      label: 'Pinned?' },
      { type: 'number',   name: 'sortOrder',   label: 'Sort Order', min: 0, step: 1 },

      { type: 'note', text: 'Tip: Leave “URL” blank — the server will compute it consistently from your Type and Slug.' }
    ],
    submit: { label: 'Save', disabledWhen: v => !v.title?.trim() || !v.slug?.trim() },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function onAddSuccess() {
    // Re-fetch list so the new row appears immediately
    invalidateAll();
  }
</script>

<div class="wrap">
  <section class="panel">
    <FormUi config={addConfig} on:success={onAddSuccess} />
  </section>

</div>

<style>
  .wrap { max-width: 1000px; margin: 0 auto; padding: 1rem; }
  .panel { background: var(--cardBg, rgba(255,255,255,0.02)); border: 1px solid var(--border, rgba(255,255,255,0.1)); border-radius: 12px; padding: 1rem; margin-bottom: 1rem; }
</style>
