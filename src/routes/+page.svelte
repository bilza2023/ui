<script>
  import BulletsNav from '$lib/components/BulletsNav.svelte';
  import QuestionCard from '../lib/questionCards/QuestionCard.svelte';

  export let data;

  $: questions = data?.questions ?? [];
  $: types = Array.from(new Set(questions.map(q => q.type))).filter(Boolean);

  let activeType = '';

  function onSelect(e) {
    activeType = e.detail.type;
  }

  $: filtered = activeType
    ? questions.filter(q => q.type === activeType)
    : questions;
</script>

<BulletsNav {types} on:select={onSelect} />

<div class="cards">
  <!-- {#each filtered as q} -->
  <QuestionCard items={filtered} />
<!-- {/each} -->
</div>
