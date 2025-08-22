<script>
    import '$lib/styles/tokens.css';
    import { onMount } from 'svelte';
  
    const DEFAULT_THEME = 'dark'; // change to 'light' if you prefer
  
    onMount(() => {
      const saved = localStorage.getItem('theme');
      const theme = saved === 'light' || saved === 'dark' ? saved : DEFAULT_THEME;
      const root = document.documentElement;
      root.classList.remove('theme-light', 'theme-dark');
      root.classList.add(`theme-${theme}`);
    });
  </script>
  
  <!--
    Base wrapper:
    - Tailwind handles spacing/layout (e.g., min-h-screen).
    - Colors come from tokens via inline style (keeps CSS to a single tokens file).
  -->
  <div class="min-h-screen" style="background: var(--backgroundColor); color: var(--primaryText);">
    <slot />
  </div>
  