
<script>
  import '$lib/styles/tokens.css';
import Nav from "../lib/appComps/Nav.svelte"

</script>

<div class="min-h-screen p-0 m-0" style="background: var(--backgroundColor); color: var(--primaryText);">
  <Nav />
  <slot />
</div>

<style>
  /* 1) global reset + theme baseline */
:root {
/* layout scales — keep these in tokens.css if you prefer */
--pageMaxWidth: 1200px;
--pagePadX: 16px;
--gap: 16px;
--radius: 14px;
--shadow-1: 0 2px 10px rgba(0,0,0,.08);
}

html, body {
margin: 0;
padding: 0;
min-height: 100%;
}

body {
background: var(--backgroundColor);
color: var(--primaryText);
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

/* 2) app shell */
.app {
min-height: 100dvh;
display: flex;
flex-direction: column;
}

/* 3) standard page container */
.page {
width: 100%;
max-width: var(--pageMaxWidth);
padding-inline: var(--pagePadX);
margin-inline: auto;
}

/* 4) shared UI primitives */

/* sticky, scrollable category chips bar */
.chip-rail {
position: sticky;
top: 0;
z-index: 10;
display: flex;
gap: var(--gap);
padding: 10px var(--pagePadX);
margin: 0 calc(-1 * var(--pagePadX)); /* let it breathe edge-to-edge */
background: var(--surface, color-mix(in oklab, var(--backgroundColor) 85%, black));
border-bottom: 1px solid var(--divider, color-mix(in oklab, var(--primaryText) 15%, transparent));
overflow-x: auto;
}

.chip-rail::-webkit-scrollbar { display: none; }

.chip {
flex: 0 0 auto;
padding: 8px 12px;
border-radius: 999px;
background: var(--chipBg, color-mix(in oklab, var(--primaryText) 8%, transparent));
color: var(--chipText, var(--primaryText));
border: 1px solid var(--cardBorder, color-mix(in oklab, var(--primaryText) 15%, transparent));
white-space: nowrap;
font-size: 0.95rem;
cursor: pointer;
}

.chip.is-active {
background: var(--chipActiveBg, var(--accent));
color: var(--chipActiveText, var(--accentText, white));
}

/* responsive cards grid */
.grid-cards {
display: grid;
gap: var(--gap);
grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
align-items: start;
}

/* base card */
.card {
background: var(--cardBg, color-mix(in oklab, var(--backgroundColor) 96%, black));
border: 1px solid var(--cardBorder, color-mix(in oklab, var(--primaryText) 15%, transparent));
border-radius: var(--radius);
box-shadow: var(--shadow-1);
overflow: hidden;
}

.card .thumb {
aspect-ratio: 16 / 9;
width: 100%;
object-fit: cover;
display: block;
background: color-mix(in oklab, var(--primaryText) 8%, transparent);
}

.card .content {
padding: 10px 12px 12px;
}

.card .title {
margin: 6px 0 4px;
font-weight: 600;
line-height: 1.25;
/* 2-line clamp */
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}

.card .meta {
color: var(--mutedText, color-mix(in oklab, var(--primaryText) 55%, transparent));
font-size: 0.9rem;
}

</style>