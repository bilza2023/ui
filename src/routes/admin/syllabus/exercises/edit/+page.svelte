<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const e = data?.exercise ?? {};
  const c = data?.chapter ?? {};
  const t = data?.tcode ?? {};
  const form = {
    id: 'editExercise',
    title: `Edit Exercise — ${t.name} › ${c.name}`,
    action: '?/save',
    initial: { id: e.id, name: e.name, sortOrder: e.sortOrder ?? 0 },
    items: [
      { type:'hidden', name:'id', value: e.id },
      { type:'text', name:'name', label:'Name', required:true },
      { type:'number', name:'sortOrder', label:'Sort Order', min:0, step:1 }
    ],
    submit: { label:'Save', disabledWhen: v => !v.id || !v.name?.trim() }
  };
</script>

<div class="wrap">
  <nav class="crumbs">
    <a href={`/admin/syllabus/exercises?chapterId=${c.id}`}>Exercises</a> / Edit
    <span class="spacer"></span>
    <a class="btn" href={`/admin/questions/create?exerciseId=${e.id}`}>Add Question</a>
  </nav>

  <FormUi config={form}/>
</div>

<style>
  .wrap { max-width: 800px; margin: 0 auto; padding: 1rem; }
  .crumbs { display:flex; align-items:center; gap:1rem; margin-bottom: 1rem; opacity: 0.9; }
  .spacer { flex: 1; }
  .btn { padding: 0.35rem 0.7rem; border: 1px solid var(--border-3, hsl(0 0% 30%)); border-radius: 0.65rem; text-decoration: none; }
</style>
