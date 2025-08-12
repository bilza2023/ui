<script>
    // @ts-nocheck
    import NavBtn from './NavBtn.svelte';
    import NavBtn2 from './NavBtn2.svelte';
    import Logo from './Logo.svelte';
    // import {checkLogin} from '../config/index';

    import { goto } from '$app/navigation';
    
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let loading = true;
  let user = null;        // { id, email } | null
  let unread = 0;

  function authHeaders() {
    let t = null;
    try { t = localStorage.getItem('token'); } catch {}
    return t ? { authorization: `Bearer ${t}` } : {};
  }

  async function verifyUser() {
    const res = await fetch('/api/auth/verify', {
      headers: { accept: 'application/json', ...authHeaders() }
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data?.user ?? null;
  }

  async function fetchUnread() {
    // quick & dirty: reuse /studio JSON (unread only)
    const r = await fetch('/studio', {
      headers: { accept: 'application/json', ...authHeaders() }
    });
    if (!r.ok) return 0;
    const d = await r.json().catch(() => ({}));
    return Array.isArray(d?.messages) ? d.messages.length : 0;
  }

  async function init() {
    loading = true;
    user = await verifyUser();
    unread = user ? await fetchUnread() : 0;
    loading = false;
    dispatch('authchange', { user, unread });
  }

  onMount(init);

  async function logout() {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    try { localStorage.removeItem('token'); } catch {}
    user = null; unread = 0;
    dispatch('authchange', { user: null, unread: 0 });
    location.reload();
  }
</script>

<nav class="nav">
  <a class="brand" href="/">Taleem.help</a>

<!-- 
  <a href="/studio" class="link">
    Studio {#if user && unread > 0}<span class="badge">{unread}</span>{/if}
  </a> -->

  <span class="spacer" />

  {#if loading}
    <span class="muted">…</span>
  {:else if user}
    <span class="hello">Hi, {user.email}</span>
    <button class="pill" on:click={logout}>Logout</button>
  {:else}
    <a href="/login" class="pill">Login</a>
    <a href="/register" class="pill">Register</a>
  {/if}
</nav>

<style>
  .nav {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    background: #3d2e1e; color: #fff;
    border-bottom: 1px solid rgba(255,255,255,0.12);
  }
  .brand {
    font-weight: 800; letter-spacing: .3px;
    color: #EAB308; text-decoration: none; margin-right: 6px;
  }
  .link {
    color: inherit; text-decoration: none;
    padding: 6px 8px; border-radius: 8px;
  }
  .link:hover { background: rgba(255,255,255,0.06); }
  .spacer { flex: 1; }
  .muted { opacity: 0.7; }
  .hello { opacity: 0.9; margin-right: 4px; }
  .pill {
    padding: 6px 10px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent; color: inherit;
    text-decoration: none; cursor: pointer;
  }
  .pill:hover { background: rgba(255,255,255,0.08); }
  .badge {
    margin-left: 6px; padding: 0 6px; border-radius: 999px;
    background: #FACC15; color: #2b1a00; font-weight: 700;
  }
</style>
