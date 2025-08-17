
<script>
  import '$lib/styles/tokens.css';
  import '$lib/styles/theme-dark.css';
  import '$lib/styles/base.css';

  import 'katex/dist/katex.min.css';   // ← move up (before notes.css)

  /* keep your framework layers next */
  import '$lib/styles/utilities.css';
  import '$lib/styles/layout.css';
  import '$lib/styles/notes.css';


  import { SvelteToast } from '@zerodevx/svelte-toast';
  const options = {};
</script>

<SvelteToast {options} />
<!-- <slot/> -->

<div class=" min-h-screen h-full">
  <slot></slot>
  </div>