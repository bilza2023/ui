<script>
  // @ts-nocheck
  import { enhance } from '$app/forms';
  export let data;
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/AdminNav.svelte";
  console.log("data",data);
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

<Nav />
<AdminNav />

<div class="page">
  <h1>Subscriptions (Admin)</h1>

  <!-- 1) Find user by email (GET) -->
  <form class="card" method="GET">
    <h2>Find User</h2>
    <div class="row">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" bind:value={email} placeholder="user@example.com" required />
    </div>
    <button type="submit">Load</button>
  </form>

  <!-- 2) Grant subscription (POST) -->
  <form class="card" method="POST" use:enhance>
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

    <div class="row">
      <button type="submit" formaction="?/grant">Grant</button>
    </div>

    {#if selectedUser}
      <p class="hint">Selected user: <strong>{selectedUser.email}</strong></p>
    {/if}
  </form>

  <!-- 3) User subscriptions table -->
  <div class="card">
    <h2>User Subscriptions</h2>
    {#if !selectedUser}
      <p class="muted">Look up a user to view their subscriptions.</p>
    {:else if !subscriptions.length}
      <p class="muted">No subscriptions yet for <strong>{selectedUser.email}</strong>.</p>
    {:else}
      <table class="subs">
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
    {/if}
  </div>
</div>

<style>
  .page { max-width: 920px; margin: 24px auto; padding: 0 16px; }
  h1 { margin: 0 0 16px 0; font-size: 24px; }
  .card { background: var(--panel-bg, #111); border: 1px solid #2a2a2a; border-radius: 12px; padding: 16px; margin: 12px 0;  background-color:  #190f0f;color:aliceblue;}
  .row { display: grid; grid-template-columns: 160px 1fr; gap: 10px; align-items: center; margin: 10px 0; }
  label { font-weight: 600; opacity: 0.9; background-color:  #333;color:aliceblue; }
  input, select, button { padding: 8px 10px;background-color:  #333;color:aliceblue; }
  button { border-radius: 8px; border: 1px solid #333; cursor: pointer; }
  .hint { margin-top: 8px; opacity: 0.8; }
  .muted { opacity: 0.75; }
  table.subs { width: 100%; border-collapse: collapse; }
  table.subs th, table.subs td { padding: 8px 10px; border-top: 1px solid #262626; text-align: left; }
  tr.active .status { color: #66d9a8; font-weight: 700; }
  tr.expired .status { color: #ff6b6b; font-weight: 700; }
  tr.upcoming .status { color: #ffd166; font-weight: 700; }
</style>
