<!-- src/routes/+layout.svelte -->

<script>
  // import '$lib/styles/themes.css';
  // import '$lib/styles/global-blog.css';   // ← global, not scoped
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