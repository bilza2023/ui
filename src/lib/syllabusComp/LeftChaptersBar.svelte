<script>
	import { createEventDispatcher } from 'svelte';
  
	// Strict contract: chapters = [{ name, slug, number?, sortOrder? }]
	export let chapters = [];
	export let activeSlug = null;
  
	const dispatch = createEventDispatcher();
  
	// Display number only; identity is always slug
	const num = (ch, i) =>
	  String(ch?.number ?? ch?.sortOrder ?? (i + 1)).padStart(2, '0');
  
	function pick(slug) {
	  // always emit slug
	  dispatch('pick', { slug });
	}
  </script>
  
  <div class="sidebar">
	<div class="title">Chapters</div>
	<div class="list">
	  {#each chapters as ch, i (ch.slug)}
		<button
		  class="ch"
		  class:active={activeSlug === ch.slug}
		  on:click={() => pick(ch.slug)}
		  title={ch.name}>
		  <span class="num">{num(ch, i)}</span>
		  <span class="name">{ch.name}</span>
		</button>
	  {/each}
	</div>
  </div>
  
  <style>
	.sidebar{
	  height:100%;
	  display:flex;
	  flex-direction:column;
	  gap:8px;
	  background: inherit;
	  color: var(--primaryText);
	}
	.title{
	  padding:12px;
	  font-weight:600;
	  letter-spacing:0.3px;
	  color: var(--primaryText);
	  border-bottom:1px solid var(--borderColor);
	}
	.list{ display:flex; flex-direction:column; }
	.ch{
	  display:flex; gap:10px; align-items:center; text-align:left;
	  padding:8px 12px;
	  border:0; background:transparent; cursor:pointer;
	  color: var(--secondaryText);
	  border-left:4px solid transparent;
	  transition: background .15s ease, border-color .15s ease, color .15s ease;
	}
	.ch:hover{
	  background: color-mix(in oklab, var(--primaryColor) 10%, var(--surfaceColor));
	  color: var(--primaryText);
	}
	.ch:focus-visible{
	  outline:2px solid var(--primaryColor);
	  outline-offset:2px;
	}
	.ch.active{
	  background: color-mix(in oklab, var(--primaryColor) 18%, var(--surfaceColor));
	  color: var(--primaryText);
	  border-left-color: var(--primaryColor);
	}
	.num{
	  min-width:28px;
	  padding:2px 6px;
	  border-radius:6px;
	  background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
	  color: var(--primaryText);
	  font-size:12px;
	}
	.name{
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap;
	}
  </style>
  