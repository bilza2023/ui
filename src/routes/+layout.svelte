<!-- src/routes/+layout.svelte -->
<style>
  @import '/data/global-blog.css';

</style>
<script>
  // import '$lib/styles/themes.css';
  import 'katex/dist/katex.min.css';


  import "../app.css";
  import { SvelteToast } from '@zerodevx/svelte-toast'
   const options = {}



</script>

<SvelteToast {options} />
<!-- <slot/> -->

<div class=" min-h-screen h-full">
  <slot></slot>
  </div>