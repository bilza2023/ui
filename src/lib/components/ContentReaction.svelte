<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let anchorId;              // required
  export let contentId = null;      // required
  export let userId = null;         // optional (display only; API ignores)
  export let authToken = null;      // optional; if not passed, we'll try localStorage('token')

  let likeSending = false;
  let likeSent = false;
  let likeMsg = '';
  let likeErr = '';

  const ENDPOINT = '/api/interactions/contentReaction';

  const getAuthToken = () => {
    if (authToken) return authToken;
    if (!browser) return null;
    try { return localStorage.getItem('token') || null; } catch { return null; }
  };

  function resetLikeFeedback() {
    likeMsg = '';
    likeErr = '';
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
      const msg = data?.message || `HTTP ${res.status}`;
      const code = data?.code || 'E_HTTP';
      const e = new Error(msg);
      e.code = code;
      throw e;
    }
    return data;
  }

  // Optional: a "view" ping (kept, but harmless to omit)
  onMount(async () => {
    if (!browser || !anchorId) return;
    try {
      await post({ anchor_id: anchorId, content_id: contentId, payload: { reaction_type: 'view' } });
    } catch { /* silent */ }
  });

  async function sendLike() {
    resetLikeFeedback();
    if (!anchorId || !contentId) {
      likeErr = 'Missing anchorId or contentId.';
      return;
    }
    if (likeSent) return;

    likeSending = true;
    try {
      const res = await post({
        anchor_id: anchorId,
        content_id: contentId,
        payload: { reaction_type: 'like' }
      });
      likeSent = true;
      likeMsg = res?.user_id ? 'Thanks! Your like was recorded with your account.' : 'Thanks! Your like was recorded.';
    } catch (e) {
      likeErr = e?.message || 'Could not send like.';
    } finally {
      likeSending = false;
    }
  }
</script>

<div class="panel">
  <div class="row">
    <button
      class="btn"
      on:click={sendLike}
      disabled={likeSending || likeSent || !contentId}
      aria-pressed={likeSent}
      title="Send a like reaction"
    >
      {#if likeSending}Sending…{/if}
      {#if !likeSending}{likeSent ? 'Liked' : 'Like'}{/if}
    </button>

    {#if likeErr}<span class="err">{likeErr}</span>{/if}
    {#if likeMsg}<span class="msg">{likeMsg}</span>{/if}
  </div>
</div>

<style>
  .panel { padding: 12px 14px; color: #E8D7BD; }
  .row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .btn {
    appearance: none; border: 1px solid #C4A77F; background: transparent; color: #E8D7BD;
    padding: 6px 12px; border-radius: 10px; cursor: pointer; font: inherit;
  }
  .btn[disabled] { opacity: 0.6; cursor: not-allowed; }
  .err { color: #ffb3b3; font-size: 0.9rem; }
  .msg { color: #b7ffc2; font-size: 0.9rem; }
</style>
