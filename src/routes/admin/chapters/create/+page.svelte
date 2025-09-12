<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const config = {
    id: 'addChapter',
    title: 'Add Chapter',
    action: '?/add',
    initial: { tcodeId: data.tcodeId, name: '', sortOrder: 0 },
    items: [
      { type:'hidden', name:'tcodeId', value:data.tcodeId },
      { type:'text', name:'name', label:'Name', required:true, placeholder:'e.g. Physical Quantities and Measurement' },
      { type:'number', name:'sortOrder', label:'Sort order', min:0, step:1 },
      { type:'note', text:'Slug is auto-generated from Name.' }
    ],
    submit: { label: 'Add Chapter', disabledWhen: v => !v.tcodeId || !v.name?.trim() },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function onSuccess(e) {
    const tcodeId = e.detail?.tcodeId || data.tcodeId;
    // if (tcodeId) goto(`/admin/syllabus/chapters?id=${tcodeId}`);
  }
</script>

<section class="wrap">
  <FormUi {config} on:success={onSuccess} />
</section>

<style>
  .wrap{
    width: min(90vw, 1100px);
    margin-inline: auto;
    padding: 1rem;
    color: var(--primaryText);
  }
</style>
