<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import "$lib/styles/forms.css"; // keep theme cohesion
  export let data;
  const { status, comments = [] } = data;

  // Simple date helpers
  const fmtTime = (iso) => {
    try { return new Date(iso).toLocaleString(); } catch { return "—"; }
  };

  const badgeText = (s) =>
    s === 'answered' ? 'Answered' : s === 'bad' ? 'Flagged' : 'New';
</script>

<Nav />

<section class="studio">
  <header class="studio-header">
    <h1>Questions and Answers</h1>
    <p class="sub">Your activity feed — questions & replies</p>
  </header>

  {#if status === 'unauthorized'}
    <div class="empty state">
      <p>Sign in to view your Studio.</p>
    </div>
  {:else if !comments?.length}
    <div class="empty state">
      <p>No comments yet. Ask a question anywhere in the app to get started!</p>
    </div>
  {:else}
    <div class="feed">
      {#each comments as c}
        <article class="post">
          <header class="post-head">
            <div class="avatar">Y</div>
            <div class="meta">
              <div class="name-row">
                <span class="name">You</span>
                <span class="pill {c.status}">{badgeText(c.status)}</span>
              </div>
              <div class="time">{fmtTime(c.created_at)}</div>
              {#if c.content_id}
                <!-- <div class="link">
                  <a href={"/player?filename=" + encodeURIComponent(c.content_id)}>View content</a>
                </div> -->
              {/if}
            </div>
          </header>

          <div class="body">
            <!-- student’s original comment (plain text — preserve line breaks) -->
            <div class="comment-text">{c.text}</div>

            {#if c.response}
              <!-- teacher/admin reply (render as a nested reply card) -->
              <div class="reply">
                <div class="reply-head">
                  <div class="avatar teacher">T</div>
                  <div class="who">Teacher reply</div>
                </div>
                <div class="reply-body">
                  {@html c.response}
                </div>
              </div>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  /* page scaffold */
  .studio { max-width: 900px; margin: 24px auto; padding: 0 16px; }
  .studio-header h1 { margin: 0; font-size: 1.8rem; }
  .studio-header .sub { margin: 4px 0 16px; opacity: 0.8; }

  /* feed layout */
  .feed { display: flex; flex-direction: column; gap: 16px; }

  /* post (Facebook-like card) */
  .post {
    background: var(--card-bg, #111214);
    border: 1px solid var(--card-border, rgba(255,255,255,0.08));
    border-radius: 14px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    overflow: hidden;
  }

  .post-head {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 12px;
    padding: 14px 16px 0 16px;
    align-items: start;
  }

  .avatar {
    width: 44px; height: 44px;
    border-radius: 999px;
    display: grid; place-items: center;
    background: linear-gradient(135deg, #3a86ff, #8338ec);
    color: white; font-weight: 700;
    user-select: none;
  }
  .avatar.teacher {
    background: linear-gradient(135deg, #00c853, #00bfa5);
  }

  .meta { display: grid; gap: 2px; }
  .name-row { display: flex; align-items: center; gap: 8px; }
  .name { font-weight: 600; }
  .time { font-size: 0.9rem; opacity: 0.8; }
  .link a { font-size: 0.9rem; text-decoration: none; opacity: 0.9; }
  .link a:hover { text-decoration: underline; }

  .pill {
    display: inline-block;
    font-size: 0.72rem;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.16);
    opacity: 0.9;
  }
  .pill.new { background: rgba(66,133,244,0.15); }
  .pill.answered { background: rgba(52,168,83,0.18); }
  .pill.bad { background: rgba(234,67,53,0.18); }

  .body { padding: 12px 16px 16px 16px; }
  .comment-text {
    white-space: pre-wrap;
    line-height: 1.6;
    font-size: 1rem;
  }

  /* nested reply card */
  .reply {
    margin-top: 12px;
    border: 1px solid var(--reply-border, rgba(255,255,255,0.08));
    border-radius: 12px;
    background: var(--reply-bg, rgba(255,255,255,0.03));
  }
  .reply-head {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 8px;
    padding: 10px 12px 0 12px;
    align-items: center;
  }
  .reply .avatar { width: 32px; height: 32px; font-size: 0.9rem; }
  .reply .who { font-size: 0.92rem; font-weight: 600; opacity: 0.95; padding-top: 2px; }
  .reply-body {
    padding: 8px 12px 12px 12px;
    line-height: 1.55;
  }

  /* empty state */
  .empty.state {
    margin: 24px 0;
    padding: 18px;
    border: 1px dashed rgba(255,255,255,0.18);
    border-radius: 12px;
    text-align: center;
    opacity: 0.9;
  }

  /* responsive tweaks */
  @media (max-width: 560px) {
    .studio { padding: 0 10px; }
    .post-head { grid-template-columns: 40px 1fr; }
    .avatar { width: 40px; height: 40px; }
  }
</style>
