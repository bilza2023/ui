<script>
  // Theme tokens are global; import once here.
  import '$lib/styles/tokens.css';
  import { page } from '$app/stores';
  import Nav from "$lib/appComps/Nav.svelte";
</script>

<div class="app">

  {#if $page.url.pathname !== '/player'}
  <Nav />
{/if}
  <slot />
</div>

<style>
  /* 1) Absolute global reset — must use :global in Svelte */
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
  }

  :global(#svelte) {
    height: 100%;
    min-height: 100%;
  }

  :global(*) {
    box-sizing: border-box;
  }
   :global(html,body){margin:0;padding:0;min-height:100%;}
   
  :global(body){
    background:var(--backgroundColor);
    color:var(--primaryText);
    min-height:100dvh;
  }
  

  /* 3) App shell stretches full viewport so bg always covers */
  .app {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: var(--backgroundColor);
  }
</style>
