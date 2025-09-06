<script>
  export let data = {};
  import QuestionCards from '$lib/questionCards/QuestionCards.svelte';

  const categories = Array.isArray(data?.categories) ? data.categories : [];
  const all = Array.isArray(data?.items) ? data.items : [];
  let active = categories[0]?.slug ?? '';

  $: items = active ? all.filter(i => i?.category === active) : all;
</script>


<QuestionCards questions={items} />
