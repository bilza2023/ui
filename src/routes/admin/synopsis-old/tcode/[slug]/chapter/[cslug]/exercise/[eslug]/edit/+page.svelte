<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const { tcode, chapter, exercise } = data;

  const config = {
    id: 'editExercise',
    title: `Edit Exercise — ${tcode.name} / ${chapter.name}`,
    action: '?/updateExercise',
    initial: {
      tcodeSlug: tcode.slug,
      chapterSlug: chapter.slug,
      exerciseSlug: exercise.slug,
      name: exercise.name,
      sortOrder: String(exercise.sortOrder ?? '')
    },
    items: [
      { type: 'hidden', name: 'tcodeSlug', value: tcode.slug },
      { type: 'hidden', name: 'chapterSlug', value: chapter.slug },
      { type: 'hidden', name: 'exerciseSlug', value: exercise.slug },
      { type: 'text',   name: 'name',      label: 'Name', required: true, placeholder: 'Exercise name' },
      { type: 'number', name: 'sortOrder', label: 'Sort order', step: 1, placeholder: '0' },
      { type: 'note',   text: `Slug is immutable: (${exercise.slug})` }
    ],
    submit: { label: 'Save', disabledWhen: v => !v.name?.trim() },
    clearOnSuccess: false,
    showErrorsList: true
  };

  function onSuccess(e) {
    console.log('Exercise updated:', e.detail);
  }
</script>

<div class="wrap">
  <FormUi config={config} on:success={onSuccess} />
  <div class="nav">
    <a href={`/admin/synopsis/tcode/${tcode.slug}/chapter/${chapter.slug}/exercise`}>← Back to exercises</a>
  </div>
</div>

<style>
  .wrap { max-width: 640px; margin: 2rem auto; display: grid; gap: 1rem; }
  .nav a { color: var(--primaryColor); text-decoration: none; }
  .nav a:hover { text-decoration: underline; }
</style>
