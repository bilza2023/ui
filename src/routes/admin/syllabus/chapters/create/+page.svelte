
<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const t = data?.tcode ?? {};
  const form = {
    id: 'createChapter',
    title: `Create Chapter — ${t.name} (${t.slug})`,
    action: '?/add',
    initial: { tcodeId: t.id, name:'', sortOrder: 0 },
    items: [
      { type:'hidden', name:'tcodeId', value: t.id },
      { type:'text', name:'name', label:'Name', required:true },
      { type:'number', name:'sortOrder', label:'Sort Order', min:0, step:1 }
    ],
    submit: { label:'Create', disabledWhen: v => !v.tcodeId || !v.name?.trim() },
    clearOnSuccess: true
  };
</script>

<div class="wrap">
  <nav class="crumbs">
    <a href={`/admin/syllabus/chapters?tcodeId=${t.id}`}>Chapters</a> / Create
  </nav>

  <FormUi config={form}/>
</div>

<style>
  .wrap { max-width: 800px; margin: 0 auto; padding: 1rem; }
  .crumbs { margin-bottom: 1rem; opacity: 0.9; }
</style>
