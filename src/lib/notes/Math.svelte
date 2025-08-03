<script>
  // Requires `svelte-katex` already installed (you used it in slides)
  import KaTeX from 'svelte-katex';
  export let content = '';
</script>

<KaTeX class="note-math" expression={content} />

<style>
  .note-math {
    display: block;
    margin: 1.2rem 0;
    font-size: 1.1rem;
    color: white;   /* KaTeX inherits this for inline text */
  }
</style>
