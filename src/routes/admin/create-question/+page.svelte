<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  import { page } from '$app/stores';
  export let data;
  // $: tcode = $page.url.searchParams.get('tcode') || '';
  const { tcode, questionType, chapters, exercisesByChapter } = data;

  // let questionType = '';
  // $: questionType = $page.url.searchParams.get('questionType') || '';

  const baseItems = [
    { type:'text', name:'name', label:'Name', required:true },
    { type:'text', name:'description', label:'Description' },
    { type:'select', name:'status', label:'Status',
      options: () => [
        { value:'draft', label:'Draft' },
        { value:'ready', label:'Ready' },
        { value:'published', label:'Published' },
        { value:'archived', label:'Archived' }
      ]
    },
    { type:'select', name:'chapter', label:'Chapter',
      options: () => chapters.map(c => ({ value:c.value, label:c.label }))
    },
    { type:'select', name:'exercise', label:'Exercise',
      options: () => {
        const first = chapters[0]?.slug;
        return exercisesByChapter[first] ?? [];
      }
    },
    // home-index fields
    { type:'select', name:'homeCategory', label:'Home category',
  options: () => [
    { value:'videos',  label:'Videos' },
    { value:'blog',    label:'Blog' },
    { value:'courses', label:'Courses' }
  ]
  },
    { type:'number', name:'homeSort', label:'Home Sort', min:0 },
    { type:'checkbox', name:'homePinned', label:'Pinned?' }
  ];

  const typeItems = questionType === 'deck'
    ? [ { type:'textarea', name:'deckJson', label:'Deck JSON', rows:10 } ]
    : [ { type:'textarea', name:'noteHtml', label:'Note HTML', rows:10 } ];

  const config = {
    id: 'createQuestion',
    title: `Create in ${tcode} / ${questionType}`,
    // carry tcode + questionType in action URL so server sees them
    action: `?/save&tcode=${tcode}&questionType=${questionType}`,
    items: [...baseItems, ...typeItems],
    submit: { label:'Save' },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function handleSuccess(ev) {
    console.log('Created:', ev.detail);
  }
</script>

<div class="wrap">
  <FormUi config={config} on:success={handleSuccess}/>
</div>


<style>
  .wrap {
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 20px;
  }

</style>