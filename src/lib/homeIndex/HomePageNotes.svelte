<script>
  import { onMount } from "svelte";
  import QuestionCard from "./QuestionCard.svelte";

  let questions = [];

  onMount(async () => {
    try {
      const res = await fetch("/data/index_syllabus.json");
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      questions = await res.json();
    } catch (err) {
      console.error("Error loading syllabus index:", err);
      // Optionally set questions = [] or show an error state
    }
  });
</script>

<div class="app-container">
  <div class="layout-container">
    <div class="main-content">
      <div class="questions-container">
        <!-- Only render once loaded -->
        {#if questions.length}
          <QuestionCard {questions} />
        {:else}
          <p>Loading…</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .layout-container {
    display: flex;
    flex: 1;
    gap: 0;
    margin: 0;
    padding: 0;
    min-height: 0;
  }

  .main-content {
    flex: 1;
    width: 95%;
    margin: 0;
    padding: 0;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .questions-container {
    flex: 1;
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: flex-start;
    background-color: rgb(193, 178, 148);
    border-radius: 2%;
  }

  @media (max-width: 768px) {
    .main-content {
      width: 100%;
    }
  }
</style>
