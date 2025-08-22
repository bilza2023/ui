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
	.exbar{
	  display:flex;
	  gap:8px;
	  flex-wrap:wrap;
	}
  
	.ex{
	  display:flex;
	  gap:8px;
	  align-items:center;
	  max-width:100%;
	  padding:6px 10px;
  
	  border:1px solid var(--borderColor);
	  border-radius:999px;
	  cursor:pointer;
  
	  /* subtle tint so it stands apart from the surface */
	  background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
	  color: var(--primaryText);
  
	  transition: background .15s ease, border-color .15s ease, color .15s ease, transform .12s ease;
	}
	.ex:hover{
	  background: color-mix(in oklab, var(--accentColor) 14%, var(--surfaceColor));
	  border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
	  transform: translateY(-1px);
	}
	.ex:active{ transform: translateY(0); }
	.ex:focus-visible{
	  outline:2px solid var(--primaryColor);
	  outline-offset:2px;
	}
	.ex.active{
	  background: var(--primaryColor);
	  border-color: var(--primaryColor);
	  color: var(--backgroundColor);
	}
  
	.label{
	  max-width:42ch;
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap;
	}
  
	.badges{
	  display:flex;
	  gap:6px;
	}
  
	/* badge base */
	.b{
	  padding:2px 6px;
	  border-radius:999px;
	  font-size:12px;
	  line-height:1;
	  border:1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--surfaceColor) 85%, var(--backgroundColor));
	  color: var(--primaryText);
	}
  
	/* semantic tints using tokens */
	.b.total{
	  background: color-mix(in oklab, var(--accentColor) 18%, var(--surfaceColor));
	}
	.b.decks{
	  background: color-mix(in oklab, var(--primaryColor) 18%, var(--surfaceColor));
	}
	.b.notes{
	  background: color-mix(in oklab, var(--secondaryColor) 18%, var(--surfaceColor));
	}
  
	/* keep badges readable on active (inverted) button */
	.ex.active .b{
	  border-color: color-mix(in oklab, var(--backgroundColor) 40%, var(--primaryColor));
	  color: var(--backgroundColor);
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--primaryColor));
	}
	.ex.active .b.total{
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--accentColor));
	}
	.ex.active .b.decks{
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--primaryColor));
	}
	.ex.active .b.notes{
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--secondaryColor));
	}
  </style>
  
  