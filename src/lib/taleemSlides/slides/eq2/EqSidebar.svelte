<!-- EqSidebar.svelte -->
<script>
  import Katex from 'svelte-katex';
  export let spItems = [];
</script>

<div class="eq-sidebar">
  {#each spItems as item}
    {#if item.type === 'spMath'}
      <div class="sp-item math">
        <Katex displayMode>{item.content}</Katex>
      </div>

    {:else if item.type === 'spHeading'}
      <div class="sp-item title">{item.content}</div>

    {:else if item.type === 'spImage'}
      <div class="sp-item image">
        <img src={item.content} alt="" />
      </div>

    {:else}
      <div class="sp-item text">{item.content}</div>
    {/if}
  {/each}
</div>

<style>
  .eq-sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sp-item {
    padding: 0.5rem;
    font-size: 2rem;
    border-radius: 0.25rem;
    background-color: #1f2937;
    color: white;
  }

  .sp-item.math {
    /* KaTeX styling via imported CSS */
  }

  /* Add these rules to support image items in the sidebar */
.sp-item.image {
  padding: 0;            /* remove text padding */
  background: none;      /* let the image fill the container */
}

.sp-item.image img {
  max-width: 100%;       /* constrain to container width */
  height: auto;          /* maintain aspect ratio */
  display: block;
  opacity: 1;
  border-radius: 0.25rem;
}

  .sp-item.title {
    text-align: center;
    background-color: cornsilk;
    color: rgb(14, 32, 234);
    font-size: 1.5rem;
  }

  .sp-item.text {
    text-align: center;
    font-size: 1.5rem;
  }
</style>
