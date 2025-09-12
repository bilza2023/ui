<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const { tcodeId, chapterId, exerciseId } = data;

  const config = {
    id: 'createQuestion',
    title: 'Create Question',
    action: '?/add',
    initial: {
      name: '',
      type: 'note',
      status: 'draft',
      description: '',
      thumbnail: '',
      tcodeId,
      chapterId,
      exerciseId
    },
    items: [
      { type:'text', name:'name', label:'Name', required:true },
      {
        type:'select', name:'type', label:'Type',
        options: () => [
          { value:'note', label:'Note' },
          { value:'deck', label:'Deck' }
        ]
      },
      {
        type:'select', name:'status', label:'Status',
        options: () => [
          { value:'draft', label:'Draft' },
          { value:'ready', label:'Ready' },
          { value:'published', label:'Published' },
          { value:'archived', label:'Archived' }
        ]
      },
      { type:'text', name:'thumbnail', label:'Thumbnail URL' },
      { type:'text', name:'description', label:'Description'},

      // locked from URL
      { type:'hidden', name:'tcodeId', value: tcodeId },
      { type:'hidden', name:'chapterId', value: chapterId },
      { type:'hidden', name:'exerciseId', value: exerciseId },
      { type:'textarea', name:'noteOrDeck', label:'Note/Deck', rows:6 },
    ],
    submit: {
      label: 'Create',
      disabledWhen: (v) =>  !v.name?.trim() || !v.type
    },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function handleSuccess(e){
    // e.detail => { ok:true, id, slug }
    // optional: navigate or toast
  }
</script>

<section class="wrap">
  <FormUi config={config} on:success={handleSuccess}/>
</section>

<style>
  .wrap{
    margin-inline:auto;
    width:min(90vw, 900px);
    padding:1rem;
    color:var(--primaryText);
  }
</style>
