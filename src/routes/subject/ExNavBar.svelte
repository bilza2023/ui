<script>
	export let exercises = [];
	export let selectedExercise = null;
  
	function selectExercise(exercise) {
	  dispatch('select', { exercise });
	}
  
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  </script>
  
  <div class="exercise-nav">
	<button
	  class="exercise-btn"
	  class:selected={!selectedExercise}
	  on:click={() => selectExercise(null)}
	>
	  All
	</button>
	{#each exercises as exercise}
	  <button
		class="exercise-btn"
		class:selected={selectedExercise?.filename === exercise.filename}
		on:click={() => selectExercise(exercise)}
	  >
		{exercise.name}
	  </button>
	{/each}
  </div>
  
  <style>
	.exercise-nav {
	  display: flex;
	  flex-wrap: wrap;
	  gap: 0.5rem;
	  color: #e9e4dd;
	  padding: 0.5rem;
	  background: #2e1c02;
	  border-bottom: 1px solid #ddd;
	  overflow-x: auto;
	}
	.exercise-btn {
	  padding: 0.5rem 1rem;
	  background: none;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  cursor: pointer;
	}
	.exercise-btn:hover {
	  background: #7d551c;
	}
	.exercise-btn.selected {
	  background: #007bff;
	  color: white;
	  border-color: #007bff;
	}
  </style>