<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { browser } from '$app/environment';
  
    // Props
    export let anchorId;         // required (e.g., "notesPage")
    export let contentId = null; // required (e.g., filename)
    export let userId = null;    // optional; display-only hint
    export let authToken = null; // optional; if not provided, we'll try localStorage('token')
  
    // UI state
    let text = '';
    let sending = false;
    let err = '';
    let msg = '';
  
    const ENDPOINT = '/api/interactions/contentComment';
    const dispatch = createEventDispatcher();
  
    function reset() { err = ''; msg = ''; }
  
    function getAuthToken() {
      if (authToken) return authToken;
      if (!browser) return null;
      try { return localStorage.getItem('token') || null; } catch { return null; }
    }
  
    async function post(payload) {
      const headers = { 'content-type': 'application/json' };
      const token = getAuthToken();
      if (token) headers['authorization'] = `Bearer ${token}`;
  
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials: 'same-origin'
      });
  
      let data = {};
      try { data = await res.json(); } catch {}
  
      if (!res.ok || data?.ok === false) {
        const e = new Error(data?.message || `HTTP ${res.status}`);
        e.code = data?.code || 'E_HTTP';
        throw e;
      }
      return data;
    }
  
    async function sendComment() {
      reset();
      const comment_text = (text ?? '').trim();
  
      if (!anchorId || !contentId) {
        err = 'Missing anchorId or contentId.';
        return;
      }
      if (!comment_text) {
        err = 'Please write a comment first.';
        return;
      }
  
      sending = true;
      try {
        const result = await post({
          anchor_id: anchorId,
          content_id: contentId,
          // userId is NOT trusted from UI; API will attach user_id from JWT
          payload: { comment_text }
        });
        msg = 'Comment posted.';
        text = '';
        // Let parent know a comment was posted (can trigger refresh)
        dispatch('posted', { result });
      } catch (e) {
        err = e?.message || 'Could not post comment.';
        // Helpful hint if missing/invalid token
        if (e?.code === 'E_HTTP' || e?.code === 'E_UNAUTHORIZED') {
          if (!getAuthToken()) err = 'Please sign in to comment.';
        }
      } finally {
        sending = false;
      }
    }
  </script>
  
  <div class="comment-panel">
    <textarea
      bind:value={text}
      rows="3"
      placeholder="Write a comment…"
      on:input={reset}
    />
    <div class="actions">
      <button
        class="btn"
        on:click={sendComment}
        disabled={sending || !contentId || !(text || '').trim()}
        title="Post comment"
      >
        {#if sending}Posting…{/if}
        {#if !sending}Post Comment{/if}
      </button>
      {#if !userId}
        <small class="hint">Sign in to post with your name.</small>
      {/if}
    </div>
  
    {#if err}<div class="err">{err}</div>{/if}
    {#if msg}<div class="msg">{msg}</div>{/if}
  </div>
  
  <style>
    .comment-panel { padding: 12px 14px; color: #E8D7BD; }
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
    textarea:focus { border-color: #C4A77F; box-shadow: 0 0 0 2px rgba(196, 167, 127, 0.2); }
    .actions { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .btn {
      appearance: none; border: 1px solid #C4A77F; background: transparent; color: #E8D7BD;
      padding: 6px 12px; border-radius: 10px; cursor: pointer; font: inherit;
    }
    .btn[disabled] { opacity: 0.6; cursor: not-allowed; }
    .hint { color: #C4A77F; opacity: 0.85; }
    .err { color: #ffb3b3; font-size: 0.9rem; margin-top: 6px; }
    .msg { color: #b7ffc2; font-size: 0.9rem; margin-top: 6px; }
  </style>
  