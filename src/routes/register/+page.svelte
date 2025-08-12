
<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let loading = false;
  let error = '';
  let showPwd = false;

  async function submit(e) {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        error = data?.detail || data?.error || 'Registration failed.';
        return;
      }

      // optional: keep token for client-side fetches (cookie is already set server-side)
      try { if (data?.token) localStorage.setItem('token', data.token); } catch {}

      // go somewhere useful — tweak as you like
      await goto('/');
    } catch (err) {
      error = err?.message ?? 'Network error.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="wrap">
  <form class="card" on:submit={submit} autocomplete="on" novalidate>
    <h1 class="text-center"> 🌐 Taleem.Help</h1>
    <h1>Register / Create account</h1>

    <label>
      <span>Email</span>
      <input
        type="email"
        bind:value={email}
        required
        autocomplete="email"
        autocapitalize="off"
        spellcheck="false"
        inputmode="email"
        placeholder="you@example.com" />
    </label>

    <label>
      <span>Password</span>
      <div class="pwd">
        <input
        type={showPwd ? 'text' : 'password'}
        value={password}
        on:input={(e) => password = e.target.value}
        required
        minlength="6"
        autocomplete="new-password"
        placeholder="••••••••" />
        <button type="button" class="toggle" on:click={() => (showPwd = !showPwd)} aria-label="Toggle password visibility">
          {showPwd ? 'Hide' : 'Show'}
        </button>
      </div>
    </label>

    {#if error}
      <div class="error" aria-live="polite">{error}</div>
    {/if}

    <div>Please provide a working email address.</div>
    <button class="submit" type="submit" disabled={loading || !email || !password}>
      {#if loading}Creating…{/if}
      {#if !loading}Create account{/if}
    </button>

    <p class="hint">
      Already have an account? <a href="/login">Log in</a>
    </p>
  </form>
</div>


<style>
  .wrap {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background-color: #C1B294;
    position: relative;           
    overflow: hidden;             
  }
  .wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/images/taleem.webp') center / cover no-repeat;
  opacity: 0.1;                 /* your requested 50% */
  z-index: 0;
  pointer-events: none;         /* ensure clicks pass through */
}

  .card {
    
    position: relative;           /* NEW */
    z-index: 1;                   /* NEW */
    width: min(460px, 92vw);
    display: grid;
    gap: 14px;
    padding: 20px 22px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    color: white;
    background:  #533f18;
  }
  h1 { margin: 0 0 2px; font-size: 1.25rem; }
  label { display: grid; gap: 6px; }
  label span { font-size: 0.9rem; opacity: 0.85; }
  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    /* background: transparent; */
    background-color:antiquewhite;
    color: rgb(91, 53, 3);
    outline: none;
  }
  .pwd {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .pwd input { flex: 1; }
  .toggle {
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: inherit;
    border-radius: 10px;
    padding: 8px 10px;
    cursor: pointer;
  }
  .submit {
    margin-top: 6px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    color: inherit;
    cursor: pointer;
  }
  .submit[disabled] { opacity: 0.6; cursor: not-allowed; }
  .error {
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 2px;
  }
  .hint { font-size: 0.9rem; opacity: 0.85; }
  a { color: inherit; text-decoration: underline; }
</style>
