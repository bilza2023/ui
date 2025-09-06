<script>
  // Loader data from +page.server.js
  export let data = {};
console.log("data",data);
  // Reuse the existing Syllabus components
  import QuestionCard from '$lib/questionCards/QuestionCard.svelte';   // expects `items=[]`
  // (QuestionItem is used internally by QuestionCard; no need to import here)

  // Accept common loader keys and pick one list to show
  const items =
    Array.isArray(data?.items)        ? data.items :
    Array.isArray(data?.questions)    ? data.questions :
    Array.isArray(data?.blog_index)   ? data.blog_index :
    [];

  // Nothing else: background + spacing are handled by the root layout & tokens
</script>

<!-- Edge-to-edge; no .page wrapper, no styles -->
<QuestionCard items={items} />
