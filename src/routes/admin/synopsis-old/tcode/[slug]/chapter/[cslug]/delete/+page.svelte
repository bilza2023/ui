<script>
    import FormUi from '$lib/formUi/FormUi.svelte';
    import { goto } from '$app/navigation';
    export let data;
  
    const { tcode, chapter, hasExercises, exerciseCount } = data;
  
    const config = {
      id: 'deleteChapter',
      title: `Delete Chapter — ${tcode.name}`,
      description: hasExercises
        ? `This chapter has ${exerciseCount} exercise(s). Delete or move them first.`
        : 'This action is permanent.',
      action: '?/deleteChapter',
      initial: { tcodeSlug: tcode.slug, chapterSlug: chapter.slug },
      items: [
        { type: 'hidden', name: 'tcodeSlug', value: tcode.slug },
        { type: 'hidden', name: 'chapterSlug', value: chapter.slug },
        { type: 'note', text: hasExercises
            ? 'Deletion disabled: exercises exist.'
            : `Are you sure you want to delete "${chapter.name}"?` }
      ],
      submit: { label: 'Delete', disabledWhen: () => hasExercises },
      clearOnSuccess: false,
      showErrorsList: true
    };
  
    function onSuccess() {
      // After delete, go back to this tcode's chapter list
      goto(`/admin/synopsis/tcode/${tcode.slug}/chapter`);
    }
  </script>
  
  <div class="wrap">
    <FormUi config={config} on:success={onSuccess} />
  </div>
  
  <style>
    .wrap { max-width: 640px; margin: 2rem auto; }
  </style>
  