import { c as create_ssr_component, v as validate_component } from './ssr-DD2Fi2eU.js';
import { N as Nav } from './Nav-CdkUCx1n.js';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1rj4c7e_START --><link rel="stylesheet" href="/data/css/notes.css"><!-- HEAD_svelte-1rj4c7e_END -->`, ""}  ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="notes" data-svelte-h="svelte-gbjw0f"><h1>Theorem 11.1.5 – Parallel-Line Intercept Theorem</h1> <img src="/images/theorems9old_11.1.5.svg" alt="Parallel lines cutting equal segments on two transversals" style="max-width:50%;"> <h2>Book Statement</h2> <p>If three or more parallel lines make congruent segments on a transversal,
    they also intercept congruent segments on any other line that cuts them.</p> <h2>Key Vocabulary</h2> <ul><li><strong>Parallel Lines:</strong> Lines in a plane that never meet.</li> <li><strong>Transversal:</strong> A line that intersects two or more other lines.</li> <li><strong>Congruent Segments:</strong> Line segments that have the same length.</li></ul> <p>The theorem ensures that once a family of parallel lines slices one
    transversal into equal pieces, <em>every</em> transversal they cross will be
    divided into equal pieces as well.</p> <h2>What We Will Prove</h2> <ol><li>Parallel lines that cut equal segments on one transversal cut equal
      segments on <em>any</em> transversal.</li></ol> <h2>Proof Road-Map (Top-Level Steps)</h2> <table><thead><tr><th>Step</th> <th>Core idea</th> <th>Tool / Theorem used</th></tr></thead> <tbody><tr><td>1</td> <td>Mark equal segments on the first transversal</td> <td>Given condition</td></tr> <tr><td>2</td> <td>Create auxiliary triangles between consecutive parallels</td> <td>Triangle Congruence (SAS)</td></tr> <tr><td>3</td> <td>Transfer equality to the second transversal</td> <td>CPCTC — corresponding parts of congruent triangles</td></tr></tbody></table> <img src="/images/theorems9old_11.1.5.svg" alt="Parallel lines cutting equal segments on two transversals" style="max-width:50%;"> <h2>Detailed Proof</h2> <h3>Step 1 – Equal Segments on the First Transversal</h3> <p>Consider the transversal <em>AB</em> intersected by the family of parallel
    lines. The book designates the intersection points in order as
    <em>A L Q R B</em>, and explicitly states
    <span style="white-space:nowrap;">AL = LQ = QR = RB</span>. We therefore know
    that <em>AB</em> is subdivided into <strong>four congruent segments</strong>.</p> <ul><li><strong>1a.</strong> Mark each equal segment on <em>AB</em> with a single
      tick so the equality is visually clear.</li> <li><strong>1b.</strong> Note that the parallel lines are spaced so that each
      ticked segment spans the same pair of parallels.</li> <li><strong>1c.</strong> Label the intersection points on the second transversal
      <em>CD</em> as <em>C N U S D</em> in the same vertical
      order as on <em>AB</em>.</li></ul> <h3>Step 2 – Build Congruent Triangles</h3> <p>To “transfer” the equal-length information from <em>AB</em> to <em>CD</em>, we
    examine the triangles formed between consecutive parallels:</p> <ul><li><em>∆ALC</em> and <em>∆LQD</em> share a common angle at each parallel‐line
      intersection (alternate interior angles are equal).</li> <li><em>AL = LQ</em> by the given equality on the first transversal.</li> <li>The distance between the two parallels is identical for both triangles,
      furnishing a second pair of equal sides.</li></ul> <p>Thus, each pair of consecutive “ladder” triangles is congruent by the
    <strong>SAS postulate</strong> (Side–Angle–Side).</p> <h3>Step 3 – Transfer Equality to the Second Transversal</h3> <p>Because corresponding parts of congruent triangles are equal
    (<strong>CPCTC</strong>), the segment on <em>CD</em> opposite
    <span style="white-space:nowrap;">AL</span> in <em>∆ALC</em> is congruent to
    the segment opposite <span style="white-space:nowrap;">LQ</span> in
    <em>∆LQD</em>. Repeating this argument down the ladder yields:</p> <p style="text-align:center;"><span style="white-space:nowrap;">CN = NU = US = SD.</span></p> <p>Therefore the same set of parallel lines that carved <em>AB</em> into four
    equal pieces also carves <em>CD</em> into four equal pieces, completing the
    proof.</p> <hr> <small>Generated 2025-08-04.</small></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-NsoPqUaD.js.map
