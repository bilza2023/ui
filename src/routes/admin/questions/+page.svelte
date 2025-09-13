<script>
  import '$lib/styles/tokens.css';
  import ListTable from '$lib/listTable/ListTable.svelte';
  import { goto } from '$app/navigation';

  export let data;
  const items = data.items ?? [];

  const columns = [
    { id:'thumb',   label:'',        accessor:'thumbnail', kind:'thumbnail', width:'60px' },
    { id:'name',    label:'Title',   accessor:'name',      kind:'text',      primary:true, sortable:true },
    { id:'type',    label:'Type',    accessor:'type',      kind:'badge',     sortable:true, align:'center' },
    { id:'tcode',   label:'Tcode',   accessor:'tcode',     kind:'text',      sortable:true },
    { id:'chEx',    label:'Ch · Ex', accessor:'chEx',      kind:'text' },
    { id:'status',  label:'Status',  accessor:'status',    kind:'badge',     sortable:true, align:'center' },
    { id:'edited',  label:'Edited',  accessor:'editedAt',  kind:'date',      format:'relative', sortable:true, align:'right', width:'120px' },
    { id:'actions', label:'',        kind:'actions',       action:['Edit','Delete'], align:'right', width:'150px' }
  ];

  function onRowClick(e) {
    const row = e.detail;
    goto(`/admin/questions/edit?questionId=${row.id}`);
  }
  function onAction(e) {
    const { actionId, row } = e.detail;
    if (actionId === 'Edit') goto(`/admin/questions/edit?questionId=${row.id}`);
    if (actionId === 'Delete') {
      const f = document.getElementById('deleteForm');
      f.elements.id.value = String(row.id);
      f.requestSubmit();
    }
  }
</script>

<section class="wrap">
  <h1>Questions</h1>

  <ListTable
    {items}
    {columns}
    rowKey="id"
    searchable={true}
    searchKeys={['name','tcode','chEx','status','type']}
    on:rowClick={onRowClick}
    on:action={onAction}
  />

  <form id="deleteForm" method="post" action="?/delete" style="display:none">
    <input type="hidden" name="id" value="">
  </form>
</section>

<style>
  .wrap{ margin-inline:auto; width:min(95vw,1100px); padding:1rem; }
  h1{ margin:0 0 .75rem 0; font-size:1.25rem; color:var(--primaryText); }
</style>
