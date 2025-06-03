<svelte:head>
  <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4279476755172786"
     crossorigin="anonymous"></script> -->
     <link rel="stylesheet" href="node_modules/katex/dist/katex.min.css" />
  
</svelte:head>
  


<script>
  
  import "../app.css";
  import { SvelteToast } from '@zerodevx/svelte-toast'
   const options = {}



</script>

<SvelteToast {options} />
<!-- <slot/> -->

<div class=" min-h-screen h-full">
  <slot></slot>
  </div>