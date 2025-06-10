<!-- Card.svelte -->
<script>
    export let title = "";
    export let subtitle = "";
    export let icon = "";
    export let locked = false;
    export let onClick = () => {};
  </script>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="rounded-xl border border-[#93754b] bg-[#201207] text-[#fff5e0] p-4 shadow-md cursor-pointer hover:shadow-lg transition-all flex items-start gap-4"
    on:click={() => onClick()}
  >
    <div class="text-2xl">
      {#if icon}{icon}{/if}
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-bold">{title}</h3>
      {#if subtitle}
        <p class="text-sm text-[#c2a673]">{subtitle}</p>
      {/if}
    </div>
    {#if locked}
      <div class="text-[#ffdd99] text-xl">🔒</div>
    {/if}
  </div>
  