
<script>
    export let question;
    export let isSubscribed = false;
  </script>
  
  <a
    class="block border rounded-md p-4 transition hover:shadow-md relative bg-yellow-50 hover:bg-yellow-100"
    href={`/${question.questionType}/${question.tcodeUrl()}`}
  >
    <div class="flex justify-between items-center">
      <h4 class="font-semibold text-base">Q{question.questionNo}{question.questionPart}</h4>
      <span class="text-sm text-gray-600">{question.questionType.toUpperCase()}</span>
    </div>
  
    {#if !isSubscribed}
      <div class="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
        <span class="text-red-600 font-bold">Locked</span>
      </div>
    {/if}
  </a>