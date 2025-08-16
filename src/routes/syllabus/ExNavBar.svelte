<script>
	import { createEventDispatcher } from 'svelte';
  
	export let exercises = [];          // [{ name, filename }]
	export let activeSlug = null;       // exercise filename
	export let counts = {};             // { [slug]: { total, deck, note, latestEditedAt } }
  
	const dispatch = createEventDispatcher();
	function pick(slug) { dispatch('pick', { slug }); }
  </script>
  
  <div class="exbar">
	{#each exercises as ex}
	  {#key ex.filename}
		<button
		  class="ex"
		  class:active={activeSlug === ex.filename}
		  on:click={() => pick(ex.filename)}
		  title={ex.name}>
		  <span class="label">{ex.name}</span>
		  {#if counts && counts[ex.filename]}
			<span class="badges">
			  <span class="b total" title="Total">{counts[ex.filename].total}</span>
			  <span class="b decks" title="Decks">{counts[ex.filename].deck}</span>
			  <span class="b notes" title="Notes">{counts[ex.filename].note}</span>
			</span>
		  {/if}
		</button>
	  {/key}
	{/each}
  </div>
  
  <style>
	.exbar{ display:flex; gap:8px; flex-wrap:wrap; }
	.ex{
	  display:flex; gap:8px; align-items:center; max-width:100%;
	  padding:6px 10px; border:1px solid #6b4a12; background:#3b2606; color:#e6ccb0; border-radius:999px; cursor:pointer;
	}
	.ex.active{ background:#78471a; border-color:#b07b2a; color:#fff2e0; }
	.label{ max-width:42ch; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
	.badges{ display:flex; gap:6px; }
	.b{
	  padding:2px 6px; border-radius:999px; font-size:12px; line-height:1; border:1px solid transparent;
	  background:#241706; color:#d5bd9b;
	}
	.b.total{ border-color:#5a3c0d; }
	.b.decks{ background:#0c0535; color:#dcd6ff; }
	.b.notes{ background:#6c430b; color:#ffe3c4; }
  </style>
  