<script>
    import { onMount } from 'svelte';
  
    // Required
    export let anchorId;          // e.g. "demo_anchor"
    // Optional
    export let userId = null;
    export let reactionEndpoint = '/api/interactions/reaction';
    export let commentEndpoint  = '/api/interactions/comment';
  
    // Minimal state
    let actorId = null;
    let sending = false;
    let msg = '';
    let err = '';
    let comment = '';
    let liked = false;
  
    // — helpers (kept tiny) —
    function uuid() {
      try {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c/4).toString(16)
        );
      } catch {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      }
    }
    function getActor() {
      try {
        let id = localStorage.getItem('taleem.actorId');
        if (!id) { id = uuid(); localStorage.setItem('taleem.actorId', id); }
        return id;
      } catch { return uuid(); }
    }
    async function post(url, body) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return res.json().catch(() => ({}));
    }
  
    // — actions —
    async function sendLike() {
      if (sending || liked) return;
      err = ''; msg = '';
      sending = true;
      try {
        await post(reactionEndpoint, {
          anchorId,
          reactionType: 'like',
          actorId,
          userId
        });
        liked = true;
        msg = 'Thanks for the like.';
      } catch (e) {
        err = e.message ?? 'Failed to send like.';
      } finally {
        sending = false;
      }
    }
  
    async function sendComment() {
      if (sending || !comment.trim()) return;
      err = ''; msg = '';
      sending = true;
      try {
        await post(commentEndpoint, {
          anchorId,
          text: comment.trim(),
          actorId,
          userId
        });
        comment = '';
        msg = 'Comment saved.';
      } catch (e) {
        err = e.message ?? 'Failed to save comment.';
      } finally {
        sending = false;
      }
    }
  
    onMount(() => { actorId = getActor(); });
  </script>
  
  <div class="ip-wrap" data-anchor={anchorId}>
    <div class="row">
      <button class="pill {liked ? 'active' : ''}" disabled={sending || liked} on:click={sendLike} title="Like">
        👍 Like
      </button>
    </div>
  
    <div class="comment">
      <textarea
        bind:value={comment}
        placeholder="Add a quick note…"
        rows="3"
        maxlength="1000"
        />
      <div class="actions">
        <button class="pill" on:click={sendComment} disabled={sending || !comment.trim()}>
          Submit
        </button>
      </div>
    </div>
  
    <div class="status">
      {#if msg}<span class="ok">{msg}</span>{/if}
      {#if err}<span class="err">{err}</span>{/if}
    </div>
  </div>
  
  <style>
    .ip-wrap {
      --border: rgba(255,255,255,0.12);
      --bg: rgba(255,255,255,0.04);
      --bg2: rgba(255,255,255,0.06);
      --ok: #39d98a;
      --err: #ff6b6b;
  
      display: grid;
      gap: 10px;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--bg);
    }
    .row { display: flex; gap: 8px; align-items: center; }
    .pill {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: transparent;
      color: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .pill:hover { background: var(--bg2); }
    .pill.active { opacity: 0.7; cursor: default; }
    .comment { display: grid; gap: 8px; }
    textarea {
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: transparent;
      color: inherit;
    }
    .actions { display: flex; justify-content: flex-end; }
    .status { min-height: 18px; font-size: 12px; }
    .ok { color: var(--ok); }
    .err { color: var(--err); }
  </style>
  