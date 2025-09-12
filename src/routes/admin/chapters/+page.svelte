<script>
  import '$lib/styles/tokens.css';
  import ListTable from '$lib/listTable/ListTable.svelte';
  import { goto } from '$app/navigation';

  export let data;
  const tcode = data.tcode;
  const items = data.items ?? [];

  // console.log("items" , items);
  console.log("tcode" , tcode);

  const columns = [
    { id:'name',   label:'Chapter',  accessor:'name',      kind:'text',  primary:true, sortable:true },
    { id:'slug',   label:'Slug',     accessor:'slug',      kind:'text',  sortable:true },
    { id:'order',  label:'Order',    accessor:'sortOrder', kind:'number',sortable:true, align:'right', width:'88px' },
    { id:'edited', label:'Edited',   accessor:'updatedAt', kind:'date',  format:'relative', sortable:true, width:'120px' },
    { id:'act',    label:'',         accessor:'__',        kind:'actions', action:['exercises'], align:'right', width:'120px' },
    { id:'act',    label:'',         accessor:'__',        kind:'actions', action:['addExercise'], align:'right', width:'120px' },
    { id:'act',    label:'',         accessor:'__',        kind:'actions', action:['edit'], align:'right', width:'120px' }
    
  ];

  const searchKeys = ['name','slug'];

  function handleRowClick(_) {} // no-op (use the button for clarity)

  function handleAction(ev) {
    const { actionId, row } = ev.detail;
    if (actionId === 'addExercise') {
      goto(`/admin/exercises/create?tcodeId=${tcode.id}&chapterId=${row.id}`);
    }
    if (actionId === 'exercises') {
      goto(`/admin/exercises?tcode=${tcode.id}&chapter=${row.id}`);
    }
    if (actionId === 'edit') {
      goto(`/admin/chapters/edit?tcodeId=${tcode.id}&chapterId=${row.id}`);
    }
  }
</script>

<section class="wrap">
  <header class="hdr">
    <h1>Chapters {#if tcode}<span class="tc">/ {tcode.name}</span>{/if}</h1>
    {#if tcode}
      <!-- <a class="btn" href={`/admin/syllabus/chapters/create?tcodeId=${tcode.slug}`}>New Chapter</a> -->
    {/if}
  </header>


  <ListTable
    items={items}
    columns={columns}
    rowKey="slug"
    searchable={true}
    searchKeys={searchKeys}
    on:rowClick={handleRowClick}
    on:action={handleAction}
  />
</section>

<style>
  .wrap { margin-inline:auto; padding:1rem; width:min(90vw,1100px); color:var(--primaryText); }
  .hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:.75rem; }
  h1 { margin:0; font-size:1.25rem; color:var(--primaryText); }
  .tc { color:var(--secondaryText); }
  .btn {
    padding:.5rem .8rem; border:1px solid var(--borderColor); border-radius:10px;
    background:var(--surfaceColor); color:var(--primaryText); text-decoration:none;
  }
  .btn:hover { filter:brightness(1.1); }
</style>
