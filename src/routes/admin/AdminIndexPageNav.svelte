
<script>
    /** Render-only page nav bar. */
    export let title = "Question Index";
    export let totals = { all: 0, decks: 0, notes: 0 };
  </script>
  
  <div class="page-nav">
    <div class="left">
      <h1>{title}</h1>
      <div class="totals">
        <span class="pill">All: {totals.all}</span>
        <span class="pill decks">Decks: {totals.decks}</span>
        <span class="pill notes">Notes: {totals.notes}</span>
      </div>
    </div>
  
   
  </div>
  
  <style>
    .page-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--border, #333);
    }
  
    .page-nav .left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
  
    .page-nav h1 {
      font-size: 1.25rem;
      margin: 0;
      line-height: 1.2;
    }
  
    .page-nav .totals {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  
    .page-nav .right {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  </style>
  