<script>
    export let data=[];
</script>


<h2>Existing Entries</h2>
<div class="table">
  <div class="thead">
    <div>ID</div><div>Title</div><div>Type</div><div>Category</div><div>Slug</div><div>Href</div><div>Pinned</div><div>Sort</div>
  </div>
  {#each data.entries as e}
    <div class="trow">
      <div>{e.id}</div>
      <div>{e.title}</div>
      <div>{e.type}</div>
      <div>{e.category}</div>
      <div>{e.slug}</div>
      <div class="href">{e.href}</div>
      <div>{e.pinned ? '✓' : ''}</div>
      <div>{e.sortOrder ?? 0}</div>
    </div>
  {/each}
  {#if !data.entries?.length}
    <div class="empty">No entries</div>
  {/if}
</div>


<style>
 
  
    .table { margin-top: 24px; border: 1px solid #222; border-radius: 10px; overflow: hidden; }
    .thead, .trow { display: grid; grid-template-columns: 60px 1.6fr 0.9fr 0.9fr 1.2fr 2fr 0.7fr 0.6fr; }
    .thead { background: #0a0a0a; font-weight: 700; }
    .trow:nth-child(even) { background: #0d0d0d; }
    .thead > div, .trow > div { padding: 8px 10px; border-bottom: 1px solid #171717; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .href { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    .empty { padding: 12px; color: #aaa; }
    @media (max-width: 720px) {

      .thead, .trow { grid-template-columns: 40px 1.2fr 0.8fr 0.8fr 1fr 1.4fr 0.6fr 0.6fr; }
    }
  </style>
  