<script>
    import FormUi from '$lib/formUi/FormUi.svelte';
    export let data;
  
    const { tcode, chapter } = data;
  
    const config = {
      id: 'editChapter',
      title: `Edit Chapter — ${tcode.name}`,
      action: '?/updateChapter',
      initial: {
        tcodeSlug: tcode.slug,
        chapterSlug: chapter.slug,
        name: chapter.name,
        sortOrder: String(chapter.sortOrder ?? '')
      },
      items: [
        { type: 'hidden', name: 'tcodeSlug', value: tcode.slug },
        { type: 'hidden', name: 'chapterSlug', value: chapter.slug },
  
        { type: 'text',   name: 'name',      label: 'Name', required: true, placeholder: 'Chapter name' },
        { type: 'number', name: 'sortOrder', label: 'Sort order', step: 1, placeholder: '0' },
        { type: 'note',   text: `Slug is immutable: (${chapter.slug})` }
      ],
      submit: { label: 'Save', disabledWhen: (v) => !v.name?.trim() },
      clearOnSuccess: false,
      showErrorsList: true
    };
  
    function onSuccess(e) {
      // e.detail: { ok, message, tcodeSlug, chapterSlug, updates }
      console.log('Chapter updated:', e.detail);
    }
  </script>
  
  <div class="wrap">
    <FormUi config={config} on:success={onSuccess} />
    <div class="nav">
      <a href={`/admin/synopsis/tcode/${tcode.slug}/chapter`}>← Back to chapters</a>
    </div>
  </div>
  
  <style>
    .wrap { max-width: 640px; margin: 2rem auto; display: grid; gap: 1rem; }
    .nav a { color: var(--primaryColor); text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
  </style>
  