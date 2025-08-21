<script>
  // Received slide data (title and paragraph) and current time pointer
  export let data = [];


  // Find title and paragraph items
  const titleItem = data.find(item => item.name === 'title');
  const paragraphItem = data.find(item => item.name === 'paragraph');
</script>

<!-- Always show title and paragraph centered -->
<div class="wrapper">
  {#if titleItem}
    <h1 class="title">{titleItem.content}</h1>
  {/if}

  {#if paragraphItem}
    <p class="paragraph">{paragraphItem.content}</p>
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 0 2rem;
  }

  .title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }

  .paragraph {
    font-size: 1.9rem;
    line-height: 1.5;
    font-family: Helvetica , Arial , sans-serif;
    max-width: 1000px;
    margin: 0 auto;        /* center the block if you like */
  text-align: justify;   /* justify both left and right edges */
  text-justify: inter-word; /* improve spacing in most browsers */
  }
</style>
