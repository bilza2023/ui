<script>
	import { goto } from '$app/navigation';
	import LeftChaptersBar from './LeftChaptersBar.svelte';
	import ExNavBar from './ExNavBar.svelte';
	// import QuestionCard from './QuestionCard.svelte';
	import QuestionCards from "$lib/questionCards/QuestionCards.svelte";
	// Provided by +page.server.js
	export let data;
	import Nav from "$lib/appComps/Nav.svelte"; 
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
  <Nav/>
  {#if !tcode}
	<div class="empty">No syllabus registered.</div>
  {:else}
	<!-- Top strip: fixed single-tcode header + filters -->
	<div class="topbar one">
	  <div class="title">
		<div class="tcode">{tcode}
			&nbsp
		{#if tcodeDesc}<span class="desc">{tcodeDesc}</span>{/if}
		</div>
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
		  <QuestionCards questions={items} />
		</section>
	  </main>
	</div>
  {/if}
  <style>
	/* App background */
	:global(body){
	  background: var(--backgroundColor);
	  color: var(--primaryText);
	}
  
	.empty{
	  padding:40px 12px;
	  text-align:center;
	  color: var(--secondaryText);
	}
  
	/* Top bar */
	.topbar{
	  display:flex; align-items:center; justify-content:space-between;
	  padding:10px 12px;
	  /* tinted surface to stand apart */
	  background: color-mix(in oklab, var(--accentColor) 16%, var(--surfaceColor));
	  border-bottom:1px solid color-mix(in oklab, var(--accentColor) 45%, var(--borderColor));
	  position:sticky; top:0; z-index:10;
	  color: var(--primaryText);
	}
	.title{ display:flex; flex-direction:column; gap:2px; }
	.tcode{
	  font-weight:700; letter-spacing:0.3px;
	  color: var(--accentColor);
	}
	.desc{
	  color: var(--secondaryText);
	  font-size:0.95rem; max-width:60ch; opacity:0.9;
	}
  
	/* Filters */
	.filters{
	  display:flex; align-items:center; gap:8px;
	  color: var(--secondaryText);
	}
	.filters button{
	  padding:4px 10px;
	  border:1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
	  color: var(--primaryText);
	  border-radius:8px; cursor:pointer;
	  transition: background .15s ease, border-color .15s ease, color .15s ease;
	}
	.filters button:hover{
	  border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
	}
	.filters button.active{
	  background: var(--primaryColor);
	  border-color: var(--primaryColor);
	  color: var(--backgroundColor);
	}
  
	/* Layout */
	.page{
	  display:flex;
	  min-height: 100vh;
	}
	.left{
	  width:260px;
	  border-right:1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--accentColor) 8%, var(--surfaceColor));
	}
	.main{
	  flex:1; display:flex; flex-direction:column; gap:0px; 
	}
  
	/* Exercise bar (sticky inside main) */
	.exbar-wrap{
	  position:sticky; top:54px; z-index:5;
	  background: color-mix(in oklab, var(--accentColor) 6%, var(--surfaceColor));
	  gap:10px;
	  border-bottom:1px solid color-mix(in oklab, var(--accentColor) 35%, var(--borderColor));
	}
  
	/* Cards area */
	.cards{
	  background: color-mix(in oklab, var(--accentColor) 10%, var(--surfaceColor));
	  min-height:100vh;
	  display:flex; justify-content:center; align-items:flex-start;
	  color: var(--primaryText);
	  padding: 10px;
	}
  
	@media (max-width: 900px){
	  .left{ width:200px; }
	}
	@media (max-width: 700px){
	  .page{ flex-direction:column; }
	  .left{ width:100%; }
	  .exbar-wrap{ top:98px; } /* cushion if header wraps on mobile */
	}
  </style>
  