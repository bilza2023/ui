<script>
  import '$lib/styles/tokens.css';
  import ListTable from '$lib/listTable/ListTable.svelte';
  import { goto } from '$app/navigation';

  export let data;
  const items = data.items ?? [];
console.log("items", items);
  // from loader → items the table expects

  // --- Columns exercise all kinds: text, badge, date, thumbnail, number, actions ---
  const columns = [
  { id:'thumb',  label:'',       accessor:'thumbnail',   kind:'thumbnail', width:'64px' },
  { id:'name',   label:'Title',  accessor:'name',        kind:'text',  primary:true, sortable:true },
  { id:'slug',   label:'Slug',   accessor:'slug',        kind:'text',  sortable:true },
  { id:'chap',   label:'Chapters',accessor:'chapterCount',kind:'number',sortable:true, align:'right', width:'96px' },
  { id:'edited', label:'Edited', accessor:'editedAt',    kind:'date',  format:'relative', sortable:true, width:'120px' },
  { id:'act',    label:'',       accessor:'__',          kind:'actions', action:['chapters'], align:'right', width:'160px' },
  { id:'act',    label:'',       accessor:'__',          kind:'actions', action:['addChapter'], align:'right', width:'160px' }
];

  // Search across text + non-text columns
  const searchKeys = ['name','slug','chapterCount'];


  let lastEvent = '';

  const hrefFor = (row) =>
  row.type === 'note'   ? `/notes?filename=${row.slug}`   :
  row.type === 'deck'   ? `/player?filename=${row.slug}`  :
  row.type === 'course' ? `/syllabus?tcode=${row.slug}`   : '';

function handleRowClick(ev) {
  const row = ev.detail;
  const href = hrefFor(row);
  if (href) goto(href);
}

function handleAction(ev) {
  const { actionId, row } = ev.detail;
  if (actionId === 'addChapter') return goto(`/admin/syllabus/chapters/create?tcodeId=${row.id}`);
  if (actionId === 'chapters')    return goto(`/admin/syllabus/chapters?tcodeId=${row.id}`);
  if (actionId === 'delete')  return console.log('delete', row.slug);
}
</script>

<section class="wrap">
  <h1>Tcode</h1>
  <h3><a href="/admin/syllabus/create">Add  New Tcode</a></h3>

  <ListTable
    items={items}
    columns={columns}
    rowKey="slug"
    searchable={true}
    searchKeys={searchKeys}
    thumbBaseUrl=""
    on:rowClick={handleRowClick}
    on:action={handleAction}
  />

  {#if lastEvent}
    <p class="last">{lastEvent}</p>
  {/if}
</section>

<style>
  .wrap {
    margin-inline: auto;
    padding: 1rem;
    width: min(90vw, 1100px);
    color: var(--primaryText);
  }
  h1 {
    margin: 0 0 .75rem 0;
    font-size: 1.25rem;
    color: var(--primaryText);
  }
  .last{
    margin-top: .75rem;
    padding: .5rem .75rem;
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    background: var(--surfaceColor);
    color: var(--secondaryText);
  }
</style>
