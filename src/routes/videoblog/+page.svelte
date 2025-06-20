<script>
  import { blogs } from './blogs.js';
  import BlogList from './BlogList.svelte';
</script>

<svelte:head>
  <title>taleem.help : Education for Every Pakistani</title>
</svelte:head>

<nav class="bg-[#fff3cd] shadow-sm py-3 px-6 sticky top-0 z-50">
  <div class="max-w-5xl mx-auto flex justify-between items-center">
    <span class="text-lg font-semibold">taleem.help : Education for Every Pakistani</span>
    <a href="/" class="text-[#0077b6] hover:underline font-medium">🏠 Back to Home</a>
  </div>
</nav>

<main class="max-w-3xl mx-auto py-10 px-6">
  <header class="mb-10 text-center">
    <h1 class="text-4xl font-bold text-[#ffb703] mb-2">📚 Blog Library</h1>
    <p class="text-md italic text-gray-600">Inspiration and knowledge for every learner</p>
  </header>

  <!-- Renders the list from the blogs data -->
  <BlogList {blogs} />

  <footer class="mt-12 text-center text-xs text-gray-500">
    📝 Curated by Taleem.Help • Updated regularly
  </footer>
</main>
