<script>
	import { marked } from 'marked';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
    import demo from '$lib/md/demo.md?raw';


	let sections = {};
	let error = null;

	const allMdFiles = import.meta.glob('/src/lib/md/**/*.md', { as: 'raw' });

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
	<div class="prose mx-auto p-6 max-w-3xl">
		<h1>{sections.title || 'Reading Material'}</h1>

		{#if sections.intro}
			<h2>Introduction</h2>
			{@html marked(sections.intro)}
		{/if}

		{#if sections.definition}
			<h2>Definition</h2>
			{@html marked(sections.definition)}
		{/if}

		{#if sections.example}
			<h2>Example</h2>
			{@html marked(sections.example)}
		{/if}

		{#if sections['teacher-note']}
			<h2>Teacher Note</h2>
			{@html marked(sections['teacher-note'])}
		{/if}

		{#if sections['image-prompt']}
			<h2>Image Prompt</h2>
			<pre class="bg-gray-100 p-3 rounded">{sections['image-prompt']}</pre>
		{/if}
	</div>
{/if}
