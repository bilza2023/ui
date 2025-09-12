
<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const form = {
    id: 'createTcode',
    title: 'Create Tcode',
    action: '?/add',
    initial: { name:'', description:'', image:'' },
    items: [
      { type:'text', name:'name', label:'Name', required:true },
      { type:'text', name:'description', label:'Description' },
      { type:'text', name:'image', label:'Image URL' }
    ],
    submit: { label:'Create', disabledWhen: v => !v.name?.trim() },
    clearOnSuccess: true
  };
</script>

<div class="wrap">
  <nav class="crumbs">
    <a href="/admin/syllabus/tcodes">Tcodes</a> / Create
  </nav>

  <FormUi config={form}/>
</div>

<style>
  .wrap { max-width: 800px; margin: 0 auto; padding: 1rem; }
  .crumbs { margin-bottom: 1rem; opacity: 0.9; }
</style>
