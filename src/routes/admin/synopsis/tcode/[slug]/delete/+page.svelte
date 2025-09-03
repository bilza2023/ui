<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { goto } from '$app/navigation';
  export let data;

  const { tcode, hasChapters } = data;

  const config = {
    id: 'deleteTcode',
    title: `Delete Tcode — ${tcode.name}`,
    description: hasChapters
      ? `This tcode has ${tcode.chapterCount} chapter(s). You must remove them first.`
      : 'This action is permanent.',
    action: '?/deleteTcode',
    initial: { slug: tcode.slug },
    items: [
      { type: 'hidden', name: 'slug', value: tcode.slug },
      { type: 'note', text: hasChapters
          ? 'Deletion disabled: chapters exist.'
          : `Are you sure you want to delete "${tcode.name}"?` }
    ],
    submit: { label: 'Delete', disabledWhen: () => hasChapters },
    clearOnSuccess: false,
    showErrorsList: true
  };

  function onSuccess(ev) {
    // After successful delete, navigate back to the list
    goto('/admin/synopsis');
  }
</script>

<div class="wrap">
  <FormUi config={config} on:success={onSuccess}/>
</div>

<style>
  .wrap { max-width: 640px; margin: 2rem auto; }
</style>
