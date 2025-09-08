
<script>
  import '$lib/styles/tokens.css';
  import { goto } from '$app/navigation';

  export let data;

  // Normalize rows defensively
  const raw = Array.isArray(data?.items) ? data.items : [];
  const rows = raw.map((r) => {
    const ch = (r?.chapter ?? '') !== '' && r?.chapter != null ? `Ch ${r.chapter}` : '';
    const ex = r?.exercise ? (ch ? ` · ${r.exercise}` : r.exercise) : '';
    return {
      id: r.slug,
      slug: r.slug,
      name: r?.name ?? r?.title ?? r?.slug ?? 'Untitled',
      type: r?.type ?? '—',
      tcode: r?.tcode ?? '—',
      chEx: ch || ex ? `${ch}${ex}` : '—',
      status: r?.status ?? '—',
      edited: r?.editedAt ?? r?.updatedAt ?? r?.createdAt ?? null,
      thumbnail: r?.thumbnail ?? null
    };
  });

  const editHref = (r) =>
    r?.type === 'note'
      ? `/admin/edit-note?slug=${encodeURIComponent(r.slug)}`
      : `/admin/edit-deck?slug=${encodeURIComponent(r.slug)}`;

  function confirmDelete(e) {
    if (!confirm('Delete this question? This cannot be undone.')) {
      e.preventDefault();
    }
  }

  function openRow(r) {
    if (!r) return;
    const href =
      r.type === 'note'
        ? `/note/${encodeURIComponent(r.slug)}`
        : `/player?slug=${encodeURIComponent(r.slug)}`;
    goto(href);
  }
</script>

<div class="wrap">
  <h1 class="pageTitle">Questions</h1>

  {#if rows.length === 0}
    <div class="empty">No questions yet.</div>
  {:else}
    <div class="tableWrap">
      <table class="list">
        <thead>
          <tr>
            <th class="col-title">Title</th>
            <th>Type</th>
            <th>Subject</th>
            <th>Ch/Ex</th>
            <th>Status</th>
            <th>Edited</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as r (r.id)}
            <tr>
              <td class="col-title">
                <button class="linklike" on:click={() => openRow(r)} aria-label={`Open ${r.name}`}>
                  <div class="title">{r.name}</div>
                  <div class="sub">{r.slug}</div>
                </button>
              </td>
              <td><span class="badge">{r.type}</span></td>
              <td>{r.tcode}</td>
              <td>{r.chEx}</td>
              <td><span class="badge">{r.status}</span></td>
              <td>{r.edited ? new Date(r.edited).toLocaleString() : '—'}</td>
              <td class="col-actions">
                <a class="btn sm" href={editHref(r)} aria-label={`Edit ${r.name}`}>Edit</a>
                <form method="post" action="?/delete" class="inline">
                  <input type="hidden" name="slug" value={r.slug} />
                  <button class="btn sm danger" type="submit" on:click={confirmDelete} aria-label={`Delete ${r.name}`}>
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .wrap { padding: 1rem; color: var(--primaryText); }
  .pageTitle { margin: 0 0 .75rem; font-size: 1.25rem; }

  .tableWrap { overflow-x: auto; }
  table.list { width: 100%; border-collapse: collapse; }
  thead th {
    text-align: left; font-weight: 600; font-size: .9rem;
    border-bottom: 1px solid var(--divider, #334); padding: .5rem .5rem;
    color: var(--secondaryText, #aab);
  }
  tbody td { padding: .5rem .5rem; border-bottom: 1px solid var(--divider, #233); vertical-align: middle; }
  .col-title .title { font-weight: 600; }
  .col-title .sub { font-size: .8rem; opacity: .7; }
  .col-actions { white-space: nowrap; text-align: right; }

  .linklike {
    display: inline-block;
    text-align: left;
    background: transparent;
    border: 0;
    padding: 0;
    color: inherit;
    cursor: pointer;
  }

  .btn {
    display: inline-block; padding: .35rem .6rem; border-radius: .5rem;
    background: var(--buttonBg, #89f); color: #0b1220; font-weight: 700; text-decoration: none;
  }
  .btn.sm { font-size: .85rem; padding: .25rem .5rem; }
  .btn.danger { background: var(--dangerBg, #f99); color: #2b0c0c; }
  .inline { display: inline; margin-left: .25rem; }

  .badge {
    display: inline-block; padding: .15rem .4rem; border-radius: .4rem;
    font-size: .75rem; background: var(--chipBg, #2b3448); color: var(--chipText, #cfe);
  }

  .empty {
    padding: 1rem; border: 1px dashed var(--mutedBorder, #465);
    border-radius: .75rem; opacity: .8;
  }

  @media (max-width: 720px) {
    thead th:nth-child(3), tbody td:nth-child(3), /* Subject */
    thead th:nth-child(6), tbody td:nth-child(6)  /* Edited  */
    { display: none; }
  }
</style>
