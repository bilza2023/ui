<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';

  export let data;
  const initial = data.initial || {};

  const config = {
    id: 'editQuestion',
    title: 'Edit Question',
    action: '?/save',
    initial,
    layout: 'stack',
    items: [
      { type:'hidden', name:'questionId', value: initial.questionId ?? '' },

      { type:'text', name:'name', label:'Name', required:true, placeholder:'Title' },
      { type:'text', name:'description', label:'Description', placeholder:'Short description' },
      { type:'text', name:'thumbnail', label:'Thumbnail URL', placeholder:'/media/images/...' },

      { type:'select', name:'status', label:'Status',
        options: () => [
          { value:'draft', label:'Draft' },
          { value:'ready', label:'Ready' },
          { value:'published', label:'Published' },
          { value:'archived', label:'Archived' }
        ]
      },

      { type:'select', name:'type', label:'Type',
        options: () => [
          { value:'note', label:'Note' },
          { value:'deck', label:'Deck' }
        ]
      },

      { type:'note', text:'Enter plain text for Note, or valid JSON for Deck.' },
      { type:'textarea', name:'noteOrDeck', label:'Note or Deck JSON', rows:14, placeholder:'Note text or Deck JSON' }
    ],
    submit: {
      label: 'Save',
      disabledWhen: (v) => !v?.questionId || !v?.name?.trim() || !v?.type
    },
    clearOnSuccess: false,
    showErrorsList: true
  };

  function handleSuccess(e){
    // e.detail = { ok:true, id }
    // optional: toast or navigation
  }
</script>

<section class="wrap">
  <FormUi {config} on:success={handleSuccess} />
</section>

<style>
  .wrap{
    margin-inline:auto;
    width:min(90vw, 1100px);
    padding:1rem;
    color:var(--primaryText);
  }
</style>
