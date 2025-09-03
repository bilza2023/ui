<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { goto } from '$app/navigation';
  export let data;

  const t = data.tcode;

  const config = {
    id: 'editTcode',
    title: `Edit Tcode — ${t.name}`,
    action: '?/updateTcode',
    initial: { slug: t.slug, name: t.name, description: t.description ?? '', image: t.image ?? '' },
    items: [
      { type: 'hidden', name: 'slug', value: t.slug },
      { type: 'text', name: 'name', label: 'Name', required: true, placeholder: 'New name' },
      { type: 'text', name: 'description', label: 'Description', placeholder: 'Optional' },
      { type: 'text', name: 'image', label: 'Image URL', placeholder: '/bookcovers/... or https://...' }
    ],
    submit: { label: 'Save', disabledWhen: (v) => !v.name?.trim() },
    clearOnSuccess: false,
    showErrorsList: true
  };

  function onSuccess(ev) {
    // optional: after save, go back to list
    // goto('/admin/synopsis');
    console.log('Updated:', ev.detail?.tcode);
  }
</script>

<div class="wrap">
  <FormUi config={config} on:success={onSuccess}/>
</div>

<style>
  .wrap { max-width: 640px; margin: 2rem auto; }
</style>
