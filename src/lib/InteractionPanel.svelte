<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Inputs (same names you’re already using)
  export let anchorId;         // required: where interaction happens (e.g., "notesPage")
  export let userId = null;    // optional: logged-in user id (locals.user.id saved in localStorage)
  export let contentId = null; // optional: the specific content (e.g., filename)

  // Local state
  let likeSending = false;
  let likeSent = false;
  let likeMsg = '';
  let likeErr = '';

  let comment = '';
  let commentSending = false;
  let commentMsg = '';
  let commentErr = '';

  const ENDPOINT = '/api/interactions';

  function resetLikeFeedback() {
    likeMsg = '';
    likeErr = '';
  }

  function resetCommentFeedback() {
    commentMsg = '';
    commentErr = '';
  }

  async function post(payload) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'same-origin'
    });
    let data = {};
    try { data = await res.json(); } catch {}
    if (!res.ok || data?.ok === false) {
      const msg = data?.message || `HTTP ${res.status}`;
      const code = data?.code || 'E_HTTP';
      const e = new Error(msg);
      e.code = code;
      throw e;
    }
    return data;
  }

  // Log a simple page/view hit
  onMount(async () => {
    if (!browser) return;
    if (!anchorId) return; // nothing to do without anchor
    try {
      await post({ anchor_id: anchorId, category: 'view', user_id: userId });
    } catch (e) {
      // Silent fail; views are best-effort
      // console.debug('view failed', e);
    }
  });

  // Send a like reaction (category: 'reaction')
  async function sendLike() {
    resetLikeFeedback();
    if (!anchorId || !contentId) {
      likeErr = 'Missing anchorId or contentId.';
      return;
    }
    if (likeSent) return;

    likeSending = true;
    try {
      await post({
        anchor_id: anchorId,
        category: 'reaction',
        content_id: contentId,
        user_id: userId,
        payload: { reaction_type: 'like' }
      });
      likeSent = true;            // UI guard; server still dedupes/records as it sees fit
      likeMsg = 'Thanks! Your like was recorded.';
    } catch (e) {
      likeErr = e?.message || 'Could not send like.';
    } finally {
      likeSending = false;
    }
  }

  // Post a comment (category: 'comment')
  async function sendComment() {
    resetCommentFeedback();
    const text = (comment ?? '').trim();

    if (!anchorId || !contentId) {
      commentErr = 'Missing anchorId or contentId.';
      return;
    }
    if (!text) {
      commentErr = 'Please write a comment first.';
      return;
    }

    commentSending = true;
    try {
      await post({
        anchor_id: anchorId,
        category: 'comment',
        content_id: contentId,
        user_id: userId,
        payload: { comment_text: text }
      });
      commentMsg = 'Comment posted.';
      comment = '';
    } catch (e) {
      // If server enforces auth for comments, you’ll get a 401/400 here
      commentErr = e?.message || 'Could not post comment.';
    } finally {
      commentSending = false;
    }
  }
</script>

<!-- Panel shell (parent gives brown background; we keep it simple) -->
<div class="panel">
  <!-- Reactions row -->
  <div class="row">
    <button
      class="btn"
      on:click={sendLike}
      disabled={likeSending || likeSent || !contentId}
      aria-pressed={likeSent}
      title="Send a like reaction"
    >
      {#if likeSending}Sending…{/if}
      {#if !likeSending}{likeSent ? 'Liked' : 'Like'}/{/if}
    </button>

    {#if likeErr}<span class="err">{likeErr}</span>{/if}
    {#if likeMsg}<span class="msg">{likeMsg}</span>{/if}
  </div>

  <!-- Comment box -->
  <div class="row comment-row">
    <textarea
      bind:value={comment}
      rows="3"
      placeholder="Write a comment…"
      on:input={resetCommentFeedback}
    />
    <div class="actions">
      <button
        class="btn"
        on:click={sendComment}
        disabled={commentSending || !contentId || !(comment || '').trim()}
        title="Post comment"
      >
        {#if commentSending}Posting…{/if}
        {#if !commentSending}Post Comment{/if}
      </button>
      {#if !userId}
        <small class="hint">You may be posting without sign-in.</small>
      {/if}
    </div>

    {#if commentErr}<div class="err">{commentErr}</div>{/if}
    {#if commentMsg}<div class="msg">{commentMsg}</div>{/if}
  </div>
</div>

<style>
  .panel {
    padding: 12px 14px;
    color: #E8D7BD; /* light sand on dark brown */
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .comment-row {
    flex-direction: column;
    align-items: stretch;
  }
  textarea {
    width: 100%;
    min-height: 90px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #5a3a1a;
    background: #1e1006;
    color: #E8D7BD;
    resize: vertical;
    outline: none;
  }
  textarea:focus {
    border-color: #C4A77F;
    box-shadow: 0 0 0 2px rgba(196, 167, 127, 0.2);
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
  }
  .btn {
    appearance: none;
    border: 1px solid #C4A77F;
    background: transparent;
    color: #E8D7BD;
    padding: 6px 12px;
    border-radius: 10px;
    cursor: pointer;
    font: inherit;
  }
  .btn[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .err {
    color: #ffb3b3;
    font-size: 0.9rem;
  }
  .msg {
    color: #b7ffc2;
    font-size: 0.9rem;
  }
  .hint {
    color: #C4A77F;
    opacity: 0.85;
  }
</style>
