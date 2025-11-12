
<!-- /home/bilal-tariq/00--TALEEM===>Project/ui/src/routes/quran/+page.svelte -->
<script>
    import SurahDropDown from './SurahDropDown.svelte';
  
    // Local selection state
    let selectedNum = null;
    let selectedName = '';
  
    // Callback version (component prop)
    function handlePick(num, name) {
      selectedNum = num;
      selectedName = name ?? '';
    }
  
    // Event version (for those who prefer on:select)
    function handleSelect(e) {
      const { surah, name } = e.detail || {};
      selectedNum = surah ?? null;
      selectedName = name ?? '';
    }
  </script>
  
  <div class="picker">
    <SurahDropDown
      placeholder="اختر سورة"
      onPick={handlePick}
      on:select={handleSelect}
    />
  </div>
  
  <section class="wrap" dir="rtl">
    <header class="hdr">
      <h1>اختيار السورة</h1>
      <p class="sub">اختر سورة من القائمة أدناه.</p>
    </header>
  
    <div class="result" aria-live="polite">
      {#if selectedNum}
        <p class="badge">السورة المختارة: <strong>{selectedNum}</strong> — <strong>{selectedName}</strong></p>
        <!-- If you later add a /quran/[surah] route, this link will naturally work -->
        <a class="go" href={`/quran/${selectedNum}`}>فتح صفحة السورة</a>
      {:else}
        <p class="muted">لم يتم اختيار سورة بعد.</p>
      {/if}
    </div>
  </section>
  
  <style>
    .wrap {
      max-width: 720px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .hdr h1 {
      margin: 0 0 0.25rem 0;
      font-size: 1.5rem;
    }
    .sub {
      margin: 0 0 1rem 0;
      color: var(--muted, #6b7280);
      font-size: 0.95rem;
    }
    .picker {
      margin: 0.75rem 0 1rem 0;
    }
    .result {
      margin-top: 1rem;
    }
    .badge {
      background: var(--chip-bg, #f3f4f6);
      border: 1px solid var(--chip-bd, #e5e7eb);
      border-radius: 0.5rem;
      padding: 0.6rem 0.8rem;
      display: inline-block;
    }
    .muted {
      color: var(--muted, #6b7280);
    }
    .go {
      display: inline-block;
      margin-top: 0.75rem;
      text-decoration: none;
      border: 1px solid var(--accent, #4f46e5);
      padding: 0.5rem 0.9rem;
      border-radius: 0.5rem;
    }
    .go:hover {
      background: var(--accent, #4f46e5);
      color: white;
    }
  </style>
  