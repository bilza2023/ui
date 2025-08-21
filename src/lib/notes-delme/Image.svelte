<script>
  export let block;
  $: url = typeof block.src === 'string' ? block.src : block.src?.content ?? '';
</script>

<img src="{url}" alt="{block.alt}" class="img" />

<style>
  .img {
    display: block;
    max-width: 50%;
    height: auto;
    margin: 1rem auto; /* Centers the image horizontally */
    border: 1px solid #000; /* Adds a subtle border */
    border-radius: 8px; /* Rounds the corners */
  }
</style>