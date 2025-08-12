<script>
    import { onMount } from 'svelte';
  
    let loading = true;
    let error = '';
    let user = null;        // { id, email } | null
    let messages = [];      // [{ id, category, message, created_at, read }]
  
    async function loadMessages() {
      loading = true; error = ''; user = null; messages = [];
      let token = null;
      try { token = localStorage.getItem('token'); } catch {}
  
      try {
        const res = await fetch('/studio', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            ...(token ? { 'authorization': `Bearer ${token}` } : {})
          }
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || 'Failed to load messages');
  
        user = data?.user ?? null;
        messages = Array.isArray(data?.messages) ? data.messages : [];
      } catch (e) {
        error = e?.message ?? 'Failed to load';
      } finally {
        loading = false;
      }
    }
  
    onMount(loadMessages);
  
    function fmt(d) {
      try { return new Date(d).toLocaleString(); } catch { return d; }
    }
  </script>
  
  <svelte:head><title>Studio</title></svelte:head>
  
  <div class="wrap">
    <div class="card">
      <h1>Studio</h1>
  
      {#if loading}
      <p class="muted">Loading…</p>
    {:else if error}
      <p class="err">{error}</p>
    {:else if !user}
      <div class="empty">
        <p>Please log in to see your messages.</p>
        <a class="btn" href="/login">Log in</a>
      </div>
    {:else}
      {#if messages.length === 0}
        <p class="muted">No new messages.</p>
      {:else}
        <ul class="list">
          {#each messages as m}
            <li class="msg">
              <div class="meta">
                <span class="cat">{m.category}</span>
                <span class="date">{fmt(m.created_at)}</span>
              </div>
              <div class="body">
                {@html m.message}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
    
    </div>
  </div>
  
  <style>
    .wrap { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    .card {
      width: min(820px, 94vw);
      display: grid; gap: 16px;
      padding: 20px 22px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      background: rgba(255,255,255,0.04);
    }
    h1 { margin: 0 0 2px; font-size: 1.25rem; }
    .muted { opacity: 0.8; }
    .err { color: #ff6b6b; }
    .empty { display: grid; gap: 10px; }
    .btn {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: inherit;
    }
    .list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
    .msg {
      display: grid; gap: 6px;
      padding: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
    }
    .meta { display: flex; gap: 10px; justify-content: space-between; font-size: 12px; opacity: 0.85; }
    .cat { text-transform: uppercase; letter-spacing: 0.04em; }
    .body { font-size: 0.98rem; line-height: 1.5; }
  </style>
  