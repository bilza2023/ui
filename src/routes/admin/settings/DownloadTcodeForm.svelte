<!-- /src/routes/admin/settings/DownloadTcodeForm.svelte -->
<script>
    export let tcodes = [];
  
    function normalize(list) {
      return (Array.isArray(list) ? list : []).map((t) => {
        if (typeof t === 'string') return { value: t, label: t };
        const value = t.tcode ?? t.tcodeName ?? t.value ?? t.name ?? '';
        const label = t.name ?? t.tcodeName ?? t.tcode ?? value;
        return { value, label };
      }).filter((x) => x.value);
    }
  
    let options = normalize(tcodes);
    let selected = options[0]?.value ?? '';
    const href = () => `/admin/settings/export?tcode=${encodeURIComponent(selected)}`;
  </script>
  
  <div class="flex items-end gap-2">
    <div class="flex flex-col gap-1">
      <label for="tcode" class="text-xs opacity-70">Tcode</label>
      <select id="tcode" bind:value={selected} class="min-w-[16rem]">
        {#each options as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>
    </div>
  
    <!-- Real navigation to a dedicated endpoint → guaranteed download -->
    <a
      class="btn"
      href={href()}
      target="_blank"
      rel="noopener noreferrer external"
      download={`tcode_${selected}.json`}
    >
      Download
    </a>
  </div>
  