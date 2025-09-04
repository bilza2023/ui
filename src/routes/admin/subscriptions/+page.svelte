<script>
  // @ts-nocheck
  import { enhance } from '$app/forms';
  import '$lib/styles/forms.css';    // ✅ shared form styles
  import '$lib/styles/tables.css';   // ✅ shared table styles

  
  export let data;

  let email = data.selectedEmail ?? '';
  let tcode = '';
  let duration = 30;
  let startDate = '';

  /** Keep the form prefilled when clicking "Renew" in the table */
  function prefillFromRow(row) {
    tcode = row.tcode;
    duration = 30;
    startDate = ''; // default to now; admin can choose
  }

  // expose for noscript fallback too
  $: selectedUser = data.selectedUser;
  $: subscriptions = data.subscriptions ?? [];
</script>

<div class="page">
  <h1>Subscriptions (Admin)</h1>

  <!-- 1) Find user by email (GET) -->
  <form class="form" method="GET">
    <h2>Find User</h2>
    <div class="row">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" bind:value={email} placeholder="user@example.com" required />
    </div>
    <div class="actions">
      <button type="submit" class="primary">Load</button>
    </div>
  </form>

  <!-- 2) Grant subscription (POST) -->
  <form class="form" method="POST" use:enhance>
    <h2>Grant Subscription</h2>

    <div class="row">
      <label for="grant-email">Email</label>
      <input id="grant-email" name="email" type="email" bind:value={email} placeholder="user@example.com" required />
    </div>

    <div class="row">
      <label for="tcode">Tcode</label>
      <select id="tcode" name="tcode" bind:value={tcode} required>
        <option value="" disabled selected>Select tcode…</option>
        {#each data.tcodes as t}
          <option value={t.tcodeName}>{t.tcodeName} — {t.description}</option>
        {/each}
      </select>
    </div>

    <div class="row">
      <label for="duration">Duration (days)</label>
      <input id="duration" name="duration" type="number" min="1" step="1" bind:value={duration} required />
    </div>

    <div class="row">
      <label for="startDate">Start Date (optional)</label>
      <input id="startDate" name="startDate" type="date" bind:value={startDate} />
    </div>

    <div class="actions">
      <button type="submit" class="primary" formaction="?/grant">Grant</button>
    </div>

    {#if selectedUser}
      <p class="hint">Selected user: <strong>{selectedUser.email}</strong></p>
    {/if}
  </form>

  <!-- 3) User subscriptions table -->
  <div class="form">
    <h2>User Subscriptions</h2>
    {#if !selectedUser}
      <p class="muted">Look up a user to view their subscriptions.</p>
    {:else if !subscriptions.length}
      <p class="muted">No subscriptions yet for <strong>{selectedUser.email}</strong>.</p>
    {:else}
      <div class="taleemTableWrap">
        <table class="taleemTable">
          <thead>
            <tr>
              <th>Tcode</th>
              <th>Start</th>
              <th>Duration</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Remaining</th>
              <th>Quick</th>
            </tr>
          </thead>
          <tbody>
          {#each subscriptions as row}
            <tr class={row.status}>
              <td>{row.tcode}</td>
              <td>{row.start_date?.slice(0,10)}</td>
              <td>{row.duration}d</td>
              <td>{row.expiresAt?.slice(0,10)}</td>
              <td class="status">{row.status}</td>
              <td>{row.status === 'active' ? `${row.remainingDays}d` : '-'}</td>
              <td>
                <button type="button" on:click={() => prefillFromRow(row)}>Renew…</button>
              </td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<style>
  .page {
    max-width: 920px;
    margin: 24px auto;
    padding: 0 16px;
    color: var(--primaryText);
  }

  h1 { margin: 0 0 16px 0; font-size: 24px; color: var(--primaryText); }

  /* Make the shared table fill the form panel */
  .form .taleemTableWrap {
    max-width: none;
    margin: 0;
  }

  /* Status colors (tokens only) */
  tr.active   .status { color: var(--secondaryColor); font-weight: 700; }
  tr.expired  .status { color: color-mix(in oklab, var(--accentColor) 80%, var(--primaryText)); font-weight: 700; }
  tr.upcoming .status { color: color-mix(in oklab, var(--primaryColor) 80%, var(--primaryText)); font-weight: 700; }
</style>
