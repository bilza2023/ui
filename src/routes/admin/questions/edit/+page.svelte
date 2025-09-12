<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
  export let data;

  const { slug, tcode, questionType, chapters, exercisesByChapter, question } = data;

  // Map current chapter number to its slug for exercise options
  const chapterIndex = (question?.chapter ?? 1) - 1;
  const currentChapterSlug = chapters[chapterIndex]?.slug;

  const baseItems = [
    { type:'text',   name:'name',         label:'Name', required:true, value: question?.name || '' },
    { type:'text',   name:'description',  label:'Description',         value: question?.description || '' },
    { type:'select', name:'status',       label:'Status',
      value: question?.status || 'draft',
      options: () => [
        { value:'draft',     label:'Draft' },
        { value:'ready',     label:'Ready' },
        { value:'published', label:'Published' },
        { value:'archived',  label:'Archived' }
      ]
    },
    { type:'select', name:'chapter',      label:'Chapter',
      value: question?.chapter ?? 1,
      options: () => chapters.map(c => ({ value:c.value, label:c.label }))
    },
    { type:'select', name:'exercise',     label:'Exercise',
      value: question?.exercise || '',
      options: () => exercisesByChapter[currentChapterSlug] ?? []
    },
    // home-index fields
    { type:'text',   name:'homeCategory', label:'Home Category',        value: question?.homeCategory ?? '' },
    { type:'number', name:'homeSort',     label:'Home Sort', min:0,     value: question?.homeSort ?? 0 },
    { type:'checkbox', name:'homePinned', label:'Pinned?',              checked: !!question?.homePinned }
  ];

  const typeItems = questionType === 'deck'
    ? [ { type:'textarea', name:'deckJson', label:'Deck JSON', rows:12,
           value: question?.deck ? JSON.stringify(question.deck, null, 2) : '' } ]
    : [ { type:'textarea', name:'noteHtml', label:'Note HTML', rows:12,
           value: question?.note || '' } ];

  const config = {
    id: 'editQuestion',
    title: `Edit ${questionType}`,
    // carry all params so server action selects correct spec and target
    action: `?/save&tcode=${tcode}&questionType=${questionType}&slug=${slug}`,
    items: [...baseItems, ...typeItems],
    submit: { label:'Update' },
    clearOnSuccess: false,
    showErrorsList: true
  };

  function handleSuccess(ev) {
    console.log('Updated:', ev.detail);
  }
</script>

<div class="wrap">
  <FormUi config={config} on:success={handleSuccess}/>
</div>



<style>
  .wrap {
    padding-left: 200px;
    padding-right: 200px;
  }
</style>