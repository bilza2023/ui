
<script>
  import FormUi from '$lib/formUi/FormUi.svelte';

  // from +page.server.js
  export let data;

  // Add Tcode form config
  const addTcodeConfig = {
    id: 'addTcode',
    title: 'Add Tcode',
    action: '?/addTcode',
    initial: { name: '', description: '', image: '' },
    items: [
      { type:'text', name:'name', label:'Name', required:true, placeholder:'e.g. FBISE 9th Math' },
      { type:'text', name:'description', label:'Description', placeholder:'Optional' },
      { type:'text', name:'image', label:'Image URL', placeholder:'/media/images/taleem.webp' }
    ],
    submit: { label: 'Add', disabledWhen: v => !v.name?.trim() },
    clearOnSuccess: true,
    showErrorsList: true
  };

  function handleSuccess(ev) {
    const { tcode } = ev.detail || {};
    if (tcode) {
      console.log('Added tcode:', tcode);
    }
  }
</script>

<div class="wrap">
  <FormUi config={addTcodeConfig} on:success={handleSuccess} />
</div>

<style>
  .wrap {
    max-width: 640px;
    margin: 2rem auto;
  }
</style>
