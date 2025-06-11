<script>
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import MdSection from './MdSection.svelte';
	import demo from '$lib/md/demo.md?raw';

	let sections = {};
	let error = null;

	// Load all .md files under /lib/md
	const allMdFiles = import.meta.glob('/src/lib/md/**/*.md', { as: 'raw' });

	// Parse sections like ::intro:: ... ::definition:: ...
	function parseMdSections(raw) {
		const sectionRegex = /::(.*?)::\n([\s\S]*?)(?=(::|$))/g;
		const parsed = {};
		let match;
		while ((match = sectionRegex.exec(raw)) !== null) {
			const [, key, value] = match;
			parsed[key.trim()] = value.trim();
		}
		return parsed;
	}

	// URL param: ?filename=xyz
	$: filename = get(page).url.searchParams.get('filename') || '';
	$: loadMd();

	async function loadMd() {
		error = null;
		sections = {};

		const fileKey = `/src/lib/md/mockSyllabus/${filename}.md`;
		const loader = allMdFiles[fileKey];

		if (!filename || !loader) {
			sections = parseMdSections(demo);
			return;
		}

		try {
			const raw = await loader();
			sections = parseMdSections(raw);
		} catch (err) {
			error = 'Failed to load content.';
			console.error(err);
		}
	}
</script>

{#if error}
	<p class="text-red-500 p-4">{error}</p>

{:else if Object.keys(sections).length === 0}
	<p class="p-4">Loading...</p>

{:else}
<!-- <div class="mx-auto px-6 py-10 max-w-7xl"> -->
	<!-- <div class="w-full px-6 sm:px-10 lg:px-24 py-10"> -->
		<div class="w-full px-6 sm:px-10 lg:px-24 py-10 bg-[#353330]">


		<h1 class="text-3xl font-bold mb-6">{sections.title || 'Reading Material'}</h1>

		{#each Object.entries(sections) as [type, content]}
			{#if type !== 'title'}
				<MdSection {type} {content} />
			{/if}
		{/each}
	</div>
{/if}
