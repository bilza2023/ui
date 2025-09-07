<!-- /src/lib/syllabusComp/LeftChaptersBar.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
  
	// API unchanged
	export let chapters = [];   // [{ slug|filename, name|title }]
	export let activeSlug = ""; // current chapter slug
  
	const dispatch = createEventDispatcher();
  
	const keyOf   = (c, i) => c?.slug ?? c?.filename ?? `idx-${i}`;
	const slugOf  = (c)    => c?.slug ?? c?.filename ?? "";
	const labelOf = (c)    => c?.name ?? c?.title ?? c?.slug ?? "—";
  
	function pick(slug) { dispatch('pick', { slug }); }
  
	// collapsible sidebar (internal only)
	let collapsed = false;
	const toggle = () => (collapsed = !collapsed);
  </script>
  
  <nav class="leftbar" class:collapsed={collapsed} aria-label="Chapters sidebar">
	<!-- header -->
	<div class="bar-top">
	  <div class="bar-title">{#if !collapsed}Chapters{/if}</div>
	  <button
		class="collapse-btn"
		on:click={toggle}
		aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
		title={collapsed ? 'Expand' : 'Collapse'}
	  >
		{#if collapsed}›{/if}{#if !collapsed}‹{/if}
	  </button>
	</div>
  
	<!-- scrollable list -->
	<ul class="chap-list">
	  {#each chapters as c, i (keyOf(c, i))}
		<li class="row">
		  <button
			class="chap"
			class:active={activeSlug === slugOf(c)}
			on:click={() => pick(slugOf(c))}
			title={labelOf(c)}
		  >
			<!-- numeric badge (primary when collapsed) -->
			<span class="idx" aria-hidden="true">{i + 1}</span>
			<!-- label hidden in collapsed mode -->
			<span class="text">{labelOf(c)}</span>
		  </button>
		</li>
	  {/each}
	</ul>
  </nav>
  
  <style>
	/* === Sidebar container === */
	.leftbar {
	  /* Make it a true sidebar */
	  flex: 0 0 260px;
	  width: 260px;
	  min-width: 220px;
  
	  /* Lock to screen height + own scrollbar on the RIGHT */
	  height: 100vh;
	  min-height: 100vh;
	  max-height: 100vh;
	  overflow-y: auto;             /* right-side scroll */
	  scrollbar-gutter: stable;     /* no layout jump when scrollbar appears */
	  overscroll-behavior: contain; /* prevent parent bounce */
  
	  /* Spacing & visuals */
	  box-sizing: border-box;
	  padding: 8px;
	  border-right: 1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--surfaceColor) 92%, var(--backgroundColor));
  
	  display: grid;
	  grid-template-rows: auto 1fr; /* header + scrollable list */
	  gap: 6px;
	}
	.leftbar.collapsed {
	  flex: 0 0 72px;
	  width: 72px;
	  min-width: 72px;
	  padding: 8px 6px;
	}
  
	/* === Header === */
	.bar-top {
	  display: flex; align-items: center; justify-content: space-between; gap: 8px;
	}
	.bar-title { font-weight: 600; color: var(--primaryText); opacity: .9; }
	.collapse-btn {
	  width: 28px; height: 28px; display: grid; place-items: center;
	  border-radius: 8px; cursor: pointer;
	  border: 1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--surfaceColor) 85%, var(--backgroundColor));
	  color: var(--primaryText);
	  transition: background .15s, border-color .15s, transform .12s;
	}
	.collapse-btn:hover {
	  background: color-mix(in oklab, var(--accentColor) 16%, var(--surfaceColor));
	  border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
	  transform: translateY(-1px);
	}
	.collapse-btn:active { transform: translateY(0); }
	.collapse-btn:focus-visible { outline: 2px solid var(--primaryColor); outline-offset: 2px; }
  
	/* === List reset: kill any default markers (“00”) === */
	.chap-list { list-style: none; margin: 0; padding: 4px 0 0 0; }
	.chap-list li::marker { content: ""; }
	.chap-list li::before { content: none !important; }
  
	/* === Row button === */
	.row { margin: 0; }
	.chap {
	  display: grid;
	  grid-template-columns: auto 1fr;
	  gap: 10px; align-items: center;
  
	  width: 100%;
	  text-align: left;
	  padding: 8px 10px; margin-bottom: 6px;
	  border: 1px solid var(--borderColor);
	  border-radius: 12px;
	  cursor: pointer;
  
	  background: color-mix(in oklab, var(--surfaceColor) 92%, var(--backgroundColor));
	  color: var(--primaryText);
  
	  transition: background .15s, border-color .15s, color .15s, transform .12s;
	}
  
	/* Alternating background for inactive rows */
	.chap-list li:nth-child(odd) .chap:not(.active) {
	  background: color-mix(in oklab, var(--surfaceColor) 88%, var(--backgroundColor));
	}
  
	.chap:hover {
	  background: color-mix(in oklab, var(--accentColor) 14%, var(--surfaceColor));
	  border-color: color-mix(in oklab, var(--primaryColor) 38%, var(--borderColor));
	  transform: translateY(-1px);
	}
	.chap:active { transform: translateY(0); }
	.chap:focus-visible { outline: 2px solid var(--primaryColor); outline-offset: 2px; }
	.chap.active {
	  background: var(--primaryColor);
	  border-color: var(--primaryColor);
	  color: var(--backgroundColor);
	}
  
	/* Index badge */
	.idx {
	  min-width: 24px; height: 24px;
	  display: grid; place-items: center;
	  border-radius: 999px;
	  font-size: 12px; line-height: 1;
	  border: 1px solid var(--borderColor);
	  background: color-mix(in oklab, var(--surfaceColor) 85%, var(--backgroundColor));
	  color: var(--primaryText);
	}
	.chap.active .idx {
	  border-color: color-mix(in oklab, var(--backgroundColor) 40%, var(--primaryColor));
	  background: color-mix(in oklab, var(--backgroundColor) 25%, var(--primaryColor));
	  color: var(--backgroundColor);
	}
  
	/* Label */
	.text {
	  display: inline-block;
	  max-width: 18ch;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
  
	/* Collapsed: show only numbers, keep right scroll */
	.leftbar.collapsed .chap {
	  grid-template-columns: 1fr; justify-items: center; padding: 10px 8px;
	}
	.leftbar.collapsed .text { display: none; }
	.leftbar.collapsed .idx { min-width: 30px; height: 30px; font-weight: 600; }
  
	/* Scrollbar cosmetics (right side) */
	.leftbar::-webkit-scrollbar { width: 10px; }
	.leftbar::-webkit-scrollbar-track {
	  background: color-mix(in oklab, var(--backgroundColor) 92%, var(--surfaceColor));
	}
	.leftbar::-webkit-scrollbar-thumb {
	  background: color-mix(in oklab, var(--primaryText) 25%, var(--surfaceColor));
	  border-radius: 8px;
	}
	.leftbar::-webkit-scrollbar-thumb:hover {
	  background: color-mix(in oklab, var(--primaryText) 40%, var(--surfaceColor));
	}

  /* === Responsive narrow mode === */
  @media (max-width: 720px){
    .sidebar {
      width: 56px;                /* shrink down to icon size */
      min-width: 56px;
    }
    .sidebar .label,
    .sidebar .chapter-name,
    .sidebar .extra-text {        /* any text/labels inside */
      display: none;              /* hide text, keep only icons */
    }
  }

  @media (max-width: 480px){
    .sidebar {
      width: 48px;                /* even tighter on tiny phones */
      min-width: 48px;
    }
  }
  </style>
  