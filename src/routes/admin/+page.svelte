<script>
 
  import "$lib/styles/forms.css";

  // keep these paths exactly as you requested
  import AdminIndexTable from "./AdminIndexTable.svelte";

  // ⬇️ CRUCIAL: accept server data
  export let data;
  // ⬇️ derive what the components need (reactively, so navigation updates work)
  let items = [];
  let totals = { all: 0, decks: 0, notes: 0 };
  $: if (data) {
    items  = data.items ?? [];
    totals = data.totals ?? { all: 0, decks: 0, notes: 0 };
  }
</script>

<!-- <AdminIndexPageNav totals={data.totals} filters={data.filters} /> -->

<!-- Table fed from server-loaded items -->
<div style="padding:0 60px">
  <AdminIndexTable items={data.items} />

</div>
