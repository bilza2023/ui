<script>
	import { goto } from '$app/navigation';
	import LeftChaptersBar from './LeftChaptersBar.svelte';
	import ExNavBar from './ExNavBar.svelte';
	import QuestionCard from './QuestionCard.svelte';
	// Provided by +page.server.js
	export let data;
  
	// Local state
	let tcode = null;
	let chapters = [];
	let chapter = null;
	let exercises = [];
	let exercise = null;
	let counts = {};
	let items = [];
	let typeFilter = null; // 'deck' | 'note' | null
	let tcodeDesc = '';
  
	// Sync from server data
	$: if (data) {
	  ({ tcode, chapters, chapter, exercises, exercise, counts, items, typeFilter } = data);
	  // Optional: pull description from the registry payload if present
	  tcodeDesc = (data.tcodeList ?? []).find(t => t.tcodeName === tcode)?.description ?? '';
	}
  
	// URL is the state (tcode is fixed; we only change chapter/exercise/type)
	function go(params) {
	  const p = new URLSearchParams({
		tcode,
		chapter:  params.chapter  ?? chapter,
		exercise: params.exercise ?? exercise,
		...(params.type ? { type: params.type } : {})
	  });
	  goto(`/syllabus?${p.toString()}`, { replaceState: true, keepfocus: true, noScroll: false });
	}
  
	function onPickChapter(e) {
	  const slug = e.detail?.slug;
	  if (!slug || slug === chapter) return;
	  // when chapter changes, reset exercise to the first of that chapter
	  go({ chapter: slug, exercise: undefined });
	}
  
	function onPickExercise(e) {
	  const slug = e.detail?.slug;
	  if (!slug || slug === exercise) return;
	  go({ exercise: slug });
	}
  
	function setTypeFilter(next) {
	  go({ type: next ?? undefined });
	}
  </script>
  
  {#if !tcode}
	<div class="empty">No syllabus registered.</div>
  {:else}
	<!-- Top strip: fixed single-tcode header + filters -->
	<div class="topbar one">
	  <div class="title">
		<div class="tcode">{tcode}</div>
		{#if tcodeDesc}<div class="desc">{tcodeDesc}</div>{/if}
	  </div>
  
	  <div class="filters">
		<span>Filter:</span>
		<button class:active={!typeFilter} on:click={() => setTypeFilter(null)}>All</button>
		<button class:active={typeFilter==='deck'} on:click={() => setTypeFilter('deck')}>Decks</button>
		<button class:active={typeFilter==='note'} on:click={() => setTypeFilter('note')}>Notes</button>
	  </div>
	</div>
  
	<div class="page">
	  <aside class="left">
		<LeftChaptersBar
		  {chapters}
		  activeSlug={chapter}
		  on:pick={onPickChapter} />
	  </aside>
  
	  <main class="main">
		<div class="exbar-wrap">
		  <ExNavBar
			{exercises}
			activeSlug={exercise}
			{counts}
			on:pick={onPickExercise} />
		</div>
  
		<section class="cards">
		  <QuestionCard {items} />
		</section>
	  </main>
	</div>
  {/if}
  
  <style>
	:global(body){ background:#1b1205; }
  
	.empty{
	  padding:40px 12px; text-align:center; color:#d5bd9b;
	}
  
	.topbar{
	  display:flex; align-items:center; justify-content:space-between;
	  padding:10px 12px; background:#2E1C02; border-bottom:1px solid #3b2606;
	  position:sticky; top:0; z-index:10;
	}
	.title{ display:flex; flex-direction:column; gap:2px; }
	.tcode{
	  font-weight:700; color:#f4e2c7; letter-spacing:0.3px;
	}
	.desc{
	  color:#d5bd9b; font-size:0.95rem; max-width:60ch; opacity:0.9;
	}
  
	.filters{ display:flex; align-items:center; gap:8px; color:#d5bd9b; }
	.filters button{
	  padding:4px 10px; border:1px solid #6b4a12; background:#3b2606; color:#e6ccb0; border-radius:8px; cursor:pointer;
	}
	.filters button.active{ background:#78471a; border-color:#b07b2a; }
  
	.page{ display:flex; min-height:calc(100vh - 54px); }
	.left{ width:260px; border-right:1px solid #3b2606; background:#221605; }
	.main{ flex:1; display:flex; flex-direction:column; gap:12px; }
  
	.exbar-wrap{
	  position:sticky; top:54px; background:#241706; padding:10px 12px; border-bottom:1px solid #3b2606; z-index:5;
	}
  
	.cards{
	  padding:16px; background:#C1B294; min-height:60vh; display:flex; justify-content:center; align-items:flex-start;
	}
  
	@media (max-width: 900px){
	  .left{ width:200px; }
	}
	@media (max-width: 700px){
	  .page{ flex-direction:column; }
	  .left{ width:100%; }
	  .exbar-wrap{ top:98px; } /* little cushion if header wraps on mobile */
	}
  </style>
  