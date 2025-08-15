<!-- /src/lib/SecondaryNav.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
  
    export let items = [];                 // string[]
    export let pageDisplayState = 0;       // two-way bound from parent
    export let align = 'left';             // 'left' | 'center' | 'right'
    export let onSelect = null;            // optional callback(detail)
  
    const dispatch = createEventDispatcher();
  
    function select(i) {
      pageDisplayState = i; // updates parent via bind:pageDisplayState
      const detail = { index: i, ordinal: i + 1, label: items[i] };
      dispatch('select', detail);
      if (typeof onSelect === 'function') onSelect(detail);
    }
  
    $: justify =
      align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';
  </script>
  <div class="home-nav py-4">
    <div class={"flex " + justify}>
      <div
        class="inline-flex items-center rounded-full p-1 ring-1 ring-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 overflow-x-auto whitespace-nowrap"
        role="tablist"
        aria-orientation="horizontal"
      >
        {#each items as label, i}
          <button
            class={`px-4 py-1.5 text-sm font-medium rounded-full transition outline-none focus:ring-2 focus:ring-[var(--color-primary)]/60 ${
              pageDisplayState === i
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-text)]'
                : 'text-[var(--color-primary)]'
            }`}
            role="tab"
            aria-selected={pageDisplayState === i}
            aria-controls={"secondary-tab-" + i}
            on:click={() => select(i)}
            on:keydown={(e) => {
              const btn = e.currentTarget;
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const dir = e.key === 'ArrowRight' ? 'nextElementSibling' : 'previousElementSibling';
                const next =
                  btn[dir] ??
                  (dir === 'nextElementSibling'
                    ? btn.parentElement.firstElementChild
                    : btn.parentElement.lastElementChild);
                next?.focus();
              } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                select([...btn.parentElement.children].indexOf(btn));
              }
            }}
          >
            {label}
          </button>
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    .home-nav {
      width: 100%;
      text-align: left;
    }
  </style>
  
