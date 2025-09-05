
<script>	
	import { createEventDispatcher } from "svelte";
	export let exercises = [];   // [{ slug, label, total }]
	export let activeSlug = "";  // slug of current exercise
	const dispatch = createEventDispatcher();
	const pick = (slug) => dispatch("pick", { slug });
  </script>
  
<div class="exbar">
	{#each exercises as ex (ex.slug)}
  <button
    class="ex"
    class:active={activeSlug === ex.slug }
    on:click={() => pick(ex.slug)}
    title={ex.label}>
    <span class="label">{ex.label}</span>
   
  </button>
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
  </style>
  