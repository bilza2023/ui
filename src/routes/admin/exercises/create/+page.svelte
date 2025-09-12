<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const c = data?.chapter ?? {};
  const t = data?.tcode ?? {};
  const form = {
    id: 'createExercise',
    title: `Create Exercise — ${t.name} › ${c.name}`,
    action: '?/add',
    initial: { chapterId: c.id, name:'', sortOrder: 0 },
    items: [
      { type:'hidden', name:'chapterId', value: c.id },
      { type:'text', name:'name', label:'Name', required:true },
      { type:'number', name:'sortOrder', label:'Sort Order', min:0, step:1 }
    ],
    submit: { label:'Create', disabledWhen: v => !v.chapterId || !v.name?.trim() },
    clearOnSuccess: true
  };
</script>

<div class="wrap">
  <nav class="crumbs">
    <a href={`/admin/syllabus/exercises?chapterId=${c.id}`}>Exercises</a> / Create
  </nav>

  <FormUi config={form}/>
</div>

<style>
  .wrap { max-width: 800px; margin: 0 auto; padding: 1rem; }
  .crumbs { margin-bottom: 1rem; opacity: 0.9; }
</style>
