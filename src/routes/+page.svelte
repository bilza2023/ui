<script>
  import BulletsNav from '$lib/components/BulletsNav.svelte';
  import QuestionCard from '../lib/questionCards/QuestionCard.svelte';

  export let data;

  // console.log("data" , data);

  $: questions = data?.questions ?? [];
  $: types = ["videos" , "blog" ]

  let activeType = 'videos';

  function onSelect(e) {
    activeType = e.detail.type;
  }

  $: filtered = questions.filter(q => q.category === activeType);
</script>

<BulletsNav {types} on:select={onSelect} />

<div class="cards">
  <!-- {#each filtered as q} -->
  <QuestionCard items={filtered} />
<!-- {/each} -->
</div>
