<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import Nav from '$lib/appComps/Nav.svelte';
	import BetaWarning from '$lib/appComps/BetaWarning.svelte';
	import LeftChaptersBar from './LeftChaptersBar.svelte';
	import ExNavBar from './ExNavBar.svelte';
	import QuestionCard from './QuestionCard.svelte';

	let syllabus = [];
	let selectedChapter = null;
	let selectedExercise = null;
	let isSidebarOpen = true; // Default to open

	// Fetch syllabus data
	onMount(async () => {
		const slug = get(page).url.searchParams.get('tcode') ?? 'fbise9physics';
		const res = await fetch('/data/syllabus.json');
		const res2 = await res.json();
		syllabus = res2.find((s) => s.tcodeName === slug);
		if (syllabus?.chapters?.length > 0) {
			selectedChapter = syllabus.chapters[0];
		}
	});

	// Derive chapters, exercises, and questions
	$: chapters = syllabus?.chapters || [];
	$: exercises = selectedChapter
		? chapters.find((ch) => ch.filename === selectedChapter.filename)?.exercises || []
		: [];
	$: questions = selectedChapter
		? selectedExercise
			? selectedExercise.questions || []
			: chapters
					.find((ch) => ch.filename === selectedChapter.filename)
					?.exercises.flatMap((ex) => ex.questions || []) || []
		: [];

	// Event handlers
	function onChapter(e) {
		selectedChapter = e.detail?.chapter ?? e.detail;
		selectedExercise = null;
	}

	function onExercise(e) {
		selectedExercise = e.detail?.exercise ?? e.detail;
	}

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
</script>

<div class="app-container">
	<Nav />
	<!-- <BetaWarning /> -->
	<div class="layout-container">
		{#if syllabus}
			<LeftChaptersBar
				{chapters}
				{selectedChapter}
				{isSidebarOpen}
				on:select={onChapter}
				on:toggle={toggleSidebar}
			/>
			<div class="main-content" class:sidebar-open={isSidebarOpen}>
				{#if selectedChapter}
					<ExNavBar {exercises} {selectedExercise} on:select={onExercise} />
					<div class="questions-container">
						<QuestionCard {questions} {selectedChapter} {selectedExercise} />
					</div>
				{:else}
					<p>Please select a chapter from the sidebar.</p>
				{/if}
			</div>
		{/if}
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
		margin: 0px;
		padding: 0px;
		min-height: 0; /* Allows proper height inheritance */
	}

	.main-content {
		flex: 1;
		width: 95%;
		/* padding: 1rem; */
		margin: 0px;
		padding: 0px;
		transition: width 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.main-content.sidebar-open {
		width: 80%;
	}

	.questions-container {
		flex: 1; /* Take remaining vertical space */
		display: flex;
		margin: 0px;
		padding: 0px;
		justify-content: center; /* Center horizontally */
		align-items: flex-start; /* Align to top vertically */
		background-color: rgb(193, 178, 148);
	}

	@media (max-width: 768px) {
		.main-content {
			width: 100%;
		}
		.main-content.sidebar-open {
			width: 100%;
		}
	}
</style>