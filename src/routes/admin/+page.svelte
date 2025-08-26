<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/components/AdminNav.svelte";
  import "$lib/styles/forms.css";

  // keep these paths exactly as you requested
  import AdminIndexTable from "./AdminIndexTable.svelte";
  import AdminIndexPageNav from "./AdminIndexPageNav.svelte";

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

<Nav />
<AdminNav />

<!-- Page-level nav under AdminNav -->
<AdminIndexPageNav title="Question Index" {totals} />

<!-- Table fed from server-loaded items -->
<div style="padding:0 60px">
  <AdminIndexTable {items} />

</div>
