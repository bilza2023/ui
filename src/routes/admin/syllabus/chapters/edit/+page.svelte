
<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const c = data?.chapter ?? {};
  const t = data?.tcode ?? {};
  const form = {
    id: 'editChapter',
    title: `Edit Chapter — ${t.name}`,
    action: '?/save',
    initial: { id: c.id, name: c.name, sortOrder: c.sortOrder ?? 0 },
    items: [
      { type:'hidden', name:'id', value: c.id },
      { type:'text', name:'name', label:'Name', required:true },
      { type:'number', name:'sortOrder', label:'Sort Order', min:0, step:1 }
    ],
    submit: { label:'Save', disabledWhen: v => !v.id || !v.name?.trim() }
  };
</script>

<div class="wrap">
  <nav class="crumbs">
    <a href={`/admin/syllabus/chapters?tcodeId=${t.id}`}>Chapters</a> / Edit
  </nav>

  <FormUi config={form}/>
</div>

<style>
  .wrap { max-width: 800px; margin: 0 auto; padding: 1rem; }
  .crumbs { margin-bottom: 1rem; opacity: 0.9; }
</style>
