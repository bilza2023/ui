<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const t = data.tcode;

  const config = {
    id: 'addChapter',
    title: `Add Chapter — ${t.name}`,
    action: '?/addChapter',
    initial: { name: '', sortOrder: '' },
    items: [
      { type: 'hidden', name: 'tcodeSlug', value: t.slug },
      { type: 'text',   name: 'name',      label: 'Name', required: true, placeholder: 'e.g., Ch-01: Introduction' },
      { type: 'number', name: 'sortOrder', label: 'Sort order', step: 1, placeholder: '0' },
      { type: 'note',   text: 'Slug is generated automatically and never changes.' }
    ],
    submit: { label: 'Add', disabledWhen: (v) => !v.name?.trim() },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function onSuccess(e) {
    // e.detail = { ok, message, tcodeSlug, chapter }
    console.log('Added chapter:', e.detail?.chapter);
  }
</script>

<div class="wrap">
  <FormUi config={config} on:success={onSuccess} />
</div>

<style>
  .wrap { max-width: 640px; margin: 2rem auto; }
</style>
