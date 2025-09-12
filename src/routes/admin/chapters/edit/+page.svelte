
<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { goto } from '$app/navigation';
  export let data;

  const ch = data?.chapter;
  const tcodeId = Number(data?.tcodeId || 0);
  const notFound = !ch;

  const editConfig = ch && {
    id: 'editChapter',
    title: 'Edit Chapter',
    action: '?/save',
    initial: {
      id: ch.id,
      tcodeId,
      slug: ch.slug || '',
      name: ch.name || '',
      description: ch.description || '',
      sortOrder: ch.sortOrder ?? 0
    },
    items: [
      { type:'hidden', name:'id', value: ch.id },
      { type:'hidden', name:'tcodeId', value: tcodeId },
      { type:'hidden', name:'slug', value: ch.slug || '' },
      { type:'text',   name:'name', label:'Name', required:true },
      { type:'text',   name:'description', label:'Description' },
      { type:'number', name:'sortOrder', label:'Sort order' },
      { type:'note',   text:`Slug: ${ch.slug || '—'}` }
    ],
    submit: { label:'Save', disabledWhen: v => !v.name?.trim() },
    clearOnSuccess: false,
    showErrorsList: true
  };

  const deleteConfig = ch && {
    id: 'deleteChapter',
    title: 'Delete Chapter',
    description: 'This cannot be undone. If exercises exist, delete will fail.',
    action: '?/del',
    initial: { id: ch.id },
    items: [ { type:'hidden', name:'id', value: ch.id } ],
    submit: { label:'Delete' },
    clearOnSuccess: true
  };

  function onEditSuccess(_e){ /* stay */ }
  function onDeleteSuccess(_e){ goto(`/admin/syllabus/chapters?tcodeId=${tcodeId}`); }
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
