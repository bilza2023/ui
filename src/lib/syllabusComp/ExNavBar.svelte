<script>
	import { createEventDispatcher } from 'svelte';
  
	export let exercises = [];     // [{ name, filename? , slug? }]
	export let activeSlug = null;  // 'all' | exercise id
	export let counts = {};        // { [lowercaseSlug]: { total } }
  
	const dispatch = createEventDispatcher();
	const id = (ex, i) => ex?.filename ?? ex?.slug ?? `idx-${i}`;
	const label = (ex) => ex?.name ?? ex?.title ?? ex?.slug ?? '—';
	const lc = (s) => (s ?? '').toString().trim().toLowerCase();
  
	function pick(slug) { dispatch('pick', { slug }); }
  </script>
  
  <div class="exbar">
	{#each exercises as ex, i (id(ex, i))}
	  {#key id(ex, i)}
		<button
		  class="ex"
		  class:active={activeSlug === id(ex, i)}
		  on:click={() => pick(id(ex, i))}
		  title={label(ex)}>
		  <span class="label">{label(ex)}</span>
  
		  {#if counts && counts[lc(id(ex, i))] != null && counts[lc(id(ex, i))].total != null}
			<span class="b total" title="Total">{counts[lc(id(ex, i))].total}</span>
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
  
	/* single badge */
	.b{
	  padding:2px 6px;
	  border-radius:999px;
	  font-size:12px;
	  line-height:1;
	  border:1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--surfaceColor) 85%, var(--backgroundColor));
	  color: var(--primaryText);
	}
	.b.total{
	  background: color-mix(in oklab, var(--accentColor) 18%, var(--surfaceColor));
	}
  
	/* keep badge readable on active (inverted) button */
	.ex.active .b{
	  border-color: color-mix(in oklab, var(--backgroundColor) 40%, var(--primaryColor));
	  color: var(--backgroundColor);
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--primaryColor));
	}
	.ex.active .b.total{
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--accentColor));
	}
  </style>
  