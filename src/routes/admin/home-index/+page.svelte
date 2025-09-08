<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { CATEGORIES, TYPES, computeHref } from '$lib/constants/homeIndex.js';
  export let data;

  // Select options from shared constants
  const categoryOptions = () => CATEGORIES.map(c => ({ value: c, label: c }));
  const typeOptions = () => TYPES.map(t => ({ value: t, label: t }));

  // Stacked layout per request; include explicit href input
  const formConfig = {
    id: 'homeIndexAdd',
    title: 'Add Home Index Entry',
    description: 'Create a card link for the home page.',
    action: '?/add',
    layout: 'stack',                       // <— stacked form
    initial: {
      category: data?.category || '',
      type: 'note',
      title: '',
      slug: '',
      href: '',
      description: '',
      thumbnail: '',
      pinned: false,
      sortOrder: 0
    },
    items: [
      { type: 'select',   name: 'category',   label: 'Category',   options: categoryOptions, required: true },
      { type: 'select',   name: 'type',       label: 'Type',       options: typeOptions,     required: true },
      { type: 'text',     name: 'title',      label: 'Title',      placeholder: 'Human title', required: true },
      { type: 'text',     name: 'slug',       label: 'Slug',       placeholder: 'e.g. what_is_algebra', required: true },
      { type: 'text',     name: 'href',       label: 'Href (computed or custom)', placeholder: '/note/my-slug or /player?slug=my-slug', required: true },
      { type: 'textarea', name: 'description',label: 'Description', rows: 3, placeholder: 'Optional' },
      { type: 'text',     name: 'thumbnail',  label: 'Thumbnail',  placeholder: '/media/images/taleem.webp or filename' },
      { type: 'number',   name: 'sortOrder',  label: 'Sort Order', min: 0, step: 1 },
      { type: 'checkbox', name: 'pinned',     label: 'Pinned?' },
      { type: 'note',     text: 'Tip: If you leave Href empty and then edit Type/Slug, we’ll auto-suggest one.' }
    ],
    submit: {
      label: 'Add Entry',
      disabledWhen: (v) => !v?.category || !v?.type || !v?.title?.trim() || !v?.slug?.trim() || !v?.href?.trim()
    },
    clearOnSuccess: () => ({
      category: data?.category || '',
      type: 'note',
      title: '',
      slug: '',
      href: '',
      description: '',
      thumbnail: '',
      pinned: false,
      sortOrder: 0
    }),
    showErrorsList: true
  };

  // Live preview + auto-suggest when href is blank
  let previewHref = '';

  function updatePreview() {
    const id = formConfig.id;
    const t = document.getElementById(`${id}__type`)?.value?.trim();
    const s = document.getElementById(`${id}__slug`)?.value?.trim();
    const hrefEl = document.getElementById(`${id}__href`);
    const suggested = (t && s) ? computeHref(t, s) : '';

    // If user hasn't typed a custom href, keep it in sync with suggestion.
    if (hrefEl && !hrefEl.value.trim()) {
      hrefEl.value = suggested;
    }
    previewHref = hrefEl?.value?.trim() || suggested || '';
    if (previewHref) console.log('[home-index:preview] href:', previewHref);
  }

  function handleSuccess(ev) {
    const { href } = ev.detail || {};
    if (href) {
      previewHref = href;
      console.log('[home-index:success] stored href:', href);
    }
  }
</script>

<div class="wrap">
  <FormUi
    config={formConfig}
    on:success={handleSuccess}
    on:failure={() => {}}
    on:change={updatePreview} />

  <div class="preview">
    <h4>Live Link Preview</h4>
    {#if previewHref}
      <p><a href={previewHref} target="_blank" rel="noopener">{previewHref}</a></p>
    {:else}
      <p>Fill Type & Slug (or enter Href) → preview appears here.</p>
    {/if}
  </div>

  {#if data?.entries?.length}
    <hr class="sep" />
    <h3>Recent Entries</h3>
    <ul class="list">
      {#each data.entries as e}
        <li>
          <span class="cat">{e.category}</span>
          <strong>{e.title}</strong>
          <span class="muted">({e.type})</span>
          {#if e.href}
            — <a href={e.href} target="_blank" rel="noopener">open</a>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .wrap { max-width: 880px; margin: 0 auto; padding: 1rem; }
  .preview { margin-top: 1rem; padding: .75rem 1rem; border: 1px solid rgba(255,255,255,.1); border-radius: .75rem; }
  .preview h4 { margin: 0 0 .25rem 0; font-size: 0.95rem; opacity: .8; }
  .sep { margin: 1.25rem 0; opacity: .2; }
  .list { list-style: none; padding: 0; margin: .5rem 0 0 0; }
  .list li { padding: .35rem 0; }
  .cat { font-size: .85rem; opacity: .7; margin-right: .5rem; text-transform: lowercase; }
  .muted { opacity: .6; font-size: .9rem; margin-left: .25rem; }
</style>
