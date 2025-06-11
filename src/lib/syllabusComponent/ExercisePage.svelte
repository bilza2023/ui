<script>
  export let chapter = null;
  export let onSelectExercise = (ex) => {};
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

{#if chapter}
  <!-- <div class="px-4">
    <h2 class="text-2xl font-semibold mb-4 text-[#f6e3bf]">
      {chapter.name} — Exercises
    </h2>
  </div> -->

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10">
    {#each chapter.exercises as ex (ex.exerciseName)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        on:click={() => onSelectExercise(ex)}
        class={`group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col
                ${theme.bgCard} ${theme.border} border`}
      >
        <!-- Icon Area -->
        <div class={`h-32 w-full flex items-center justify-center ${theme.bgCardAlt} border-b ${theme.border} rounded-t-xl`}>
          <div class="text-5xl group-hover:scale-110 transition-transform duration-300">
            💼
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-4 flex flex-col flex-grow">
          <h3 class={`text-lg font-semibold ${theme.text} line-clamp-1 text-black`}>
            {ex.exerciseName
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}

          </h3>

          <div class="mt-4">
            <span class={`inline-block ${theme.badgeBg} ${theme.badgeText} text-xs font-medium px-2.5 py-1 rounded-full`}>
              {ex.questions.length} Questions
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
