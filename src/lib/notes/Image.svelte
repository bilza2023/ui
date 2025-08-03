<script>
  /** Single prop: content
   *  Accepts either:
   *    • Plain URL   → " /images/pic.webp "
   *    • Markdown    → "![Alt text](/images/pic.webp)"
   */
  export let content = '';

  let src = '';
  let alt = '';

  $: {
    const md = content.match(/!\[([^\]]*)]\(([^)]+)\)/);
    if (md) {
      alt = md[1];
      src = md[2];
    } else {
      src = content.trim();
      alt = '';
    }
  }
</script>

{#if src}
  <img class="note-image" {src} {alt} loading="lazy" />
{/if}

<style>
  .note-image {
    display: block;
    width: 100%;
    max-width: 600px;          /* hard cap — tweak as you like */
    margin: 1.2rem auto;
    border: 2px solid #444;    /* subtle border for dark bg */
    border-radius: 12px;       /* rounded corners */
    object-fit: contain;
  }
</style>
