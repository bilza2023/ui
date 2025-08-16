<script>
	export let chapters = [];
	export let selectedChapter = null;
	export let isSidebarOpen = true;

	function selectChapter(chapter) {
		dispatch('select', { chapter });
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="sidebar" class:open={isSidebarOpen}>
	{#if isSidebarOpen}
		<div class="chapter-list">
			<button class="toggle-btn" on:click={() => dispatch('toggle')}>
				◄ Collapse
			</button>
			<h3 class="text-center text-[#EAB308]">Chapters</h3>
			{#each chapters as chapter}
				<button
					class="chapter-btn"
					class:selected={selectedChapter?.filename === chapter.filename}
					on:click={() => selectChapter(chapter)}
				>
				{chapter.name.length > 30 ? chapter.name.slice(0, 30) + '...' : chapter.name}

				</button>
			{/each}
		</div>
	{:else}
		<button class="toggle-btn collapsed" on:click={() => dispatch('toggle')}>
			<!-- 🔓 
			<br/> -->
			☰
		</button>
	{/if}
</div>

<style>
	.sidebar {
		width: 20%;
		min-width: 5%;
		color: whitesmoke;
		background: #2E1C02;
		border-right: 1px solid #ddd;
		transition: width 0.3s ease;
	}

	.sidebar.open {
		width: 20%;
	}

	.sidebar:not(.open) {
		width: 5%;
	}

	.toggle-btn {
		width: 100%;
		padding: 0.5rem;
		background-color: #2E1C02;
		color: white;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	.toggle-btn.collapsed {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.chapter-list {
		padding: 1rem;
		overflow-y: auto;
		height: 100%;
	}

	.chapter-btn {
		display: block;
		width: 100%;
		padding: 0.5rem;
		margin: 0.2rem 0;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		border-radius: 4px;
	}

	.chapter-btn:hover {
		background: #7d551c;
	}

	.chapter-btn.selected {
		background: #EAB308;
		color: white;
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 5%;
		}
		.sidebar.open {
			width: 100%;
			max-width: 250px;
		}
	}
</style>