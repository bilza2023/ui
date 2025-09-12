
<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { goto } from '$app/navigation';
  export let data;

  const ex = data?.exercise;
  const ch = data?.chapter;
  const tc = data?.tcode;

  const notFound = !ex;

  const editConfig = ex && {
    id: 'editExercise',
    title: 'Edit Exercise',
    action: '?/save',
    initial: {
      id: ex.id,
      chapterId: ex.chapterId,
      slug: ex.slug || '',
      name: ex.name || '',
      sortOrder: ex.sortOrder ?? 0
    },
    items: [
      { type:'hidden', name:'id', value: ex.id },
      { type:'hidden', name:'chapterId', value: ex.chapterId },
      { type:'hidden', name:'slug', value: ex.slug || '' },
      { type:'text',   name:'name', label:'Name', required:true },
      { type:'number', name:'sortOrder', label:'Sort order' },
      { type:'note',   text:`Course: ${tc?.name ?? '—'}  •  Chapter: ${ch?.name ?? '—'}  •  Slug: ${ex.slug || '—'}` }
    ],
    submit: { label:'Save', disabledWhen: v => !v.name?.trim() },
    clearOnSuccess: false,
    showErrorsList: true
  };

  const deleteConfig = ex && {
    id: 'deleteExercise',
    title: 'Delete Exercise',
    description: 'This cannot be undone.',
    action: '?/del',
    initial: { id: ex.id },
    items: [ { type:'hidden', name:'id', value: ex.id } ],
    submit: { label:'Delete' },
    clearOnSuccess: true
  };

  function onEditSuccess(_e){ /* stay */ }

  function onDeleteSuccess(_e){
    const tcodeId = ch?.tcodeId ?? '';
    const chapterId = ex?.chapterId ?? '';
    goto(`/admin/exercises?tcode=${tc.id}&chapter=${ch.id}`);
  }
</script>

{#if notFound}
  <section class="wrap"><p class="msg">Not found.</p></section>
{:else}
  <section class="wrap">
    <FormUi config={editConfig} on:success={onEditSuccess} />
    <div class="divider"></div>
    <FormUi config={deleteConfig} on:success={onDeleteSuccess} />
  </section>
{/if}

<style>
  .wrap{ margin-inline:auto; padding:1rem; width:min(80vw,1100px); color:var(--primaryText); }
  .divider{ margin:1.25rem 0; height:1px; background:var(--borderColor); }
  .msg{ padding:.75rem 1rem; border:1px solid var(--borderColor); border-radius:12px;
        background:var(--surfaceColor); color:var(--secondaryText); }
</style>
