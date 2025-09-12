

<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const t = data?.tcode ?? {};
  const form = {
    id: 'editTcode',
    title: 'Edit Tcode',
    action: '?/save',
    initial: { id: t.id, name: t.name, description: t.description ?? '', image: t.image ?? '' },
    items: [
      { type:'hidden', name:'id', value: t.id },
      { type:'text', name:'name', label:'Name', required:true },
      { type:'text', name:'description', label:'Description' },
      { type:'text', name:'image', label:'Image URL' }
    ],
    submit: { label:'Save', disabledWhen: v => !v.id || !v.name?.trim() }
  };
</script>

<div class="wrap">
  <nav class="crumbs">
    <a href="/admin/syllabus/tcodes">Tcodes</a> / Edit
  </nav>

  <FormUi config={form}/>
</div>

<style>
  .wrap { max-width: 800px; margin: 0 auto; padding: 1rem; }
  .crumbs { margin-bottom: 1rem; opacity: 0.9; }
</style>
