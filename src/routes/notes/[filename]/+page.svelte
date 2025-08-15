<!-- src/routes/notes/[filename]/+page.svelte -->
<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import {onMount} from "svelte";
  import { browser } from '$app/environment';
  import Footer from "$lib/appComps/Footer.svelte";

  // import InteractionPanel from "$lib/InteractionPanel.svelte";
  import Comment from "../../../lib/Comment.svelte";
  import Like from "../../../lib/Like.svelte";

  export let data;   // { filename, html }

  let userId = null;

  onMount(() => {
    if (!browser) return;
    try {
      userId = localStorage.getItem("userId") || null;
    } catch (_) {
      userId = null;
    }
  });
</script>

<Nav />

<main class="notes">
  {@html data.html}
</main>

<hr />

<!-- Under the Like component -->
<Like
  anchorId="notesPage"
  {userId}
  contentId={data.filename}
/>

<!-- Notes +page.svelte -->
<hr />

<div class="mt-5  px-40">
  <Comment
    contentId={data.filename}
    userId={userId}     
  />
</div>



<br/>
<br/>
<br/>

<br/>
<Footer />