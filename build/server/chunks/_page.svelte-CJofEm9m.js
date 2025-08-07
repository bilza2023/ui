import { c as create_ssr_component, v as validate_component } from './ssr-BUN1JaxN.js';
import { N as Nav } from './Nav-ByhrJ9Gc.js';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-k308dd_START --><link rel="stylesheet" href="/data/css/notes.css"><!-- HEAD_svelte-k308dd_END -->`, ""} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="notes" data-svelte-h="svelte-gio654"><h1>Theorem 12.1.6 – The Bisectors of the Angles of a Triangle Are Concurrent</h1> <img src="/images/theorems9old_12.1.6.svg" alt="Angle bisectors of triangle ABC meet at point I" style="max-width:50%;"> <h2>Book Statement</h2> <p>The bisectors of ∠A, ∠B, and ∠C of a triangle are concurrent — they meet at
    a single point.</p> <h2>Key Vocabulary</h2> <ul><li><strong>Angle Bisector:</strong> A ray or segment that divides an angle into
      two equal parts.</li> <li><strong>Concurrent Lines:</strong> Three or more lines that meet at a single
      point.</li> <li><strong>Incenter (I):</strong> The common point where all angle bisectors of
      a triangle intersect.</li></ul> <h2>Construction</h2> <ol><li>Draw angle bisectors of ∠B and ∠C. Let them intersect at point <strong>I</strong>.</li> <li>From point <strong>I</strong>, draw perpendiculars to each side:
      <em>ID ⊥ BC</em>, <em>IE ⊥ CA</em>, <em>IF ⊥ AB</em>.</li></ol> <h2>Proof Table</h2> <table><thead><tr><th>Statements</th><th>Reasons</th></tr></thead> <tbody><tr><td><em>ID = IF</em></td><td>Theorem 12.1.4 : Any point on bisector of ∠B is equidistant from its
          arms</td></tr> <tr><td><em>ID = IE</em></td><td>Theorem 12.1.4 : Any point on bisector of ∠C is equidistant from its
          arms</td></tr> <tr><td><em>∴ IE = IF</em></td><td>Each ≅ ID</td></tr> <tr><td><strong>I lies on the bisector of ∠A</strong></td><td>By converse of Theorem 12.1.4</td></tr> <tr><td><strong>I lies on all three bisectors</strong></td><td>Construction + above proof</td></tr></tbody></table> <img src="/images/theorems9old_12.1.6.svg" alt="Reinforcement: all three bisectors meet at point I" style="max-width:50%; margin-top:1rem;"> <h2>Conclusion</h2> <p>Thus, the bisectors of angles ∠A, ∠B, and ∠C of triangle ABC are concurrent
    at point <strong>I</strong>. This point is called the
    <strong>incenter</strong> of the triangle.</p> <hr> <small>Generated 2025-08-05 — Final theorem, Chapter 12.</small></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CJofEm9m.js.map
