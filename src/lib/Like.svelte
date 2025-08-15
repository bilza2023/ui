

<script>
  import { browser } from '$app/environment';
  import { onMount, createEventDispatcher } from 'svelte';

  export let contentId;
  export let userId = null;
  export let anchorId = null;
  export let initialLiked = false;
  export let authToken = null;

  const ENDPOINT = '/api/like';
  const dispatch = createEventDispatcher();

  let liked = !!initialLiked;
  let loading = true;
  let sending = false;
  let err = '';
  let msg = '';

  function getAuthToken() {
    if (!browser) return null;
    if (authToken) return authToken;
    try {
      return (
        localStorage.getItem('token') ||
        localStorage.getItem('jwt') ||
        localStorage.getItem('authToken') ||
        null
      );
    } catch { return null; }
  }

  function reset() { err = ''; msg = ''; }

  onMount(async () => {
    if (!browser || !contentId) { loading = false; return; }
    const token = getAuthToken();
    if (!token) { loading = false; liked = !!initialLiked; return; }
    try {
      const res = await fetch(`${ENDPOINT}?content_id=${encodeURIComponent(contentId)}`, {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
        credentials: 'same-origin',
        cache: 'no-store'
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) liked = !!data.liked;
      else if (res.status === 401) liked = !!initialLiked;
    } catch { liked = !!initialLiked; }
    finally { loading = false; }
  });

  async function toggleLike() {
    reset();
    if (!contentId) { err = 'Missing contentId.'; return; }
    const token = getAuthToken();
    if (!token) { err = 'Please sign in to like.'; return; }

    sending = true;
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ content_id: contentId }),
        credentials: 'same-origin'
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        const e = new Error(data?.message || `HTTP ${res.status}`);
        e.code = data?.code || 'E_HTTP';
        throw e;
      }
      liked = !!data.liked;
      msg = liked ? 'Liked' : 'Removed';
      dispatch('changed', { liked });
    } catch (e) {
      err = e?.message || 'Could not toggle like.';
    } finally {
      sending = false;
    }
  }
</script>

<!-- One-line strip -->
<div class="like-strip" aria-live="polite">
  <button
    class="like-chip"
    on:click={toggleLike}
    disabled={loading || sending || !contentId}
    aria-pressed={liked}
    title={liked ? 'Unlike' : 'Like'}
  >
    <span class="heart" data-state={liked ? 'on' : 'off'}>
      {#if loading}•{/if}
      {#if !loading}{liked ? '♥' : '♡'}{/if}
    </span>
    <span class="label">
      {#if loading}Loading…{/if}
      {#if !loading && sending}Saving…{/if}
      {#if !loading && !sending}{liked ? 'Liked' : 'Like'}{/if}
    </span>
  </button>

  <!-- Inline status (stays on one line, subtle) -->
  {#if err}<span class="status err">· {err}</span>{/if}
  {#if !err && msg}<span class="status ok">· {msg}</span>{/if}
</div>

<style>
  /* Strip container: single line, centered vertically */
  .like-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    /* border-top: 1px solid #5a3a1a; */
    /* border-bottom: 1px solid #5a3a1a; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #E8D7BD;
  }

  /* Pill button */
  .like-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(196,167,127,0.10); /* soft sand tint */
    /* border: 1px solid rgba(196,167,127,0.35); */
    color: #E8D7BD;
    cursor: pointer;
    font: inherit;
    outline: none;
    transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
  }
  .like-chip:hover { transform: translateY(-1px); border-color: #C4A77F; }
  .like-chip:active { transform: translateY(0); }
  .like-chip[disabled] { opacity: 0.6; cursor: not-allowed; }

  /* Heart icon state */
  .heart { font-size: 1rem; line-height: 1; display: inline-block; }
  .heart[data-state="on"] { color: #ff9fb2; }   /* soft pink when liked */
  .heart[data-state="off"] { color: #C4A77F; }  /* sand when not liked */

  /* Text label */
  .label { font-weight: 600; letter-spacing: 0.2px; }

  /* Inline status feedback */
  .status { font-size: 0.9rem; opacity: 0.9; }
  .status.ok { color: #b7ffc2; }
  .status.err { color: #ffb3b3; }
</style>
