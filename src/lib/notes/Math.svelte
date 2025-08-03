<script>
  import KaTeX from 'svelte-katex';
  export let block;
</script>

<KaTeX class="note-math" expression={block.content} />

<style>
  .note-math {
    display: block;
    margin: 1.2rem 0;
    font-size: 1.1rem;
    color: white;
  }
</style>