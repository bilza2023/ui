import { c as create_ssr_component, v as validate_component } from './ssr-BUN1JaxN.js';
import { N as Nav } from './Nav-ByhrJ9Gc.js';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-k308dd_START --><link rel="stylesheet" href="/data/css/notes.css"><!-- HEAD_svelte-k308dd_END -->`, ""} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="notes" data-svelte-h="svelte-1yhj8dz"><h1>Theorem 13.1.3 – In Any Triangle, the Sum of the Lengths of Any Two Sides Exceeds the Length of the Third Side</h1> <img src="/images/theorems9old_13.1.3.svg" alt="Triangle ABC; extension on AC to D so AD = AB" style="max-width:50%;"> <h2>Book Statement</h2> <p>For every triangle, the sum of the lengths of any two sides is greater than the length of the remaining side.</p> <h2>Key Vocabulary</h2> <ul><li><strong>Triangle Inequality:</strong> Fundamental property relating side lengths of a triangle.</li> <li><strong>Exterior Angle:</strong> An angle formed by one side of a triangle and the extension of an adjacent side.</li></ul> <h2>Construction</h2> <ol><li>In △<em>ABC</em>, extend side <em>AC</em> beyond <em>C</em> to point <em>D</em> so that <strong>CD = AB</strong>.</li> <li>Join <em>BD</em>.</li></ol> <h2>Proof</h2> <table><thead><tr><th>Statements</th><th>Reasons</th></tr></thead> <tbody><tr><td><em>CD = AB</em></td><td>Construction</td></tr> <tr><td>∠<em>CBD</em> is an exterior angle of △<em>ABC</em></td><td>Definition</td></tr> <tr><td>∠<em>CBD &gt; ∠CAB</em></td><td>Exterior-angle theorem</td></tr> <tr><td><strong>BD &gt; CD</strong></td><td>Theorem 13.1.2 (longer side opposite larger angle)</td></tr> <tr><td>BD = BC + CD (Collinear points B-C-D)</td><td>Segment addition</td></tr> <tr><td>⇒ <strong>BC + AB &gt; AC</strong></td><td>Replace CD with AB; BD &gt; CD</td></tr></tbody></table> <img src="/images/theorems9old_13.1.3.svg" alt="Diagram repeated before conclusion" style="max-width:50%; margin-top:1rem;"> <h2>Conclusion</h2> <p>We have shown <em>BC + AB &gt; AC</em>.  
    By cyclic relabelling of vertices, the same reasoning gives the other two inequalities.  
    Thus, in any triangle, the sum of the lengths of any two sides exceeds the length of the third side.</p> <hr> <small>Generated 2025-08-05 • Unit 13, theorem 3 / 4.</small></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-cpjMh4no.js.map
