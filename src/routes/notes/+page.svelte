
<script>
    import { goto } from '$app/navigation';
    import '../../lib/styles/notes.css';
  
  import Like from '$lib/components/Like.svelte';
  import Comment from '$lib/components//Comment.svelte';
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
  
      {#if !html}
        <div class="empty">This note is empty.</div>
      {:else}
      <main class="notes">
        <article class="note-html">{@html html}</article>
      </main>
      {/if}


  

<div class="bg-[#594112]">
  <Like 
  contentId ={filename}
  />
  
  <hr/>
  
  <Comment 
  contentId ={filename}
  />
  </div>
  