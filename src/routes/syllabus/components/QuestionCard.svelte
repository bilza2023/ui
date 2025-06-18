<script>
  export let question;
  export let isSubscribed = false;
</script>

<div class="bg-white rounded-xl shadow p-4 hover:ring-2 ring-yellow-600 transition">
  <h3 class="text-md font-semibold text-gray-800 mb-1">
    Q{question.questionNo}{question.questionPart}
  </h3>

  <p class="text-gray-700 mb-2">{question.name}</p>

  <div class="text-xs text-gray-500 flex flex-wrap gap-2">
    <span class="bg-gray-200 rounded px-2 py-1">Type: {question.type}</span>

    {#if question.tags?.length}
      {#each question.tags as tag}
        <span class="bg-blue-100 text-blue-800 rounded px-2 py-1">{tag}</span>
      {/each}
    {/if}
  </div>
</div>
