<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { goto } from '$app/navigation';
  export let data;

  const t = data?.tcode;

  // Guard: nothing to edit
  const notFound = !t;

  const editConfig = t && {
    id: 'editTcode',
    title: 'Edit Course',
    action: '?/save',
    initial: {
      id: t.id,
      slug: t.slug,              // preserved hidden
      name: t.name || '',
      description: t.description || '',
      image: t.image || ''
    },
    items: [
      { type:'hidden', name:'id',   value: t.id },
      { type:'hidden', name:'slug', value: t.slug },
      { type:'text',   name:'name', label:'Name', required:true },
      { type:'text',   name:'description', label:'Description' },
      { type:'text',   name:'image', label:'Image URL' },
      { type:'note',   text:`Slug: ${t.slug}` }
    ],
    submit: { label:'Save', disabledWhen: v => !v.name?.trim() },
    clearOnSuccess: false,
    showErrorsList: true
  };

  const deleteConfig = t && {
    id: 'deleteTcode',
    title: 'Delete Course',
    description: 'This cannot be undone. If chapters or questions exist, delete will fail.',
    action: '?/del',
    initial: { id: t.id },
    items: [
      { type:'hidden', name:'id', value: t.id }
    ],
    submit: { label:'Delete' },
    clearOnSuccess: true
  };

  function onEditSuccess(ev){
    // Stay on page; optionally toast via your system
    // ev.detail => { ok:true, message, id, slug }
  }
  function onDeleteSuccess(ev){
    // Go back to Tcodes list after delete
    goto('/admin/syllabus/tcodes');
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
  .wrap{
    margin-inline:auto;
    padding:1rem;
    width:min(80vw, 1100px);
    color:var(--primaryText);
  }
  .divider{
    margin:1.25rem 0;
    height:1px;
    background:var(--borderColor);
  }
  .msg{
    padding:.75rem 1rem;
    border:1px solid var(--borderColor);
    border-radius:12px;
    background:var(--surfaceColor);
    color:var(--secondaryText);
  }
</style>
