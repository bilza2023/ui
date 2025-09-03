
<script>
    import FormUi from '$lib/formUi/FormUi.svelte';
    import { goto } from '$app/navigation';
    export let data;
  
    const { tcode, chapter, exercise } = data;
  
    const config = {
      id: 'deleteExercise',
      title: `Delete Exercise — ${tcode.name} / ${chapter.name}`,
      description: `Are you sure you want to delete "${exercise.name}" (${exercise.slug})?`,
      action: '?/deleteExercise',
      initial: {
        tcodeSlug: tcode.slug,
        chapterSlug: chapter.slug,
        exerciseSlug: exercise.slug
      },
      items: [
        { type: 'hidden', name: 'tcodeSlug', value: tcode.slug },
        { type: 'hidden', name: 'chapterSlug', value: chapter.slug },
        { type: 'hidden', name: 'exerciseSlug', value: exercise.slug },
        { type: 'note', text: 'This action is permanent.' }
      ],
      submit: { label: 'Delete' },
      clearOnSuccess: false,
      showErrorsList: true
    };
  
    function onSuccess() {
      // After delete, go back to the exercises list for this chapter
      goto(`/admin/synopsis/tcode/${tcode.slug}/chapter/${chapter.slug}/exercise`);
    }
  </script>
  
  <div class="wrap">
    <FormUi config={config} on:success={onSuccess} />
  </div>
  
  <style>
    .wrap { max-width: 640px; margin: 2rem auto; }
  </style>
  