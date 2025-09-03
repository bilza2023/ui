<!-- src/routes/+layout@reset.svelte -->
<script>
  import '$lib/styles/theme-dark.css';
  import '$lib/styles/base.css';
  import '$lib/styles/utilities.css';
  import '$lib/styles/layout.css';
  
  // important
import AdminNav from '../../lib/appComps/AdminNav.svelte';
import Nav from "$lib/appComps/Nav.svelte";

  import '$lib/styles/tokens.css';
  import 'katex/dist/katex.min.css';
  import '$lib/styles/notes.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  const options = {};
</script>

<SvelteToast {options} />

<div class="min-h-screen w-full bg-green-400">
  <Nav />
  <AdminNav />
  <slot></slot>
</div>