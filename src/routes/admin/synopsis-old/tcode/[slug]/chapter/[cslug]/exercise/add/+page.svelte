<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const { tcode, chapter } = data;

  const form = {
    id: 'addExercise',
    title: `Add Exercise — ${tcode.name} / ${chapter.name}`,
    action: '?/addExercise',
    initial: { name: '', sortOrder: '' },
    items: [
      { type: 'hidden', name: 'tcodeSlug', value: tcode.slug },
      { type: 'hidden', name: 'chapterSlug', value: chapter.slug },
      { type: 'text',   name: 'name',      label: 'Name', required: true, placeholder: 'e.g., Ex-01: Basics' },
      { type: 'number', name: 'sortOrder', label: 'Sort order', step: 1, placeholder: '0' },
      { type: 'note',   text: 'Slug is generated automatically and never changes.' }
    ],
    submit: { label: 'Add', disabledWhen: (v) => !v.name?.trim() },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function onSuccess(e) {
    console.log('Added exercise:', e.detail?.exercise);
  }
</script>

<div class="wrap">
  <!-- THIS was the issue: pass config prop -->
  <FormUi config={form} on:success={onSuccess} />
  <div class="nav">
    <a href={`/admin/synopsis/tcode/${tcode.slug}/chapter`}>← Back to chapters</a>
  </div>
</div>

<style>
  .wrap { max-width: 640px; margin: 2rem auto; display: grid; gap: 1rem; }
  .nav a { color: var(--primaryColor); text-decoration: none; }
  .nav a:hover { text-decoration: underline; }
</style>
