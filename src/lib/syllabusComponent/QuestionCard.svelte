<script>
  // export let exercise;
  export let question;
  // console.log("questionCard",question);
  // debugger;
  export let isSubscribed = false;

  const theme = {
    bgCard: "bg-[#F3F4F6]",
    bgCardAlt: "bg-[#F2D7AC]",
    border: "border-[#93754b]",
    text: "text-[#fff5e0]",
    textDim: "text-[#c9b99d]",
    badgeBg: "bg-[#3d2a18]",
    badgeText: "text-[#e9d5a0]"
  };
</script>
<a
  class={`group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col
          ${theme.bgCard} ${theme.border} border w-full max-w-[240px]`}

  href={`/${question.questionType}?${question.tcodeUrl()}`}
  target="_blank"
>
  <!-- Icon Area -->
  <div class={`h-32 w-full flex items-center justify-center ${theme.bgCardAlt} border-b ${theme.border} rounded-t-xl`}>
    <div class="text-5xl group-hover:scale-110 transition-transform duration-300">
      🗃️
    </div>
  </div>

  <!-- Card Content -->
  <div class="p-4 flex flex-col flex-grow">
    <h3 class={`text-lg font-semibold ${theme.text} line-clamp-1 text-black`}>
      Q{question.questionNo}
    </h3>
    <p class={`text-sm ${theme.textDim} line-clamp-2 mt-1 flex-grow`}>
      {question.exercise}
    </p>
    <!-- <p class={`text-sm ${theme.textDim} line-clamp-2 mt-1 flex-grow`}>
      {question.questionType.toUpperCase()}
    </p> -->

    <div class="mt-4">
      <span class={`inline-block ${theme.badgeBg} ${theme.badgeText} text-xs font-medium px-2.5 py-1 rounded-full`}>
        {question.questionType.toUpperCase()}
      </span>
    </div>
  </div>
</a>
