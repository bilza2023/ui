
<script>

import { onMount } from 'svelte';
  // import QuestionCard from '../../lib/homeIndex/QuestionCard.svelte';
  import QCard from '../../lib/homeIndex/QCard.svelte';
  export let data;
  const questions = data?.questions ?? [];
  // let questions = [];

  // onMount(async () => {
  //   try {
  //     const res = await fetch('/data/index_syllabus.json');
  //     if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  //     questions = await res.json();
  //   } catch (err) {
  //     console.error('Error loading syllabus index:', err);
  //     // Optionally set questions = [] or show an error state
  //   }
  // });
</script>

<div class="app-container">
  <div class="layout-container">
    <div class="main-content">
      <!-- Sample Videos -->
      <div class="questions-container">
        <!-- Only render once loaded -->
        {#if questions.length}
          <QCard 
          {questions} 
          />
        {:else}
          <p>Loading…</p>
        {/if}
      </div>
    </div>
  </div>
</div>
