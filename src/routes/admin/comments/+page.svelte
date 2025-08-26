<script>
    import "$lib/styles/forms.css";
    export let data;
    let { status, comments } = data;
  
    const tabHref = (s) => `?status=${encodeURIComponent(s)}`;
  </script>
  
  <header class="page-head">
    <h1>Admin · Comments</h1>
    <nav class="tabs" aria-label="Comment status">
      <a class:active={status==='new'} href={tabHref('new')} aria-current={status==='new' ? 'page' : undefined}>New</a>
      <a class:active={status==='answered'} href={tabHref('answered')} aria-current={status==='answered' ? 'page' : undefined}>Answered</a>
      <a class:active={status==='bad'} href={tabHref('bad')} aria-current={status==='bad' ? 'page' : undefined}>Bad</a>
    </nav>
  </header>
  
  {#if !comments?.length}
    <p class="empty">No comments in “{status}”.</p>
  {:else}
    <div class="list">
      {#each comments as c}
        <article class="row">
          <header class="meta">
            <div class="left">
              <div class="id">#{c.id.slice(0,8)}</div>
              <div class="stamp">{new Date(c.created_at).toLocaleString()}</div>
            </div>
            <div class="right">
              <span class={`pill status-${c.status}`}>{c.status}</span>
              <span class="pill subtle">content:{c.content_id}</span>
              <span class="pill subtle">user:{c.user_id}</span>
            </div>
          </header>
  
          <div class="text">
            <strong>Comment</strong>
            <p>{c.text}</p>
          </div>
  
          {#if status === 'new'}
            <form method="POST" action="?/respond" class="respond">
              <input type="hidden" name="id" value={c.id} />
              <label>Response</label>
              <textarea name="response" rows="3" placeholder="Write a short answer…"></textarea>
              <div class="actions">
                <button class="btn primary" type="submit">Publish Response</button>
                <button class="btn danger" formaction="?/bad" formmethod="POST">Mark Bad</button>
              </div>
            </form>
          {:else if status === 'answered'}
            <div class="response">
              <strong>Response</strong>
              <p>{c.response ?? '—'}</p>
              <form method="POST" action="?/setStatus" class="inline">
                <input type="hidden" name="id" value={c.id} />
                <input type="hidden" name="status" value="new" />
                <button class="btn ghost">Move back to New</button>
              </form>
            </div>
          {:else if status === 'bad'}
            <form method="POST" action="?/setStatus" class="inline">
              <input type="hidden" name="id" value={c.id} />
              <input type="hidden" name="status" value="new" />
              <button class="btn ghost">Restore to New</button>
            </form>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
  
  <style>
    /* Page frame */
    :root {
      /* No hard colors here—everything comes from tokens.css */
    }
  
    .page-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 1rem;
      margin: 0 0 1rem 0;
      border-bottom: 1px solid var(--borderColor);
      padding-bottom: .5rem;
    }
    .page-head h1 {
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      margin: 0;
      letter-spacing: .2px;
      color: var(--primaryText);
    }
  
    /* Tabs */
    .tabs {
      display: inline-flex;
      gap: .35rem;
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: .6rem;
      padding: .25rem;
    }
    .tabs a {
      text-decoration: none;
      padding: .35rem .7rem;
      border-radius: .45rem;
      line-height: 1;
      color: var(--primaryText);
      border: 1px solid transparent;
      transition: background .15s ease, color .15s ease, border-color .15s ease;
    }
    .tabs a:hover { background: var(--backgroundColor); }
    .tabs a.active {
      background: var(--primaryColor);
      color: #fff;
      border-color: var(--primaryColor);
    }
  
    /* Empty state */
    .empty {
      color: var(--secondaryText);
      margin: 1rem 0;
      padding: .9rem 1rem;
      border: 1px dashed var(--borderColor);
      border-radius: .6rem;
      background: var(--surfaceColor);
    }
  
    /* List & cards */
    .list { display: flex; flex-direction: column; gap: .9rem; }
  
    .row {
      border: 1px solid var(--borderColor);
      border-radius: .9rem;
      padding: .9rem;
      background: var(--surfaceColor);
      transition: border-color .15s ease, box-shadow .15s ease;
    }
    .row:hover {
      border-color: var(--primaryColor);
      box-shadow: 0 2px 12px rgba(0,0,0,.08);
    }
  
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: .75rem;
      font-size: .9rem;
      margin-bottom: .5rem;
    }
    .meta .left { display: flex; gap: .6rem; align-items: baseline; color: var(--secondaryText); }
    .meta .id {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      padding: .1rem .35rem;
      border: 1px solid var(--borderColor);
      border-radius: .35rem;
    }
    .meta .stamp { opacity: .9; }
  
    .meta .right { display: flex; gap: .35rem; flex-wrap: wrap; }
  
    /* Pills */
    .pill {
      padding: .15rem .5rem;
      border: 1px solid var(--borderColor);
      border-radius: 999px;
      font-size: .78rem;
      line-height: 1.2;
      background: var(--backgroundColor);
      color: var(--secondaryText);
    }
    .pill.subtle { opacity: .9; }
  
    /* Status accents (purely decorative; keeps tokens) */
    .pill.status-new {
      color: var(--primaryText);
      border-color: var(--primaryColor);
    }
    .pill.status-answered {
      color: #fff;
      background: var(--secondaryColor);
      border-color: var(--secondaryColor);
    }
    .pill.status-bad {
      color: #fff;
      background: #b2362c; /* no dedicated danger token; keep a single red */
      border-color: #b2362c;
    }
  
    /* Body text blocks */
    .text, .response { margin: .6rem 0 .2rem; }
    .text strong, .response strong {
      display: inline-block;
      font-weight: 600;
      margin-bottom: .2rem;
      color: var(--primaryText);
    }
    .text p, .response p { margin: 0; white-space: pre-wrap; color: var(--primaryText); }
  
    /* Forms */
    .respond textarea {
      width: 100%;
      border-radius: .6rem;
      border: 1px solid var(--borderColor);
      background: var(--backgroundColor);
      color: var(--primaryText);
      padding: .6rem .7rem;
      resize: vertical;
    }
    .respond label {
      display: block;
      font-size: .9rem;
      color: var(--secondaryText);
      margin: .25rem 0 .3rem;
    }
  
    .actions {
      display: flex;
      gap: .5rem;
      margin-top: .6rem;
      flex-wrap: wrap;
    }
  
    /* Buttons (token-aligned) */
    .btn {
      border: 1px solid var(--borderColor);
      background: var(--backgroundColor);
      color: var(--primaryText);
      padding: .45rem .7rem;
      border-radius: .5rem;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      transition: background .12s ease, border-color .12s ease, transform .02s ease, color .12s ease;
    }
    .btn:hover { background: var(--surfaceColor); }
    .btn:active { transform: translateY(1px); }
  
    .btn.primary {
      background: var(--primaryColor);
      color: #fff;
      border-color: var(--primaryColor);
    }
    .btn.primary:hover {
      filter: brightness(1.05);
    }
  
    .btn.danger {
      background: #b2362c; /* consistent with status-bad */
      color: #fff;
      border-color: #b2362c;
    }
    .btn.danger:hover { filter: brightness(1.05); }
  
    .btn.ghost {
      background: transparent;
      border-color: var(--borderColor);
      color: var(--secondaryText);
    }
  
    .inline { margin-top: .5rem; }
  </style>
  