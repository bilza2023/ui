<script>
    import katex from "katex";
    import { onMount } from "svelte";
    export let latex = "";
  
    let el;
  
    onMount(() => {
      katex.render(latex, el, {
        throwOnError: false,
        displayMode: true,
      });
    });
  </script>
  
  <div bind:this={el}></div>
  