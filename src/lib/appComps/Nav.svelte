<script>
  // @ts-nocheck
  import NavBtn from './NavBtn.svelte';
  import NavBtn2 from './NavBtn2.svelte';
  import Logo from './Logo.svelte';
  import { goto } from '$app/navigation';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';   // ✅ SSR guard

  const dispatch = createEventDispatcher();

  let loading = true;
  let user = null;        // { id, email } | null
  let unread = 0;

  // --- THEME ---
  let showThemeMenu = false;

  function setTheme(theme) {
    if (!browser) return;                               // ✅ guard
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
    try { localStorage.setItem('theme', theme); } catch {}
  }
  function selectTheme(theme) {
    setTheme(theme);
    showThemeMenu = false;
  }
  function toggleThemeMenu(e) {
    e.stopPropagation();
    showThemeMenu = !showThemeMenu;
  }
  function handleDocClick() {
    if (showThemeMenu) showThemeMenu = false;
  }

  function authHeaders() {
    if (!browser) return {};                            // ✅ guard
    let t = null;
    try { t = localStorage.getItem('token'); } catch {}
    return t ? { authorization: `Bearer ${t}` } : {};
  }

  async function verifyUser() {
    // called only on client (onMount)
    const res = await fetch('/api/auth/verify', {
      headers: { accept: 'application/json', ...authHeaders() }
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data?.user ?? null;
  }

  async function fetchUnread() {
    // called only on client (onMount)
    const r = await fetch('/studio', {
      headers: { accept: 'application/json', ...authHeaders() }
    });
    if (!r.ok) return 0;
    const d = await r.json().catch(() => ({}));
    return Array.isArray(d?.messages) ? d.messages.length : 0;
  }

  async function init() {
    if (!browser) return;                               // ✅ guard
    // restore saved theme first
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch {}
    loading = true;
    user = await verifyUser();
    unread = user ? await fetchUnread() : 0;
    loading = false;
    dispatch('authchange', { user, unread });
  }

  onMount(() => {
    init();                                             // ✅ client-only work
    if (browser) document.addEventListener('click', handleDocClick);
  });

  onDestroy(() => {
    if (browser) document.removeEventListener('click', handleDocClick);
  });

  async function logout() {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    if (browser) {
      try { localStorage.removeItem('token'); } catch {}
    }
    user = null; unread = 0;
    dispatch('authchange', { user: null, unread: 0 });
    location.reload();
  }
</script>


<nav class="nav">
  <a class="brand" href="/">Taleem.help</a>

  <!-- <a href="/studio" class="link">
    Studio {#if user && unread > 0}<span class="badge">{unread}</span>{/if}
  </a> -->

  <span class="spacer" />

  {#if loading}
    <span class="muted">…</span>
  {:else if user}
    <span class="hello">Hi, {user.email}</span>
    <div class="dropdown" on:click|stopPropagation={toggleThemeMenu}>
      <button class="pill">Theme ▾</button>
      {#if showThemeMenu}
        <div class="menu" role="menu">
          <button class="menu-item" on:click={() => selectTheme('light')}>Light</button>
          <button class="menu-item" on:click={() => selectTheme('dark')}>Dark</button>
        </div>
      {/if}
    </div>
    <button class="pill" on:click={logout}>Logout</button>
  {:else}
    <a href="/login" class="pill">Login</a>
    <a href="/register" class="pill">Register</a>

    <div class="dropdown" on:click|stopPropagation={toggleThemeMenu}>
      <button class="pill">Theme ▾</button>
      {#if showThemeMenu}
        <div class="menu" role="menu">
          <button class="menu-item" on:click={() => selectTheme('light')}>Light</button>
          <button class="menu-item" on:click={() => selectTheme('dark')}>Dark</button>
        </div>
      {/if}
    </div>
  {/if}
</nav>

<style>
  /* NAV WRAPPER */
  .nav {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;

    background: var(--surfaceColor);
    color: var(--primaryText);
    border-bottom: 1px solid var(--borderColor);
  }

  /* BRAND */
  .brand {
    font-weight: 800;
    letter-spacing: .3px;
    color: var(--accentColor);
    text-decoration: none;
    margin-right: 6px;
  }

  /* LINKS */
  .link {
    color: inherit;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 8px;
  }
  .link:hover {
    background: color-mix(in oklab, var(--primaryText) 8%, var(--surfaceColor));
  }

  .spacer { flex: 1; }
  .muted { opacity: 0.7; }
  .hello { opacity: 0.9; margin-right: 4px; }

  /* BUTTONS / PILLS */
  .pill {
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid var(--borderColor);
    background: transparent;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  .pill:hover {
    background: color-mix(in oklab, var(--primaryText) 8%, var(--surfaceColor));
  }

  /* BADGE */
  .badge {
    margin-left: 6px;
    padding: 0 6px;
    border-radius: 999px;
    background: var(--accentColor);
    color: var(--backgroundColor);
    font-weight: 700;
  }

  /* DROPDOWN */
  .dropdown {
    position: relative;
  }
  .menu {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    min-width: 140px;

    background: var(--surfaceColor);
    color: var(--primaryText);
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    box-shadow:
      0 1px 1px rgba(0,0,0,.04),
      0 8px 22px rgba(0,0,0,.12);
    padding: 6px;
    z-index: 50;
  }
  .menu-item {
    width: 100%;
    text-align: left;
    background: transparent;
    border: 0;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    color: inherit;
  }
  .menu-item:hover {
    background: color-mix(in oklab, var(--primaryColor) 14%, var(--surfaceColor));
  }
</style>
