
<script>
    import { goto } from '$app/navigation';
    import '$lib/styles/notes.css';
    import Nav from "../../lib/appComps/Nav.svelte";
    import AdminNav from "../../lib/AdminNav.svelte";
    
    export let data;
  
    $: title    = data?.meta?.title ?? 'Notes';
    $: desc     = data?.meta?.description ?? '';
    $: html     = data?.html ?? '';
    $: filename = data?.meta?.filename;
  
    function backToSyllabus() {
      const qs = new URLSearchParams({
        tcode: data?.meta?.tcode ?? ''
      });
      goto(`/syllabus?${qs.toString()}`);
    }
  </script>
  
  <svelte:head>
    <title>{title}</title>
  </svelte:head>
  

  <Nav />
  <AdminNav />
  
      {#if !html}
        <div class="empty">This note is empty.</div>
      {:else}
        <!-- You control the HTML at upload time, so {@html} is acceptable here -->
        <div class="notes">{@html html}</div>
      {/if}


  