<svelte:head>
  <!-- Dark educational theme -->
  <link rel="stylesheet" href="/data/global-blog.css" />
  <!-- Optional: KaTeX or any other global CSS -->
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"> -->
</svelte:head>

<script>
  import { page } from '$app/stores';

  let html = '';
  let error = '';

  // ?filename=mydeck  →  /static/html_content/mydeck.html
  $: filename = $page.url.searchParams.get('filename') || 'demo';
  $: if (filename) load();

  async function load() {
    try {
      const res = await fetch(`/html_content/${filename}.html`);
      if (!res.ok) throw new Error(`"${filename}.html" not found`);
      html = await res.text();
      error = '';
    } catch (e) {
      error = e.message;
      html = '';
    }
  }
</script>

{#if error}
  <p>{error}</p>
{:else}
  {@html html}
{/if}
