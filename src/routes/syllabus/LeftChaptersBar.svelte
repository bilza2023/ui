<script>
	import { createEventDispatcher } from 'svelte';
  
	export let chapters = [];      // [{ name, filename, number, order }]
	export let activeSlug = null;  // chapter filename
  
	const dispatch = createEventDispatcher();
	function pick(slug) { dispatch('pick', { slug }); }
  </script>
  
  <div class="sidebar">
	<div class="title">Chapters</div>
	<div class="list">
	  {#each chapters as ch}
		<button
		  class="ch"
		  class:active={activeSlug === ch.filename}
		  on:click={() => pick(ch.filename)}
		  title={ch.name}>
		  <span class="num">{ch.number.toString().padStart(2,'0')}</span>
		  <span class="name">{ch.name}</span>
		</button>
	  {/each}
	</div>
  </div>
  
  <style>
	.sidebar{
	  height:100%; display:flex; flex-direction:column; gap:8px;
	  background:#221605;
	}
	.title{
	  padding:12px; color:#e6ccb0; font-weight:600; letter-spacing:0.3px; border-bottom:1px solid #3b2606;
	}
	.list{ display:flex; flex-direction:column; }
	.ch{
	  display:flex; gap:10px; align-items:center; text-align:left;
	  padding:8px 12px; border:none; background:transparent; color:#d7c1a5; cursor:pointer;
	  border-left:4px solid transparent;
	}
	.ch:hover{ background:#2a1a06; }
	.ch.active{ background:#2f1d07; color:#fff2e0; border-left-color:#eab308; }
	.num{
	  min-width:28px; padding:2px 6px; border-radius:6px; background:#3b2606; color:#e6ccb0; font-size:12px;
	}
	.name{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  </style>
  